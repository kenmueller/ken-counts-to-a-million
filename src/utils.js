const { WebClient } = require('@slack/web-api')

const { SLACK_TOKEN, SLACK_CHANNEL } = require('./constants')

const slack = new WebClient(SLACK_TOKEN)

const sleep = ms =>
	new Promise(resolve => setTimeout(resolve, ms))

const sanitize = str =>
	str
		.replace(/@(channel|everyone|here)/ig, '@\u200c$1')
		.replace(/\<\!(channel|everyone|here)\|(.*?)\>/ig, '<\u200c!$1|$2>')

const sendMessage = (i, messages, queue) => {
	let message = messages[i]
	
	message
		? delete messages[i]
		: message = queue.shift()
	
	return slack.chat.postMessage({
		channel: SLACK_CHANNEL,
		text: `${i}${message ? ` - ${sanitize(message)}` : ''}`
	})
}

module.exports = { sleep, sanitize, sendMessage }
