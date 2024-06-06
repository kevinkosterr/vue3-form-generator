<template>
  <select
      :id="id"
      :name="field.name"
      :value="model[field.model]"
      @change="onFieldValueChanged"
  >
    <option disabled value="">{{ field.placeholder ?? 'Select a ' + field.name}}</option>
    <option v-for="option in field.options" :value="option.value">
      {{ option.label }}
    </option>
  </select>
</template>

<script>
import { abstractField } from "@/mixins"

export default {
  name: 'FieldSelect',
  mixins: [abstractField],
}
</script>