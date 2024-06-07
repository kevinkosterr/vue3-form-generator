<template>
  <template v-for="option in field.options">
    <input
        type="radio"
        :id="getFieldId(option.name)"
        :name="field.name"
        :value="option.value"
        @change="onFieldValueChanged"
    />
    <label :for="getFieldId(option.name)"> {{ option.name }} </label>
  </template>
</template>

<script>
import {abstractField} from '@/mixins'

export default {
  name: 'FieldRadio',
  mixins: [abstractField],
  methods: {
    getFieldId(optionName) {
      return `${this.field.name}_${optionName}`
    }
  }
}
</script>