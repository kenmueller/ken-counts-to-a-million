const { WebClient } = require('@slack/web-api')

const {
	SLACK_TOKEN,
	SLACK_CHANNEL,
	EMOJI_INTERVAL
} = require('./constants')

const slack = new WebClient(SLACK_TOKEN)

const sleep = ms =>
	new Promise(resolve => setTimeout(resolve, ms))

const sendMessage = i =>
	slack.chat.postMessage({
		channel: SLACK_CHANNEL,
		text: `${i}${i % EMOJI_INTERVAL ? '' : ' 🥳'}`
	})

module.exports = { sleep, sendMessage }
