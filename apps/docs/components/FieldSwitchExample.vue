<template>
  Value: <code>{{ form.model.switchModel }}</code>
  <vue-form-generator :schema="form.schema" :model="form.model"/>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'

const props = defineProps({
  includeButton: Boolean
})

const form = ref({
  model: {
    switchModel: false
  },
  schema: {
    fields: [
      {
        name: 'switchExample',
        label: 'Enable test?',
        model: 'switchModel',
        type: 'switch'
      }
    ]
  }
})

onBeforeMount(() => {
  if (props.includeButton) {
    form.value.schema.fields[0].name = 'switchExampleSecond'
    form.value.schema.fields[0].label = 'Enable this?'
    form.value.schema.fields[1] = {
      type: 'button',
      buttonText: 'Toggle switch',
      onClick: (model) => {
        model.switchModel = !model.switchModel
      }
    }
  }
})
</script>