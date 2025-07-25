import {
  mountFormGenerator,
  generatePropsSingleField,
  generateSchemaSingleField
} from '@test/_resources/utils'
import { mount, config } from '@vue/test-utils'
import { describe, it, expect, beforeAll } from 'vitest'

import FieldMask from '@/fields/core/FieldMask.vue'

const form = generateSchemaSingleField(
  'testMask',
  'maskModel',
  'mask',
  'text',
  'Masked input',
  '',
  {
    placeholder: '1234 1234 1234 1234',
    mask: '#### #### #### ####',
    maskOptions: {
      eager: true
    }
  }
)

const props = generatePropsSingleField(form)

beforeAll(() => {
  config.global.components = { FieldMask }
})

describe('FieldMask', () => {

  it('Should render correctly', async () => {
    const wrapper = mount(FieldMask, { props })
    expect(wrapper.findComponent(FieldMask).exists()).toBe(true)

    const textInput = wrapper.find('input[type=text]')
    expect(textInput.exists()).toBe(true)
    expect(textInput.attributes().placeholder).toBe('1234 1234 1234 1234')
  })

  it('Should render correctly inside form generator', async () => {
    const formWrapper = mountFormGenerator(form.schema, form.model)

    expect(formWrapper.findComponent(FieldMask).exists()).toBe(true)
  })

  it('Should emit onInput event', async () => {
    const wrapper = mount(FieldMask, { props })
    await wrapper.find('input').trigger('input')
    expect(wrapper.emitted()).toHaveProperty('onInput')
  })

  it('Should update model value, masked', async () => {
    const formWrapper = mountFormGenerator(form.schema, form.model)

    const textField = formWrapper.findComponent(FieldMask)
    expect(textField.exists()).toBeTruthy()
    await textField.find('input').setValue('1234 1234 1234 1234')
    expect(formWrapper.vm.model.maskModel).toBe('1234 1234 1234 1234')
  })

  it('Should update model value, unmasked', async () => {
    form.schema.fields[0].maskOptions.unmasked = true
    const formWrapper = mountFormGenerator(form.schema, form.model)

    const textField = formWrapper.findComponent(FieldMask)
    expect(textField.exists()).toBeTruthy()
    await textField.find('input').setValue('1234 1234 1234 1234')
    expect(formWrapper.vm.model.maskModel).toBe('1234123412341234')
  })

  it('Should validate onBlur, by default', async () => {
    const formWrapper = mountFormGenerator(form.schema, form.model)

    const textField = formWrapper.findComponent(FieldMask)
    await textField.find('input').trigger('blur')
    expect(textField.emitted()).toHaveProperty('validated')
  })

  it('Should validate onChanged, if set', async () => {
    const schema = { ...form.schema }
    schema.fields[0].validate = 'onChanged'
    const formWrapper = mountFormGenerator(form.schema, form.model)

    const textField = formWrapper.findComponent(FieldMask)
    await textField.find('input').setValue('1234 1234 1234 1234')
    expect(textField.emitted()).toHaveProperty('validated')
  })

})
