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
    expect(wrapper.find('.vfg-select').exists()).toBeTruthy()
    // First option should be filled with placeholder and value should be empty
    expect(wrapper.find('.vfg-select-label').element.innerHTML).toContain(props.field.placeholder)
  })

  it('Should open correctly', async () => {
    const wrapper = mount(FieldSelect, { props })
    const selectEl = wrapper.find('.vfg-select-label')
    await selectEl.trigger('click')
    expect(wrapper.vm.isOpened).toBeTruthy()
    await wrapper.vm.$nextTick()
    expect(wrapper.findAll('.vfg-select-option').length).toBe(3)
  })

  it('Should render correctly inside form generator', async () => {
    config.global.components = { FieldSelect }
    const formWrapper = mountFormGenerator(form.schema, props)
    const selectComp = formWrapper.findComponent(FieldSelect)
    expect(selectComp.exists()).toBeTruthy()
    expect(formWrapper.find('.vfg-select').exists()).toBeTruthy()
  })

  it('Should update model value', async () => {
    config.global.components = { FieldSelect }
    const formWrapper = mountFormGenerator(form.schema, form.model)
    const selectComp = formWrapper.findComponent(FieldSelect)
    expect(selectComp.exists()).toBeTruthy()

    await selectComp.find('.vfg-select-label').trigger('click')
    await selectComp.vm.$nextTick()

    await selectComp.find('.vfg-select-option').trigger('click')
    expect(formWrapper.vm.model.selectModel).toBe('test_1')
    expect(selectComp.vm.isOpened).toBeFalsy()
  })

  it('Should update model value, with multiple option', async () => {
    config.global.components = { FieldSelect }
    const schema = { fields: [
      { ...form.schema.fields[0], multiple: true }
    ] }
    const model = { selectModel: [] }
    const formWrapper = mountFormGenerator(schema, model)

    expect(formWrapper.vm.model.selectModel.length).toBe(0)
    const fieldSelect = formWrapper.findComponent(FieldSelect)
    expect(fieldSelect.exists()).toBeTruthy()

    await fieldSelect.find('.vfg-select-label').trigger('click')
    await fieldSelect.vm.$nextTick()
    await fieldSelect.find('.vfg-select-option').trigger('click')
    expect(formWrapper.vm.model.selectModel.length).toBe(1)

    await fieldSelect.find('.vfg-select-label').trigger('click')
    await fieldSelect.vm.$nextTick()
    await fieldSelect.findAll('.vfg-select-option')[2].trigger('click')
    expect(formWrapper.vm.model.selectModel.length).toBe(2)
  })

})