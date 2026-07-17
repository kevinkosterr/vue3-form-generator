import { mountFormGenerator, generatePropsSingleField, generateSchemaSingleField } from '@test/_resources/utils.js'
import { it, describe, expect, beforeAll } from 'vitest'
import { config, mount } from '@vue/test-utils'

import FieldChecklist from '@/fields/core/FieldChecklist.vue'

const form = generateSchemaSingleField(
  'checklistTest',
  'checklistModel',
  'checklist',
  null,
  'Test label',
  [],
  {
    options: [
      { name: 'Test 1', value: 'test1' },
      { name: 'Test 2', value: 'test2' },
      { name: 'Test 3', value: 'test3' },
      { name: 'Test 4', value: 'test4' }
    ]
  }
)

const props = generatePropsSingleField(form)

beforeAll(() => {
  config.global.components = { FieldChecklist }
})

describe('FieldChecklist', () => {

  it('Should render correctly', () => {
    const wrapper = mount(FieldChecklist, { props })
    const checkBoxes = wrapper.findAll('input[type=checkbox]')
    expect(checkBoxes.length).toBe(4)

    const labels = wrapper.findAll('label')
    expect(labels.length).toBe(4)

    // Ensure each label has the checkbox that belongs to them
    labels.forEach((label, idx) => {
      expect(label.text()).toBe('Test ' + (idx + 1))
      const checkbox = label.find('input[type=checkbox]')
      expect(checkbox.attributes().value).toBe('test' + (idx + 1))
    })

  })

  it('Should render correctly inside form generator', () => {
    const formWrapper = mountFormGenerator(form.schema, form.model)
    // The first label should be the label that's specified inside the field's schema.
    expect(formWrapper.find('label').text()).toContain('Test label')

    const checklistField = formWrapper.findComponent(FieldChecklist)
    expect(checklistField.exists()).toBe(true)

    const labels = checklistField.findAll('label')
    expect(labels.length).toBe(4)
  })

  it('Should emit onInput event', () => {
    const wrapper = mount(FieldChecklist, { props })
    wrapper.find('input[type=checkbox]').trigger('change')
    expect(wrapper.emitted()).toHaveProperty('onInput')
  })

  it('Should update model value', async () => {
    const formWrapper = mountFormGenerator(form.schema, form.model)
    const checklistField = formWrapper.findComponent(FieldChecklist)
    expect(checklistField.exists()).toBe(true)

    const triggerChange = (value) => formWrapper.find(`input[type=checkbox][value=${value}]`).trigger('change')

    triggerChange('test2')
    expect(formWrapper.vm.model.checklistModel).toContain('test2')
    triggerChange('test3')
    expect(formWrapper.vm.model.checklistModel).toContain('test3')

    // Value should be removed, since it is already present in the model
    triggerChange('test2')
    expect(formWrapper.vm.model.checklistModel).not.toContain('test2')
  })

  it('Should update checked state properly', async () => {
    const formWrapper = mountFormGenerator(form.schema, form.model)
    const checklistField = formWrapper.findComponent(FieldChecklist)
    expect(checklistField.exists()).toBe(true)

    const test1Checkbox = () => formWrapper.find('input[type=checkbox][value=test1]')
    const test4Checkbox = () => formWrapper.find('input[type=checkbox][value=test4')

    // Value shouldn't be checked by default.
    expect(test1Checkbox().attributes()).not.toHaveProperty('checked')
    test1Checkbox().trigger('change')
    await checklistField.vm.$nextTick()
    expect(checklistField.find('input[type=checkbox][value=test1]').attributes()).toHaveProperty('checked')

    // Value shouldn't be checked by default.
    expect(test4Checkbox().attributes()).not.toHaveProperty('checked')
    test4Checkbox().trigger('change')
    await checklistField.vm.$nextTick()
    expect(checklistField.find('input[type=checkbox][value=test4]').attributes()).toHaveProperty('checked')
  })

  it('Should render values present by default, as checked', async () => {
    const model = { checklistModel: [ 'test2', 'test4' ] }
    const formWrapper = mountFormGenerator(form.schema, model)

    // Values should be set inside the model of the form generator
    expect(formWrapper.vm.model.checklistModel).toContain('test2')
    expect(formWrapper.vm.model.checklistModel).toContain('test4')
    expect(formWrapper.vm.model.checklistModel).toHaveLength(2)

    const checklistField = formWrapper.findComponent(FieldChecklist)
    expect(checklistField.exists()).toBe(true)
    // These values should now be checked, since they are in the model by default
    expect(checklistField.find('input[type=checkbox][value=test2').attributes()).toHaveProperty('checked')
    expect(checklistField.find('input[type=checkbox][value=test4').attributes()).toHaveProperty('checked')
    // These shouldn't be checked, since they are not in the default values
    expect(checklistField.find('input[type=checkbox][value=test1').attributes()).not.toHaveProperty('checked')
    expect(checklistField.find('input[type=checkbox][value=test3').attributes()).not.toHaveProperty('checked')
  })

})
