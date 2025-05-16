<template>
  <code v-if="props.inAction">
    {{ form.model }}
  </code>
  <vue-form-generator :schema="form.schema" :model="form.model"/>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue'

const props = defineProps({
  inAction: {
    type: Boolean,
    default: false
  }
})

const form = ref({
  model: {},
  schema: {
    fields: [
      {
        type: 'reset',
        buttonText: 'Be gone'
      }
    ]
  }
})

onBeforeMount(() => {
  if (props.inAction) {
    form.value.schema.fields.unshift({
      type: 'input',
      inputType: 'text',
      model: 'resetTest'
    })
    form.value.model.resetTest = 'reset me!'
  }
})
</script>