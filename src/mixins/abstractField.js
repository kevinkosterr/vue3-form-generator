import { isFunction } from "@/helpers"

export default {

  emits: ['onInput'],

  /** Prop definition */
  props: {
    id: String,
    field: {
      type: Object,
      required: true
    },
    model: {
      type: Object,
      required: true,
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
     * @param {EventTarget} target
     * @returns {*}
     */
    formatFieldValue (target) {
      return target.value;
    }
  },

  computed: {
    /**
     * Compute the disabled state of the field/input component. `this.field.disabled` must be set for this to work,
     * otherwise this will always return false.
     *
     * You can pass a function to the `disabled` property of a field to apply the disabled state conditionally.
     * The function will be passed the entire model, the current field instance and the field component.
     *
     * @returns {boolean}
     */
    isDisabled () {
      if (isFunction(this.field.disabled)) {
        return this.field.disabled.call(this, this.model, this.field, this)
      } else {
        return this.field.disabled || false
      }
    },

    /**
     * Compute the required state of the field/input component. `this.field.required` must be set for this to work,
     * otherwise this will always return false.
     *
     * You can pass a function to the `required` property of a field to apply the required state conditionally.
     * The function will be passed the entire model, the current field instance and the field component.
     *
     * @returns {boolean}
     */
    isRequired () {
      if (isFunction(this.field.required)) {
        return this.field.required.call(this, this.model, this.field, this)
      } else {
        return this.field.required || false
      }
    }

  },

}