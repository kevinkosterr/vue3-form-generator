<template>
  <select
    :id="id"
    :name="field.name"
    :value="currentModelValue"
    :required="isRequired"
    :disabled="isDisabled"
    @change="onFieldValueChanged"
    @blur="onBlur"
  >
    <option disabled value="">
      {{ field.placeholder ?? 'Select a ' + field.name }}
    </option>
    <option v-for="option in field.options" :key="option.value" :value="option.value">
      {{ option.name }}
    </option>
  </select>
</template>

<script>
import { abstractField } from '@/mixins'

export default {
  name: 'FieldSelectNative',
  mixins: [ abstractField ]
}
</script>