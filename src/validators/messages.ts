let messages: Record<string, string> = {
  required: 'Field is required',
  string: 'Value must be a string',
  number: 'Value must be a number',
  email: 'E-mail is invalid',
  phoneNumberE164andE123: 'Phone number is invalid (must be valid E164 or E123 format, e.g. +31 612345678)',
  mobilePhoneNL: 'Phone number is invalid (must be a valid Dutch phone number, e.g. +31612345678)',
  hexColorValue: 'Invalid hex value (e.g. #ff0000 or #ff0)'
}

/**
 * Get the message belonging to when a validation has failed against a validator
 */
function getMessage (validatorName: string): string {
  return messages[validatorName] || 'Field is invalid'
}

/**
 * Set/overwrite the messages
 */
function setMessages (_messages: Record<string, string>): void {
  messages = { ...messages, ..._messages }
}

export {
  setMessages,
  getMessage,
  messages
}
