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
    },

  }

}