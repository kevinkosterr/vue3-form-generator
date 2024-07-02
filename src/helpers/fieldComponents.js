function getFieldComponentName (field) {
  return 'Field' + field.type.charAt(0).toUpperCase() + field.type.slice(1);
}

export {
  getFieldComponentName,
}
