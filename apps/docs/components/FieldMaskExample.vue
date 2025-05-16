<template>
  creditCard: <code style="margin-left: 0.4rem">{{ form.model.creditCard }}</code>
  <vue-form-generator :schema="form.schema" :model="form.model"/>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'

const props = defineProps({
  unmasked: Boolean
})

const form = ref({
  model: {
    creditCard: ''
  },
  schema: {
    fields: [
      {
        name: 'creditCardExample',
        label: 'Credit card',
        model: 'creditCard',
        type: 'mask',
        mask: '#### #### #### ####',
        maskOptions: {
          eager: true
        }
      }
    ]
  }
})

onBeforeMount(() => {
  form.value.schema.fields[0].maskOptions.unmasked = props.unmasked
})
</script>