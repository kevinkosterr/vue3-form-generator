import { generateSchemaSingleField, generatePropsSingleField, mountFormGenerator, clearEmittedEvents } from '@test/_resources/utils.js'
import { mount, config } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'

import FieldText from '@/fields/core/FieldText.vue'

const form = generateSchemaSingleField(
  'textTest',
  'modelText',
  'input',
  'text',
  'A test for text',
  '',
  {
    placeholder: 'test placeholder'
  }
)

const props = generatePropsSingleField(form)

describe('FieldText', () => {

  it('Should render correctly', async () => {
    const wrapper = mount(FieldText, { props })

    expect(wrapper.findComponent(FieldText).exists()).toBe(true)
    const textInput = wrapper.find('input[type=text]')

    expect(textInput.exists()).toBe(true)
    expect(textInput.attributes().placeholder).toBe('test placeholder')
    expect(textInput.attributes().disabled).toBeFalsy()
  })

  it('Should render correctly inside form generator', async () => {
    config.global.components = { FieldText }

    const formWrapper = mountFormGenerator(form.schema, form.model)


    expect(formWrapper.findComponent(FieldText).exists()).toBeTruthy()
    expect(formWrapper.find('input[type=text]').exists()).toBeTruthy()
    expect(formWrapper.find('input[type=text]').attributes().placeholder).toBe('test placeholder')
  })

  it('Should emit onInput event', async () => {
    const wrapper = mount(FieldText, { props })
    await wrapper.find('input').trigger('input')
    expect(wrapper.emitted()).toHaveProperty('onInput')
  })

  it('Should update model value', async () => {
    config.global.components = { FieldText }

    const formWrapper = mountFormGenerator(form.schema, form.model)


    const textField = formWrapper.findComponent(FieldText)
    expect(textField.exists()).toBeTruthy()
    await textField.find('input').setValue('I have the high ground')
    expect(formWrapper.vm.model.modelText).toBe('I have the high ground')
  })

  it('Should validate onBlur, by default', async () => {
    const formWrapper = mountFormGenerator(form.schema, form.model)
    const textField = formWrapper.findComponent(FieldText)
    await textField.find('input').trigger('blur')
    expect(textField.emitted()).toHaveProperty('validated')
  })

  it('Should validate onChanged, if set', async () => {
    const schema = { ...form.schema }
    schema.fields[0].validate = 'onChanged'
    schema.fields[0].validator = (v) => v === 'Hello there!'
    const formWrapper = mountFormGenerator(schema, form.model)
    const textField = formWrapper.findComponent(FieldText)
    clearEmittedEvents(textField)
    await textField.find('input').setValue('Hello there!')
    expect(textField.emitted()).toHaveProperty('validated')
  })

})
