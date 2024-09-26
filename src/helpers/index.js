/**
 * Determine if value is of type Function.
 * @param {any} val
 * @returns {boolean}
 */
function isFunction(val) {
  return typeof val === 'function'
}

/**
 * Determine if a value is of type Object.
 * @param {any} val
 * @returns {boolean}
 */
function isObject(val) {
  return typeof val === 'object'
}

/**
 * Determine if a value is of type String.
 * @param {any} val
 * @returns {boolean}
 */
function isString (val) {
  return typeof val === 'string'
}

/**
 * Remove duplicates from an array.
 * @param {Array} arr
 * @returns {Array}
 */
function toUniqueArray (arr) {
  if (!Array.isArray(arr)) throw new Error('Argument must be of type array')
  return Array.from(new Set(arr))
}

/**
 * Determine the field component name based on the field schema.
 * @param {Object} field field from form schema.
 * @returns {string} string representation of the field component.
 */
function getFieldComponentName (field) {
  const fieldAttribute = field[![ null, undefined ].includes(field.inputType) ? 'inputType' : 'type']
  if (!fieldAttribute) throw new Error('No input or input type specified for ' + field)
  return 'Field' + fieldAttribute.charAt(0).toUpperCase() + fieldAttribute.slice(1)
}

/**
 * Determine if a value is empty.
 * @param {any} value
 * @returns {boolean}
 */
function isEmpty (value) {
  return value === undefined || value === null || value === ''
}

/**
 * Determine whether a value is not empty.
 * @param {any} value
 * @returns {boolean}
 */
function isNotEmpty (value) {
  return !isEmpty(value)
}

/**
 * Determine if a field should have a top-level label.
 * @param field
 * @returns {boolean}
 */
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

/**
 * Reset all properties to an empty value of the same type. Will recursively try and
 * reset all properties if an object has a property with another object as its value.
 * @param obj - object to reset properties for.
 * @returns {Object} - emptied object
 */
function resetObjectProperties (obj) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key]
      if (typeof value === 'string') {
        obj[key] = ''
      } else if (typeof value === 'number') {
        obj[key] = 0
      } else if (typeof value === 'boolean') {
        obj[key] = false
      } else if (Array.isArray(value)) {
        obj[key] = []
      } else if (typeof value === 'object' && value !== null) {
        obj[key] = resetObjectProperties(value)
      } else {
        obj[key] = null
      }
    }
  }
  return obj
}

export {
  isFunction,
  isObject,
  isString,
  toUniqueArray,
  resetObjectProperties,
  getFieldComponentName,
  hasLabel,
  isEmpty,
  isNotEmpty
}