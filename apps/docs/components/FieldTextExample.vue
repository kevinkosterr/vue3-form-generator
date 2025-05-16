<template>
  Your name: <code>{{ form.model.name }}</code>
  <vue-form-generator :schema="form.schema" :model="form.model"/>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  model: {
    name: ''
  },
  schema: {
    fields: [
      {
        name: 'inputExample',
        label: 'Name',
        model: 'name',
        type: 'input',
        inputType: 'text'
      }
    ]
  }
})
</script>