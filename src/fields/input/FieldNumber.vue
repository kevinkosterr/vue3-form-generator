<template>
  <input
    :id="id"
    type="number"
    :name="field.name"
    :required="isRequired"
    :disabled="isDisabled"
    :placeholder="field.placeholder"
    :value="currentModelValue"
    :max="field.max || undefined"
    :min="field.min || undefined"
    :step="field.step || 1"
    @input="onFieldValueChanged"
    @blur="onBlur"
  >
</template>

<script>
import { abstractField } from '@/mixins'

export default {
  name: 'FieldNumber',
  mixins: [ abstractField ],
  methods: {
    formatFieldValue (target) {
      const step = this.field.step ?? 1
      const isDecimalStep = step.toString().split('.')[1]
      if (!isDecimalStep) return parseInt(target.value)
      return parseFloat(target.value)
    }
  }
}
</script>