import { isFunction } from "@/helpers"

export default {

  emits: ['onInput'],

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
      required: true,
    }
  },

  beforeCreate () {
    if (this.field.type === 'input' && this.field.inputType === undefined) {
      throw new Error('Fields of type `input` must include an `inputType` attribute.')
    }
  },

  methods: {
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
      this.$nextTick().then(() => {
        this.$emit('onInput', this.formatFieldValue(target))
      })
    },

    /**
     * Format a field's value.
     * @param {HTMLInputElement} target
     * @returns {*}
     */
    formatFieldValue (target) {
      return target.value;
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
    }

  },

}