<template>
  Selected option: <code>{{ form.model.radioModel }}</code>
  <vue-form-generator :schema="form.schema" :model="form.model"/>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  model: {
    radioModel: ''
  },
  schema: {
    fields: [
      {
        name: 'radioExample',
        label: 'Select an option',
        model: 'radioModel',
        type: 'input',
        inputType: 'radio',
        options: [
          { name: 'Example 1', value: 'ex_1' },
          { name: 'Example 2', value: 'ex_2' },
          { name: 'Example 3', value: 'ex_3' }
        ]
      }
    ]
  }
})
</script>