import { expect, it, describe, beforeAll } from 'vitest'
import { config, mount } from '@vue/test-utils'
import { generateSchemaSingleField, clearEmittedEvents } from '@test/_resources/utils.js'
import { mountFormGenerator } from '@test/_resources/utils.js'

import FormGenerator from '@/FormGenerator.vue'
import FieldText from '@/fields/core/FieldText.vue'
import FieldTextarea from '@/fields/core/FieldTextarea.vue'
import FieldSubmit from '@/fields/core/FieldSubmit.vue'
import FieldReset from '@/fields/core/FieldReset.vue'

beforeAll(() => {
  config.global.components = { FieldText, FieldTextarea, FieldSubmit, FieldReset }
})

const textSchema = generateSchemaSingleField(
  'text',
  'textModel',
  'input',
  'text',
  'Text input label',
  '',
  {
    required: true
  }
)

const textAreaSchema = generateSchemaSingleField(
  'textArea',
  'textAreaModel',
  'textarea',
  null,
  'Text area label',
  '',
  {}
)

const resetSchema = {
  name: 'reset',
  type: 'reset',
  buttonText: 'Reset'
}

const submitSchema = {
  name: 'submit',
  type: 'submit',
  buttonText: 'Submit'
}

const schema = {
  schema: { fields: [ ...textSchema.schema.fields, ...textAreaSchema.schema.fields, resetSchema, submitSchema ] },
  model: { ...textSchema.model, ...textAreaSchema.model }
}

describe('FormGenerator', () => {

  it('Shouldn\'t render without a schema', async () => {
    const wrapper = mount(FormGenerator)
    expect(wrapper.find('form').exists()).toBeFalsy()
  })

  it('Should render with a schema', async () => {
    const wrapper = mountFormGenerator(schema.schema, schema.model)
    expect(wrapper.find('form').exists()).toBeTruthy()
    expect(wrapper.findComponent(FieldText).exists()).toBeTruthy()
    expect(wrapper.findComponent(FieldTextarea).exists()).toBeTruthy()
  })

  it('Should have correct internals', async () => {
    const wrapper = mountFormGenerator(schema.schema, schema.model)

    /** FieldElements, unexposed, contains the refs of the field components. */
    expect(wrapper.vm.fieldElements).toHaveLength(schema.schema.fields.length)
    // All field elements must be of type FormGroup
    wrapper.vm.fieldElements.forEach(field => {
      expect(field.$.type.__name).toBe('FormGroup')
    })

    const isObject = (o) => !Array.isArray(o) && typeof o === 'object' && o !== null
    expect(isObject(wrapper.vm.formOptions)).toBeTruthy()
  })

  it('Should properly update and reset model', async () => {
    const wrapper = mountFormGenerator(schema.schema, schema.model)
    await wrapper.vm.$nextTick()

    const textField = wrapper.findComponent(FieldText)
    expect(wrapper.vm.model.textModel).toBe('')
    await textField.find('input').setValue('Test update')
    expect(wrapper.vm.model.textModel).toBe('Test update')

    const resetField = wrapper.findComponent(FieldReset)
    await resetField.find('input').trigger('reset')
    expect(wrapper.vm.model.textModel).toBe('')
  })

  it('Should properly pass emits', async () => {
    const wrapper = mountFormGenerator(schema.schema, schema.model)
    await wrapper.vm.$nextTick()

    // Field-validated
    const textField = wrapper.findComponent(FieldText)
    await textField.find('input').setValue('Test emit')
    await textField.find('input').trigger('blur')
    expect(textField.emitted()).toHaveProperty('validated')
    expect(wrapper.emitted()).toHaveProperty('field-validated')

    // Submit
    const submitField = wrapper.findComponent(FieldSubmit)
    await submitField.find('input').trigger('submit')
    expect(submitField.emitted().submit).toHaveLength(1)
    expect(wrapper.emitted().submit).toHaveLength(1)

    clearEmittedEvents(submitField)
    clearEmittedEvents(wrapper)

    // No submit when form has errors
    wrapper.vm.model.textModel = ''
    wrapper.vm.formErrors = { textModel: 'Field is required' }
    await submitField.find('input').trigger('submit')
    expect(submitField.emitted().submit).toHaveLength(1)
    expect(wrapper.emitted().submit).toHaveLength(0)
  })

})