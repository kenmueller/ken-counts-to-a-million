const { WebClient } = require('@slack/web-api')

const {
	slackToken,
	slackChannel,
	nextNumber,
	lastNumber,
	emojiInterval,
	sleepDuration
} = require('./data.json')

const slack = new WebClient(slackToken)

const sleep = ms =>
	new Promise(resolve => setTimeout(resolve, ms))

const sendMessage = i =>
	slack.chat.postMessage({
		channel: slackChannel,
		text: `${i}${i % emojiInterval ? '' : ' 🥳'}`
	})

(async () => {
	try {
		for (let i = nextNumber; i <= lastNumber; i++) {
			process.stdout.write(`${i}...`)
			await sendMessage(i)
			console.log(' SENT')
			
			await sleep(sleepDuration)
		}
	} catch (error) {
		console.error(error)
	}
})()
