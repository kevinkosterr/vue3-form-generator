import { isNotEmpty, isString } from '@/helpers'
import { Field, FieldValue } from '@/resources/types/fields'

export default {

  /**
   * Checks if a field meets the 'required' validation criteria.
   * @returns {boolean} - Returns 'true' if the field is required and the value is not empty, otherwise false.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  required (value: FieldValue, field: Field, model: Record<string, any>): boolean {
    return isNotEmpty(value)
  },

  /**
   * Check if field value is the minimum required length, value or amount of values
   * @returns {boolean} - Returns 'true' if the field is required and the value is not empty, otherwise false.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  min (value: FieldValue, field: Field, model: Record<string, any>): boolean {
    if (!('min' in field) || !field.min || !value) return true

    if (typeof value === 'number'){
      return value >= field.min
    } else if (typeof value === 'string'){
      return value.length >= field.min
    } else if (Array.isArray(value)) {
      return value.length >= field.min
    }

    return true
  },

  /**
   * Check if field value is the maximum provided length
   * @returns {boolean} - Returns 'true' if the field is required and the value is not empty, otherwise false.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  max (value: FieldValue, field: Field, model: Record<string, any>): boolean {
    if (!('max' in field) || !value || !field.max) return true

    if (typeof value === 'number'){
      return value <= field.max
    } else if (typeof value === 'string'){
      return value.length <= field.max
    } else if (Array.isArray(value)) {
      return value.length <= field.max
    }

    return true
  },

  /**
   * Checks if the field's value is of type string.
   * @returns {boolean} - Returns 'true' if the field is required and the value is not empty, otherwise false.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  string (value: FieldValue, field: Field, model: Record<string, any>): boolean {
    return isString(value)
  },

  /**
   * Checks if the field's value is of type number.
   * @returns {boolean} - Returns 'true' if the field is a number.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  number (value: FieldValue, field: Field, model: Record<string, any>): boolean {
    return Number.isNaN(value)
  },

  /**
   * Check if the field's value is of a valid e-mail address format.
   * @returns {boolean} - Returns 'true' if the field's format is a valid email format, otherwise false.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  email (value: FieldValue, field: Field, model: Record<string, any>): boolean {
    if (typeof value !== 'string') return false
    // eslint-disable-next-line max-len
    const regex = new RegExp('^([^<>()\\[\\]\\\\.,;:\\s@"]+(?:\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*|".+")@(\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}]|(?:[a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,})$', 'i')
    return Boolean(value.match(regex))
  },

  /**
   * Check if a value is a phone number in E164 or E123 format.
   * @returns {boolean} - Returns 'true' if value matches the format, otherwise false.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  phoneNumberE164andE123 (value: FieldValue, field: Field, model: Record<string, any>): boolean {
    if (typeof value !== 'string') return false

    const regex = new RegExp(
      // eslint-disable-next-line max-len
      '^\\+\\d{1,3}\\s\\d{2,3}\\s\\d{2,3}\\s\\d{4}|^\\+\\d{1,3}\\s\\d{1,14}(\\s\\d{1,13})?|^\\(\\d{3}\\)\\s\\d{3}\\s\\d{4}?',
      'i'
    )
    return Boolean(value.match(regex))
  },

  /**
   * Check if value is a valid Dutch mobile phone number
   * @returns {boolean} - Returns 'true' if value matches the format, otherwise false.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  mobilePhoneNL (value: FieldValue, field: Field, model: Record<string, any>): boolean {
    if (typeof value !== 'string') return false

    const regex = new RegExp('(\\+316[0-9]{8})|(06[0-9]{8})', 'i')
    return Boolean(value.match(regex))
  }


}
