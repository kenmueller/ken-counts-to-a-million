const sendMessage = async (text, number) => {
	const response = await fetch('/messages', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ text, number })
	})
	
	if (response.status !== 200)
		throw new Error(await response.text())
}

const addMessageSubtitle = document.getElementById('add-message-subtitle')
const addMessageInput = document.getElementById('add-message-input')
const addMessageSubmitButton = document.getElementById('add-message-submit-button')

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

const claimNumberSubtitle = document.getElementById('claim-number-subtitle')
const claimNumberTextInput = document.getElementById('claim-number-text-input')
const claimNumberNumberInput = document.getElementById('claim-number-number-input')
const claimNumberSubmitButton = document.getElementById('claim-number-submit-button')

const claimNumber = async event => {
	try {
		event.preventDefault()
		
		const text = claimNumberTextInput.value
		const number = parseInt(claimNumberNumberInput.value)
		
		claimNumberTextInput.value = ''
		claimNumberNumberInput.value = ''
		
		claimNumberSubtitle.classList.remove('error')
		claimNumberSubtitle.innerHTML = 'Loading...'
		
		await sendMessage(text, number)
		
		claimNumberSubtitle.innerHTML = 'Your message will be attached to your desired number'
	} catch (error) {
		claimNumberSubtitle.classList.add('error')
		claimNumberSubtitle.innerHTML = error.message
	}
}

const claimNumberTextInputChanged = text => {
	claimNumberSubmitButton.disabled = !(text && claimNumberNumberInput.value)
}

const claimNumberNumberInputChanged = text => {
	claimNumberSubmitButton.disabled = !(text && claimNumberTextInput.value)
}
