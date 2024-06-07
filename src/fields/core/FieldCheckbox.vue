<template>
  <input type="checkbox"
         :id="id"
         :name="field.name"
         :required="isRequired"
         :disabled="isDisabled"
         :value="model[field.model]"
         @change="onFieldValueChanged"
         :checked="model[field.model]"
  />
</template>

<script>
import { abstractField } from "@/mixins"

export default {
  name: 'FieldCheckbox',
  mixins: [abstractField],
  methods: {
    formatFieldValue (target) {
      return target.checked;
    }
  }
}
</script>