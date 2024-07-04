<template>
  <input type="text"
         :id="id"
         :name="field.name"
         :required="isRequired"
         :disabled="isDisabled"
         :placeholder="field.placeholder"
         :autocomplete="field.autocomplete || 'off'"
         :value="model[field.model]"
         @input="onFieldValueChanged"
  />
</template>

<script>
import { abstractField } from "@/mixins"

export default {
  name: 'FieldText',
  mixins: [abstractField],
}
</script>