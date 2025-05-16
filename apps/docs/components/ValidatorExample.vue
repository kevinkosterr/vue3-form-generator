<template>
  <vue-form-generator :schema="form.schema" :model="form.model" />
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'

const props = defineProps({
  includeValidator: Boolean
})

const form = ref({
  model: { productCode: '' },
  schema: {
    fields: [
      {
        type: 'input',
        inputType: 'text',
        model: 'productCode',
        label: 'Redeem product code',
        placeholder: 'xxxx-xxxx-xxxx-xxxx'
      }
    ]
  }
})

function productCodeValidator (value, field, model) {
  return value.match(/^[a-z]{4}-[a-z]{4}-[a-z]{4}-[a-z]{4}$/)
}

onBeforeMount(() => {
  if (props.includeValidator) {
    form.value.schema.fields[0].validator = productCodeValidator
  }
})
</script>