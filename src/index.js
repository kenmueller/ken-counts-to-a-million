const express = require('express')

const { sleep, sendMessage } = require('./utils')
const { LAST_NUMBER, SLEEP_DURATION, PORT } = require('./constants')

const app = express()

let i = null
let ready = true

const start = async () => {
	for (; ready && i <= LAST_NUMBER; i++) {
		await sendMessage(i)
		console.log(i)
		await sleep(SLEEP_DURATION)
	}
}

app.get('/current', (_, res) =>
	res.send(i === null ? 'Unknown' : i.toString())
)

app.post('/start/:i', ({ params }, res) => {
	const _i = parseInt(params.i)
	
	if (isNaN(_i))
		return res.status(400).send('Invalid starting point')
	
	i = _i
	ready = true
	
	console.log('Started')
	res.send('Started counting')
	
	start()
})

app.post('/stop', (_, res) => {
	ready = false
	
	console.log('Stopped')
	res.send('Stopped counting')
})

app.listen(PORT)
