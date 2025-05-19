import { mount } from '@vue/test-utils'

import FormGenerator from '@/FormGenerator.vue'

/**
 * Mount the form generator component
 * @param schema - schema object to pass as prop
 * @param {Object} model - model object to pass as prop
 * @returns {VueWrapper<FormGenerator>}
 */
export function mountFormGenerator (schema, model) {
  return mount(FormGenerator, { props: { schema, model } })
}

/**
 * Generate a form schema for a single field component
 * @param {String} name - name of the field
 * @param {String} model - model key of the field
 * @param {String} type - field type
 * @param {String} inputType - field input type, required if `type === 'input'`
 * @param {String} label - field label
 * @param {any} initialValue - initial model value
 * @param {Object} extraFieldProperties - extra field properties to add
 * @returns {{schema: {fields: [{name, model, inputType, label, type}]}, model: {}}}
 */
export function generateSchemaSingleField (
  name,
  model,
  type,
  inputType,
  label,
  initialValue,
  extraFieldProperties
) {
  return {
    model: {
      [model]: initialValue
    },
    schema: {
      fields: [
        {
          name, model, type, inputType, label, ...extraFieldProperties
        }
      ]
    }
  }
}

/**
 * Generate props for a single field component
 * @param {Object} formSchema - entire form schema object
 * @returns {{field: *, model, id: string, formOptions: {}}}
 */
export function generatePropsSingleField (formSchema) {
  return {
    id: formSchema.name + '_test_id',
    formOptions: {},
    field: { ...formSchema.schema.fields[0] },
    model: { ...formSchema.model }
  }
}
