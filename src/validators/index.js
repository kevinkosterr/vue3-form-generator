import { isNotEmpty, isString } from '@/helpers/index.js'

export default {

  /**
   * Checks if a field meets the 'required' validation criteria.
   *
   * @param {any} value - The current value of the field.
   * @param {Object} _field - The field as specified in the form's schema.
   * @param {Object} _model - The form model.
   * @param {Component} fieldComponent - Field's Vue Component.
   * @returns {boolean} - Returns 'true' if the field is required and the value is not empty, otherwise false.
   */
  required (value, _field, _model, fieldComponent) {
    return !!(fieldComponent.isRequired && isNotEmpty(value))
  },

  /**
   * Checks if the field's value is of type string.
   *
   * @param {any} value - The current value of the field.
   * @param {Object} _field - The field as specified in the form's schema.
   * @param {Object} _model - The form model.
   * @param {Component} _fieldComponent - Field's Vue Component.
   * @returns {boolean} - Returns 'true' if the field is required and the value is not empty, otherwise false.
   */
  string (value, _field, _model, _fieldComponent) {
    return isString(value)
  },

  /**
   * Checks if the field's value is of type number.
   *
   * @param {any} value - The current value of the field.
   * @param {Object} _field - The field as specified in the form's schema.
   * @param {Object} _model - The form model.
   * @param {Component} _fieldComponent - Field's Vue Component.
   * @returns {boolean} - Returns 'true' if the field is a number.
   */
  number (value, _field, _model, _fieldComponent) {
    return Number.isNaN(value)
  },

  /**
   * Check if the field's value is of a valid e-mail address format.
   *
   * @param {any} value - The current value of the field.
   * @param {Object} _field - The field as specified in the form's schema.
   * @param {Object} _model - The form model.
   * @param {Component} _fieldComponent - Field's Vue Component.
   * @returns {boolean} - Returns 'true' if the field's format is a valid email format, otherwise false.
   */
  email (value, _field, _model, _fieldComponent) {
    // eslint-disable-next-line max-len
    const regex = new RegExp('^([^<>()\\[\\]\\\\.,;:\\s@"]+(?:\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*|".+")@(\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}]|(?:[a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,})$', 'i')
    return Boolean(value.match(regex))
  },

  /**
   * Check if a value is a phone number in E164 or E123 format.
   *
   * @param {String} value current value of the field
   * @param {Object} _field - The field as specified in the form's schema.
   * @param {Object} _model - The form model.
   * @param {Component} _fieldComponent - Field's Vue Component.
   * @returns {boolean} - Returns 'true' if value matches the format, otherwise false.
   */
  phoneNumberE164andE123 (value, _field, _model, _fieldComponent) {
    const regex = new RegExp(
      // eslint-disable-next-line max-len
      '^\\+\\d{1,3}\\s\\d{2,3}\\s\\d{2,3}\\s\\d{4}|^\\+\\d{1,3}\\s\\d{1,14}(\\s\\d{1,13})?|^\\(\\d{3}\\)\\s\\d{3}\\s\\d{4}?',
      'i'
    )
    return Boolean(value.match(regex))
  },

  /**
   * Check if value is a valid Dutch mobile phone number
   *
   * @param {String} value current value of the field
   * @param {Object} _field - The field as specified in the form's schema.
   * @param {Object} _model - The form model.
   * @param {Component} _fieldComponent - Field's Vue Component.
   * @returns {boolean} - Returns 'true' if value matches the format, otherwise false.
   */
  mobilePhoneNL (value, _field, _model, _fieldComponent) {
    const regex = new RegExp('(\\+316[0-9]{8})|(06[0-9]{8})', 'i')
    return Boolean(value.match(regex))
  }


}
