function isFunction(val) {
  return typeof val === 'function';
}

function isObject(val) {
  return typeof val === 'object';
}

function isString (val) {
  return typeof val === 'string';
}

function toUniqueArray (arr) {
  if (!Array.isArray(arr)) throw new Error('Argument must be of type array');
  return Array.from(new Set(arr))
}

function getFieldComponentName (field) {
  const fieldAttribute = field[field.inputType !== undefined ? 'inputType' : 'type']
  return 'Field' + fieldAttribute.charAt(0).toUpperCase() + fieldAttribute.slice(1);
}

function isEmpty (value) {
  return value === undefined || value === null || value === '';
}

function isNotEmpty (value) {
  return !isEmpty(value);
}

function hasLabel(field) {
  if (!field.label) return false

  switch (field.type) {
    case 'button':
    case 'submit':
    case 'reset':
      return false
    default:
      return true
  }
}

export {
  isFunction,
  isObject,
  isString,
  toUniqueArray,
  getFieldComponentName,
  hasLabel,
  isEmpty,
  isNotEmpty
}