const { join } = require('path')
const express = require('express')
const cors = require('cors')
const handlebars = require('express-handlebars')

const { sleep, sendMessage } = require('./utils')
const { LAST_NUMBER, SLEEP_DURATION, PORT } = require('./constants')

const app = express()

const messages = {}
const queue = []

let i = null
let ready = true

const start = async () => {
	for (; ready && i <= LAST_NUMBER; i++) {
		await sendMessage(i)
		console.log(i)
		await sleep(SLEEP_DURATION)
	}
}

app.use(cors())

app.engine('handlebars', handlebars())
app.set('view engine', 'handlebars')

app.get('/', (_, res) =>
	res.render('home', {
		layout: false,
		current: i
	})
)

app.get('/current', (_, res) =>
	res.send(i === null ? 'Unknown' : i.toString())
)

app.post('/message', ({ body }, res) => {
	if (typeof body !== 'object')
		return res.status(400).send('The request body must be an object')
	
	const { number, text } = body
	
	if (!(typeof text === 'string' && text))
		return res.status(400).send('The message text must be a non-empty string')
	
	if (typeof number === 'number') {
		if (number < i)
			return res.status(403).send(`Ken already passed ${number}`)
		
		if (number > LAST_NUMBER)
			return res.status(403).send('Out of range')
		
		if (messages[number])
			return res.status(403).send(`${number} has already been claimed`)
		
		messages[number] = text
	} else
		queue.push(text)
	
	res.send()
})

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

app.use(express.static(join(__dirname, '../public')))

app.listen(PORT)
