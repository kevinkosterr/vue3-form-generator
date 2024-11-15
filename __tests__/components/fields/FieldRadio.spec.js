import { mountFormGenerator, generatePropsSingleField, generateSchemaSingleField } from '@test/_resources/utils.js'
import { describe, it, expect } from 'vitest'
import { mount, config } from '@vue/test-utils'

import FieldRadio from '@/fields/input/FieldRadio.vue'

const form = generateSchemaSingleField(
  'radioTest',
  'radioModel',
  'input',
  'radio',
  'Which one?',
  '',
  {
    options: [
      { name: 'Test 1', value: 'value_1' },
      { name: 'Test 2', value: 'value_2' },
      { name: 'Test 3', value: 'value_3' }
    ]
  }
)

const props = generatePropsSingleField(form)

const getFieldId = (fieldName, optionName) => {
  return `${fieldName}_${optionName}`
}

const checkRadioInputs = (radioInputs, wrapper) => {
  // Check if all radio inputs are correct.
  for (const [ idx, input ] of radioInputs.entries()) {
    expect(input.attributes().value).toBe(form.schema.fields[0].options[idx].value)
    expect(input.attributes().name).toBe('radioTest')
    const _id = getFieldId(input.element.name, form.schema.fields[0].options[idx].name)
    expect(wrapper.find(`label[for='${_id}']`).exists()).toBeTruthy()
  }
}

describe('Test FieldRadio', () => {

  it('Should render correctly', async () => {
    const wrapper = mount(FieldRadio, { props })
    expect(wrapper.find('input[type=radio]').exists()).toBe(true)

    const radioInputs = wrapper.findAll('input[type=radio]')
    expect(radioInputs).toHaveLength(3)

    // Check if all radio inputs are correct.
    checkRadioInputs(radioInputs, wrapper)
  })

  it('Should render correctly inside form generator', async () => {
    config.global.components = { FieldRadio }

    const formWrapper = mountFormGenerator(form.schema, form.model)

    expect(formWrapper.findComponent(FieldRadio).exists()).toBeTruthy()
    const radioInputs = formWrapper.findAll('input[type=radio]')
    expect(radioInputs).toHaveLength(3)

    // Check if all radio inputs are correct.
    checkRadioInputs(radioInputs, formWrapper)
  })

  it('Should emit onInput event', async () => {
    const wrapper = mount(FieldRadio, { props })
    await wrapper.find('input[type=radio]').setChecked()
    expect(wrapper.emitted()).toHaveProperty('onInput')
  })

  it('Should update model value', async () => {
    config.global.components = { FieldRadio }

    const formWrapper = mountFormGenerator(form.schema, form.model)
    expect(formWrapper.findComponent(FieldRadio)).toBeTruthy()
    expect(formWrapper.vm.model.radioModel).toBe('')

    await formWrapper.find('input[type=radio]').setChecked()

    expect(formWrapper.vm.model.radioModel).toBe('value_1')

    await formWrapper.findAll('input[type=radio]')[1].setChecked()
    expect(formWrapper.vm.model.radioModel).toBe('value_2')
  })

})