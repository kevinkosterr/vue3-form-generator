import { isFunction, isString, toUniqueArray } from '@/helpers'
import { getMessage } from '@/validators/messages.js'
import validators from '@/validators'

function getValidator (validator) {
  if (isFunction(validator)) return validator
  if (isString(validator)) {
    if (validators[validator] === undefined) throw new Error('Invalid validator: ' + validator)
    return validators[validator]
  }
  return () => true
}

export default {

  emits: [ 'onInput', 'validated' ],

  /** Prop definition */
  props: {
    id: String,
    formGenerator: Object,
    field: {
      type: Object,
      required: true
    },
    model: {
      type: Object,
      required: true
    }
  },


  data () {
    return {
      errors: []
    }
  },

  beforeCreate () {
    if (this.field.type === 'input' && this.field.inputType === undefined) {
      throw new Error('Fields of type `input` must include an `inputType` attribute.')
    }
  },

  methods: {

    /**
     * Validate the current field against given validator(s).
     *
     * @returns {Array} array of errors.
     */
    validate () {
      let results = []

      const fieldValidators = [ ...this.defaultValidators ]
      if (!this.isDisabled && (this.field.validator || fieldValidators.length) && !this.isReadOnly) {

        if (Array.isArray(this.field.validator)) {
          /** Retrieve actual validators for every given validator in Array */
          this.field.validator.forEach(validator => {
            fieldValidators.push(getValidator(validator))
          })
        } else {
          fieldValidators.push(getValidator(this.field.validator))
        }

        fieldValidators.forEach(validator => {
          const isValid = validator(this.currentModelValue, this.field, this.model, this)
          if (!isValid) results.push(getMessage(validator.name))
        })

      }

      return this._handleValidationResults(results)
    },

    /**
     * Handle all validation results.
     *
     * This removes all duplicate messages and emits the validated event.
     *
     * @param errors
     * @returns {Array} array of errors
     * @private
     */
    _handleValidationResults (errors) {
      this.errors = toUniqueArray(errors)

      if (isFunction(this.field.onValidated)) {
        this.field.onValidated.call(this, this.model, errors, this.field)
      } else if (this.field.onValidated !== undefined) {
        throw new Error('onValidated property must be of type `function`, on ' + this.field.name)
      }

      this.$emit('validated', this.errors.length === 0, this.errors, this.field)
      return this.errors
    },

    /**
     * Handle the change of a field's value. You can bind this to any
     * native input element event.
     *
     * e.g:
     * <input @change='onFieldValueChanged'>
     * <input @input='onFieldValueChanged'>
     *
     * @param {EventTarget} target target of the event.
     */
    onFieldValueChanged ({ target }) {
      this.errors = []
      /** Ensure the value has actually changed */
      this.$nextTick().then(() => {
        this.$emit('onInput', this.formatFieldValue(target))
      })
    },

    /**
     * Handle the blur event from the input
     */
    onBlur () {
      this.validate()
    },

    /**
     * Format a field's value.
     * @param {HTMLInputElement} target
     * @returns {*}
     */
    formatFieldValue (target) {
      return target.value
    },

    /**
     * Determine the value of a field's attribute.
     *
     * Will execute the method if one is passed as a property to evaluate its value.
     *
     * @param {String} attribute field attribute.
     * @param {*} defaultValue default value to return if the attribute is not found.
     * @returns {*|boolean}
     */
    determineDynamicAttribute (attribute, defaultValue = false) {
      if (isFunction(this.field[attribute])) return this.field[attribute].call(this, this.model, this.field, this)
      return this.field[attribute] === undefined ? defaultValue : this.field[attribute]
    }
  },

  computed: {

    /**
     * Compute the id for the current form field
     * @returns {string}
     */
    formFieldId () {
      /** From: vue-form-generator **/
      return (this.field.inputName || this.field.label || this.field.model || '')
        .toString()
        .trim()
        .toLowerCase()
        // Spaces & underscores to dashes
        .replace(/ |_/g, '-')
        // Multiple dashes to one
        .replace(/-{2,}/g, '-')
        // Remove leading & trailing dashes
        .replace(/^-+|-+$/g, '')
        // Remove anything that isn't a (English/ASCII) letter, number or dash.
        .replace(/([^a-zA-Z0-9-]+)/g, '')
    },

    /**
     * Compute all validators that should be present by default.
     *
     * @returns {*[]}
     */
    defaultValidators () {
      const fieldValidators = []
      if (!this.isDisabled && !this.isReadOnly) {
        if (this.isRequired && !fieldValidators.includes(validators.required)) {
          fieldValidators.push(validators.required)
        }

        if (this.field.min) {
          fieldValidators.push(validators.minLength)
        }

        if (this.field.max) {
          fieldValidators.push(validators.maxLength)
        }
      }
      return fieldValidators
    },

    /**
     * Compute the current value of this field by accessing the form's model object.
     *
     * @returns {*}
     */
    currentModelValue () {
      return this.model[this.field.model]
    },

    /**
     * Compute the state of visibility of the field/input component. `this.field.visible` must be set for this to work,
     * otherwise this will always return true.
     */
    isVisible () {
      return this.determineDynamicAttribute('visible', true)
    },

    /**
     * Compute the disabled state of the field/input component. `this.field.disabled` must be set for this to work,
     * otherwise this will always return false.
     *
     * You can pass a method to the `disabled` property of a field to apply the disabled state conditionally.
     * The method will be passed the entire model, the current field instance and the field component.
     *
     * @returns {boolean}
     */
    isDisabled () {
      return this.determineDynamicAttribute('disabled')
    },

    /**
     * Compute the required state of the field/input component. `this.field.required` must be set for this to work,
     * otherwise this will always return false.
     *
     * You can pass a method to the `required` property of a field to apply the required state conditionally.
     * The method will be passed the entire model, the current field instance and the field component.
     *
     * @returns {boolean}
     */
    isRequired () {
      return this.determineDynamicAttribute('required')
    },

    /**
     * Compute the readonly state of the field/input component. `this.field.readonly` must be set for this to work,
     * otherwise this will always return false.
     *
     * You can pass a method to the `required` property of a field to apply the readonly state conditionally.
     * The method will be passed the entire model, the current field instance and the field component.
     *
     * @returns {boolean}
     */
    isReadOnly () {
      return this.determineDynamicAttribute('readonly')
    },

    /**
     * Compute the hint to be displayed underneath the field input element.
     * Should return a string value.
     *
     * @returns {String}
     */
    hint () {
      return this.determineDynamicAttribute('hint')
    }

  }

}