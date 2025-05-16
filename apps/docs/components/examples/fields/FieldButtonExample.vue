<template>
  <vue-form-generator :schema="form.schema" :model="form.model" />
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  model: {},
  schema: {
    fields: [
      {
        type: 'button',
        buttonText: 'Show me something',
        onClick: () => {
          alert('Here it is!')
        }
      }
    ]
  }
})
</script>