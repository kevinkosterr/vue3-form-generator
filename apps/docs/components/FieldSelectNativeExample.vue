<template>
  Selected: <code>{{ form.model.city }}</code>
  <vue-form-generator :schema="form.schema" :model="form.model"/>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'

const props = defineProps({
  multiple: Boolean
})

const form = ref({
  model: {
    city: ''
  },
  schema: {
    fields: [
      {
        name: 'cityExample',
        label: 'Which city is cool?',
        model: 'city',
        type: 'selectNative',
        options: [
          { name: 'San Francisco', value: 'SF' },
          { name: 'Amsterdam', value: 'AMS' },
          { name: 'New York', value: 'NYC' },
        ]
      }
    ]
  }
})

onBeforeMount(() => {
  if (props.multiple) {
    form.value.schema.fields[0].city = []
    form.value.schema.fields[0].multiple = true
  }
})
</script>