const { env } = process

module.exports = {
	...env,
	PORT: env.PORT || '5000',
	LAST_NUMBER: parseInt(env.LAST_NUMBER),
	EMOJI_INTERVAL: parseInt(env.EMOJI_INTERVAL),
	SLEEP_DURATION: parseInt(env.SLEEP_DURATION)
}
