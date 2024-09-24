<template>
  <input
    :id="id"
    type="text"
    :name="field.name"
    :required="isRequired"
    :disabled="isDisabled"
    :placeholder="field.placeholder"
    :autocomplete="field.autocomplete || 'off'"
    :value="currentModelValue"
    @input="onFieldValueChanged"
    @blur="onBlur"
  >
</template>

<script>
import { abstractField } from '@/mixins'

export default {
  name: 'FieldText',
  mixins: [ abstractField ]
}
</script>