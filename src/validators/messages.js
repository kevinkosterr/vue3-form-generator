let messages = {
  required: 'Value is required'
}

function getMessage (validatorName) {
  return messages[validatorName]
}

function setMessages (_messages) {
  messages = { ...messages, ..._messages }
}

export {
  setMessages,
  getMessage,
  messages
}
