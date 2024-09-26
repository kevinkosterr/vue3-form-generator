import { mount } from '@vue/test-utils'

import FormGenerator from '@/FormGenerator.vue'

export function mountFormGenerator (schema, model) {
  return mount(FormGenerator, { props: { schema, model } })
}

export function generateSchemaSingleField (name, model, type, inputType, label, initialValue) {
  return {
    model: {
      [model]: initialValue
    },
    schema: {
      fields: [
        {
          name, model, type, inputType, label
        }
      ]
    }
  }
}

export function generatePropsSingleField (formSchema) {
  return {
    id: formSchema.name + '_test_id',
    formGenerator: {},
    field: { ...formSchema.schema.fields[0] },
    model: { ...formSchema.model }
  }
}
