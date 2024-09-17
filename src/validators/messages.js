let messages = {
  required: 'Field is required',
  string: 'Value must be a string',
  number: 'Value must be a number',
  email: 'E-mail is invalid',
  phoneNumberE164andE123: 'Phone number is invalid (must be valid E164 or E123 format, e.g. +31 612345678)',
  mobilePhoneNL: 'Phone number is invalid (must be a valid Dutch phone number, e.g. +31612345678)'
}

function getMessage (validatorName) {
  return messages[validatorName] || 'Field is invalid'
}

function setMessages (_messages) {
  messages = { ...messages, ..._messages }
}

export {
  setMessages,
  getMessage,
  messages
}
