import { Field } from '@/resources/types/fields'

/**
 * Determine if value is of type Function.
 */
export function isFunction(val: any): boolean {
  return typeof val === 'function'
}

/**
 * Determine if a value is of type Object.
 */
export function isObject(val: any): boolean {
  return typeof val === 'object'
}

/**
 * Determine if a value is of type String.
 */
export function isString (val: any): boolean {
  return typeof val === 'string'
}

/**
 * Remove duplicates from an array.
 */
export function toUniqueArray (arr: any[]): any[] {
  if (!Array.isArray(arr)) throw new Error('Argument must be of type array')
  return Array.from(new Set(arr))
}

/**
 * Determine the field component name based on the field schema.
 */
export function getFieldComponentName (field: Field): string {
  let fieldAttribute

  if ((!('inputType' in field) || field.inputType == undefined) && 'type' in field) {
    fieldAttribute = field.type
  } else if ('inputType' in field) {
    fieldAttribute = field.inputType
  }

  if (!fieldAttribute) throw new Error('No input or input type specified for ' + field)
  return 'Field' + fieldAttribute.charAt(0).toUpperCase() + fieldAttribute.slice(1)
}

/**
 * Determine if a value is empty.
 */
export function isEmpty (value: any): boolean {
  if (Array.isArray(value)) return value.length === 0
  return value === undefined || value === null || value === ''
}

/**
 * Determine whether a value is not empty.
 * @param {any} value
 * @returns {boolean}
 */
export function isNotEmpty (value: any): boolean {
  return !isEmpty(value)
}

/**
 * Determine if a field should have a top-level label.
 */
export function hasLabel(field: Field): boolean {
  if (!('label' in field) || !field.label) return false

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
 */
export function resetObjectProperties (obj: Record<string, any>): object {
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