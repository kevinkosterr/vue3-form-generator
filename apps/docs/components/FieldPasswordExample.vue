<template>
  Password: <code>{{ form.model.password }}</code>
  <vue-form-generator :model="form.model" :schema="form.schema" />
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'

const props = defineProps({
  hasIndicator: {
    type: Boolean,
    default: false
  }
})

const form = ref({
  model: { password: '' },
  schema: {
    fields: [
      {
        name: 'passwordExample',
        model: 'password',
        type: 'input',
        inputType: 'password'
      }
    ]
  }
})

onBeforeMount(() => {
  if (props.hasIndicator) {
    form.value.schema.fields[0].indicator = true
  }
})
</script>