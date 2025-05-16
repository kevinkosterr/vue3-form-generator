<template>
  Description: <code>{{ form.model.description }}</code>
  <vue-form-generator :schema="form.schema" :model="form.model"/>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'

const props = defineProps({
  resizable: Boolean
})

const form = ref({
  model: {
    description: ''
  },
  schema: {
    fields: [
      {
        name: 'textAreaExample',
        label: 'Description',
        model: 'description',
        type: 'textarea',
      }
    ]
  }
})

onBeforeMount(() => {
  if (props.resizable) {
    form.value.schema.fields[0].resizable = true
  }
})
</script>