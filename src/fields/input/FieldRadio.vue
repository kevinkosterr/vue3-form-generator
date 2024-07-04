<template>
  <template v-for="option in field.options">
      <div class="option-wrap">
        <input
            type="radio"
            :id="getFieldId(option.name)"
            :name="field.name"
            :value="option.value"
            @change="onFieldValueChanged"
        />
      <label :for="getFieldId(option.name)"> {{ option.name }} </label>
      </div>
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

<style scoped>
.option-wrap {
  margin: .4rem;
}

label {
  margin-left: .5rem;
}
</style>