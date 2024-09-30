import { generateSchemaSingleField, generatePropsSingleField, mountFormGenerator } from '@test/_resources/utils.js'
import { mount, config } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'

import FieldSelect from '@/fields/input/FieldSelect.vue'

const form = generateSchemaSingleField(
  'testSelect',
  'selectModel',
  'select',
  null,
  'What is this?',
  '',
  {
    placeholder: 'Select a test value',
    options: [
      { value: 'test_1', name: 'Test 1' },
      { value: 'test_2', name: 'Test 2' },
      { value: 'test_3', name: 'Test 3' }
    ]
  }
)

const props = generatePropsSingleField(form)

describe('Test FieldSelect', () => {

  it('Should render correctly', async () => {
    const wrapper = mount(FieldSelect, { props })
    expect(wrapper.find('select').exists()).toBeTruthy()
    expect(wrapper.findAll('option').length).toBe(4)
    // First option should be filled with placeholder and value should be empty
    expect(wrapper.find('option').element.innerHTML).toContain(props.field.placeholder)
    expect(wrapper.find('option').attributes().value).toBe('')
  })

  it('Should render correctly inside form generator', async () => {
    config.global.components = { FieldSelect }

    const formWrapper = mountFormGenerator(form.schema, form.model)

    const selectField = formWrapper.findComponent(FieldSelect)
    expect(selectField.exists()).toBeTruthy()
    expect(selectField.findAll('option').length).toBe(4)
  })

  it('Should emit onInput event', async () => {
    const wrapper = mount(FieldSelect, { props })
    await wrapper.find('select').trigger('change')
    expect(wrapper.emitted()).toHaveProperty('onInput')
  })

  it('Should update model value', async () => {
    config.global.components = { FieldSelect }

    const formWrapper = mountFormGenerator(form.schema, form.model)
    const selectField = formWrapper.findComponent(FieldSelect)
    expect(selectField.exists()).toBeTruthy()

    await selectField.find('select').setValue('test_2')
    expect(formWrapper.vm.model.selectModel).toBe('test_2')
    await selectField.find('select').setValue('test_3')
    expect(formWrapper.vm.model.selectModel).toBe('test_3')
  })

})
