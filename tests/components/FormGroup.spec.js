import { expect, it, describe, beforeAll } from 'vitest'
import { mount, config } from '@vue/test-utils'
import FieldText from '@/fields/core/FieldText.vue'
import FormGroup from '@/FormGroup.vue'
import { generateSchemaSingleField } from '@test/_resources/utils.js'

const mountFormGroup = (props) => mount(FormGroup, { props })

beforeAll(() => {
  config.global.components = { FieldText }
})

const textFieldSchema = generateSchemaSingleField(
  'testField',
  'testFieldModel',
  'input',
  'text',
  'Test label',
  ''
)
const field = textFieldSchema.schema.fields[0]
const model = textFieldSchema.model

describe('FormGroup', () => {

  it('Should render properly', async () => {
    const wrapper = mountFormGroup({ field, model })
    const textField = wrapper.findComponent(FieldText)
    expect(textField.exists()).toBeTruthy()
    expect(wrapper.find('.field-wrap').exists()).toBeTruthy()
    expect(wrapper.find('.form-group').exists()).toBeTruthy()
    expect(wrapper.find('label').exists()).toBeTruthy()
  })

  it('Should hide field if not visible', async () => {
    const localField = { ...field, visible: false }
    const wrapper = mountFormGroup({ field: localField, model })
    const textField = wrapper.findComponent(FieldText)
    expect(textField.exists()).toBeTruthy()
    expect(wrapper.vm.fieldStyle).toHaveProperty('display', 'none')
  })

  it('Should not render label when field schema or component tells it not to render', async () => {
    const localField = { ...field, noLabel: true } // noLabel: true here is the same as in the component
    const wrapper = mountFormGroup({ field: localField, model })
    const textField = wrapper.findComponent(FieldText)
    expect(textField.exists()).toBeTruthy()
    expect(wrapper.find('label').exists()).toBeFalsy()
  })

  it('Should display errors', async () => {
    const localField = { ...field, validator: () => false }
    const wrapper = mountFormGroup({ field: localField, model })
    const textField = wrapper.findComponent(FieldText)
    expect(textField.exists()).toBeTruthy()
    await textField.find('input').trigger('blur')
    expect(wrapper.vm.fieldHasErrors).toBeTruthy()
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.errors').exists()).toBeTruthy()
    expect(wrapper.find('.error').text()).toBe('Field is invalid')
  })

  it('Should display hints', async () => {
    const localField = { ...field, hint: 'This is a hint' }
    const wrapper = mountFormGroup({ field: localField, model })
    const textField = wrapper.findComponent(FieldText)
    expect(textField.exists()).toBeTruthy()
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.hint').exists()).toBeTruthy()
    expect(wrapper.find('.hint').text()).toBe('This is a hint')
  })

})