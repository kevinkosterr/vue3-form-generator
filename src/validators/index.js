import {isNotEmpty, isString} from "@/helpers/index.js";

export default {

  /**
   * Checks if a field meets the 'required' validation criteria.
   *
   * @param {any} value - The current value of the field.
   * @param {Object} field - The field as specified in the form's schema.
   * @param {Object} model - The form model.
   * @param {Component} fieldComponent - Field's Vue Component.
   * @returns {boolean} - Returns 'true' if the field is required and the value is not empty, otherwise false.
   */
  required(value, field, model, fieldComponent) {
    return !!(fieldComponent.isRequired && isNotEmpty(value));
  },

  /**
   * Checks if the field's value is of type string.
   *
   * @param {any} value - The current value of the field.
   * @param {Object} field - The field as specified in the form's schema.
   * @param {Object} model - The form model.
   * @param {Component} fieldComponent - Field's Vue Component.
   * @returns {boolean} - Returns 'true' if the field is required and the value is not empty, otherwise false.
   */
  string(value, field, model, fieldComponent) {
    return isString(value);
  },


}
