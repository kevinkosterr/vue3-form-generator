<template>
  <vue-form-generator :schema="form.schema" :model="form.model"/>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  model: {},
  schema: {
    fields: [
      {
        type: 'submit',
        buttonText: 'Submitting!'
      }
    ]
  }
})
</script>