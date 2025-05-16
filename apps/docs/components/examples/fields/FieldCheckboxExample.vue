<template>
  readTutorial: <code>{{ form.model.readTutorial }}</code>
  <vue-form-generator :schema="form.schema" :model="form.model"/>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  model: {
    readTutorial: false
  },
  schema: {
    fields: [
      {
        name: 'tutorialRead',
        label: 'Have you read the tutorial?',
        model: 'readTutorial',
        type: 'input',
        inputType: 'checkbox'
      }
    ]
  }
})
</script>