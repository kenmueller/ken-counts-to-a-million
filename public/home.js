const addMessageSubtitle = document.getElementById('add-message-subtitle')
const addMessageInput = document.getElementById('add-message-input')
const addMessageSubmitButton = document.getElementById('add-message-submit-button')

const sendMessage = async (text, number) => {
	console.log(text, number)
	
	const response = await fetch('/messages', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ text, number })
	})
	
	if (response.status !== 200)
		throw new Error(await response.text())
}

const addMessage = async event => {
	try {
		event.preventDefault()
		
		const text = addMessageInput.value
		
		addMessageSubtitle.classList.remove('error')
		addMessageSubtitle.innerHTML = 'Loading...'
		
		addMessageInput.value = ''
		addMessageSubmitButton.disabled = true
		
		await sendMessage(text)
		
		addMessageSubtitle.innerHTML = 'Your message will be attached to the nearest available number'
	} catch (error) {
		addMessageSubtitle.classList.add('error')
		addMessageSubtitle.innerHTML = error.message
	}
}

const addMessageInputChanged = text => {
	addMessageSubmitButton.disabled = !text
}
