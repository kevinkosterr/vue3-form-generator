import { describe, it, expect } from 'vitest'
import { mountFormGenerator, generatePropsSingleField, generateSchemaSingleField } from '@test/_resources/utils.js'
import { mount, config } from '@vue/test-utils'

import FieldNumber from '@/fields/input/FieldNumber.vue'

const form = generateSchemaSingleField(
  'testNumber',
  'numberModel',
  'input',
  'number',
  'Number input',
  0,
  {
    max: 5,
    min: 2
  }
)

const props = generatePropsSingleField(form)

describe('Test FieldNumber', () => {

  it('Should render correctly', async () => {
    const wrapper = mount(FieldNumber, { props })
    expect(wrapper.find('input[type=number]').exists()).toBeTruthy()
  })

  it('Should render correctly inside form generator', async () => {
    config.global.components = { FieldNumber }
    const formWrapper = mountFormGenerator(form.schema, form.model)
    expect(formWrapper.find('input[type=number]').exists()).toBeTruthy()

    const wrapper = formWrapper.findComponent(FieldNumber)
    expect(wrapper.exists()).toBeTruthy()
    expect(wrapper.attributes().min).toBe('2')
    expect(wrapper.attributes().max).toBe('5')
  })

  it('Should emit onInput event', async () => {
    const wrapper = mount(FieldNumber, { props })
    await wrapper.find('input').trigger('input')
    expect(wrapper.emitted()).toHaveProperty('onInput')
  })

  it('Should update model value', async () => {
    config.global.components = { FieldNumber }

    const formWrapper = mountFormGenerator(form.schema, form.model)
    const numberField = formWrapper.findComponent(FieldNumber)
    expect(numberField.exists()).toBeTruthy()

    await numberField.find('input').setValue(4)
    expect(formWrapper.vm.model.numberModel).toBe(4)
  })
})
