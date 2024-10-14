<template>
  <label class="field-switch" :for="formFieldId">
    <input
      :id="formFieldId"
      type="checkbox"
      :checked="currentModelValue"
      :disabled="isDisabled"
      @change="onFieldValueChanged"
    >
    <span class="slider" />
  </label>
</template>

<script>
import { abstractField } from '@/mixins/'

export default {
  name: 'FieldSwitch',
  mixins: [ abstractField ],
  methods: {
    formatFieldValue(target) {
      return target.checked
    }
  }
}
</script>