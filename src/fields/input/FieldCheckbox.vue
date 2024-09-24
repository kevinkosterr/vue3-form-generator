<template>
  <input
    :id="id"
    type="checkbox"
    :name="field.name"
    :required="isRequired"
    :disabled="isDisabled"
    :value="currentModelValue"
    :checked="currentModelValue"
    @change="onFieldValueChanged"
  >
  <label v-if="field.label" style="margin-left: .4em" :for="id"> {{ field.label }}</label>
</template>

<script>
import { abstractField } from '@/mixins'

export default {
  name: 'FieldCheckbox',
  mixins: [ abstractField ],
  methods: {
    formatFieldValue (target) {
      return target.checked
    }
  }
}
</script>