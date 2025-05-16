<template>
  <vue-form-generator :schema="form.schema" :model="form.model" />
</template>

<script setup>
import { ref, watch } from 'vue'

const form = ref({
  model: {
    checkboxExample: false
  },
  schema: {
    fields: [
      {
        type: 'input',
        inputType: 'checkbox',
        model: 'checkboxExample'
      },
      {
        type: 'button',
        buttonText: 'Magically check the box',
        onClick: (model, field) => {
          model.checkboxExample = true
          field.buttonText = 'Wow! Incredible!'
        }
      }
    ]
  }
})

watch(() => form.value.schema.fields[1].buttonText, (val) => {
  if (val.includes('Wow!')) {
    setTimeout(() => {
      form.value.schema.fields[1].buttonText = 'Magically check the box'
    }, 2000)
  }
})

</script>