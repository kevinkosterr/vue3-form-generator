<template>
  Your age: {{ form.model.numberChoice }}
  <vue-form-generator :schema="form.schema" :model="form.model"/>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  model: {
    numberChoice: 0
  },
  schema: {
    fields: [
      {
        name: 'numberName',
        label: 'What is your age?',
        model: 'numberChoice',
        type: 'input',
        inputType: 'number'
      }
    ]
  }
})
</script>