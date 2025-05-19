<template>
  Person: <code>{{ form.model.person }}</code>
  <vue-form-generator :schema="form.schema" :model="form.model" />
</template>

<script setup>
import { onBeforeMount, ref } from 'vue'

const props = defineProps({
  addValidators: Boolean
})

const form = ref({
  model: {
    person: {
      name: '',
      surname: '',
      age: null
    }
  },
  schema: {
    fields: [
      {
        type: 'object',
        model: 'person',
        schema: {
          fields: [
            {
              type: 'input',
              inputType: 'text',
              model: 'name',
              label: 'Name'
            },
            {
              type: 'input',
              inputType: 'text',
              model: 'surname',
              label: 'Surname'
            },
            {
              type: 'input',
              inputType: 'number',
              model: 'age',
              label: 'Age'
            }
          ]
        }
      }
    ]
  }
})

onBeforeMount(() => {
  if (props.addValidators) {
    const fields = form.value.schema.fields[0].schema.fields

    const minLengthThree = (value) => value && value.length >= 3
    fields[0].validator = minLengthThree
    fields[1].validator = minLengthThree
    fields[2].validator = (value) => value && value >= 18
  }
})
</script>