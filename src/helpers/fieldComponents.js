function getFieldComponentName (field) {
  const fieldAttribute = field[field.inputType !== undefined ? 'inputType' : 'type']
  return 'Field' + fieldAttribute.charAt(0).toUpperCase() + fieldAttribute.slice(1);
}

export {
  getFieldComponentName,
}
