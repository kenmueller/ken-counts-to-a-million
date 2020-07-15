const { env } = process

module.exports = {
	...env,
	PORT: env.PORT || '5000',
	MESSAGE_RATE_LIMIT: parseInt(env.MESSAGE_RATE_LIMIT),
	LAST_NUMBER: parseInt(env.LAST_NUMBER),
	SLEEP_DURATION: parseInt(env.SLEEP_DURATION)
}
