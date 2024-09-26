import { mountFormGenerator } from '@test/_resources/utils.js'
import { describe, it, expect } from 'vitest'
import { mount, config } from '@vue/test-utils'

import FieldReset from '@/fields/buttons/FieldReset.vue'
import FieldCheckbox from '@/fields/input/FieldCheckbox.vue'
import FieldPassword from '@/fields/input/FieldPassword.vue'

const form = {
  model: {
    password: '',
    checkboxTestModel: false
  },
  schema: {
    fields: [
      {
        name: 'checkboxTestName',
        model: 'checkboxTestModel',
        label: 'Checkbox Test',
        type: 'checkbox'
      },
      {
        name: 'passwordTest',
        model: 'password',
        label: 'Password',
        type: 'input',
        inputType: 'password'
      },
      {
        type: 'reset',
        buttonText: 'Reset all'
      }
    ]
  }
}

const props = {
  id: 'reset_test',
  formGenerator: {},
  field: { ...form.schema.fields[2] },
  model: { ...form.model }
}

describe('Test FieldReset', () => {

  it('Should render correctly', async () => {
    const wrapper = mount(FieldReset, { props })
    const resetButton = wrapper.find('input[type=reset]')
    expect(resetButton.exists()).toBeTruthy()
    expect(resetButton.attributes().value).toBe('Reset all')
  })

  it('Should render correctly inside form generator', async () => {
    config.global.components = { FieldPassword, FieldCheckbox, FieldReset }

    const generatorWrapper = mountFormGenerator(form.schema, form.model)
    await generatorWrapper.vm.$nextTick()

    expect(generatorWrapper.findComponent(FieldReset).exists()).toBeTruthy()
    expect(generatorWrapper.find('input[type=reset]').exists()).toBeTruthy()
  })

  it('Should reset all values in a form\'s model', async () => {
    config.global.components = { FieldPassword, FieldCheckbox, FieldReset }

    const generatorWrapper = mountFormGenerator(form.schema, form.model)
    await generatorWrapper.vm.$nextTick()
    // Check that the initial values have been passed down correctly
    expect(generatorWrapper.vm.model.password).toBeFalsy()
    expect(generatorWrapper.vm.model.checkboxTestModel).toBeFalsy()

    expect(generatorWrapper.findAllComponents([ FieldPassword, FieldCheckbox, FieldReset ])).toBeTruthy()

    const passwordField = generatorWrapper.findComponent(FieldPassword)
    const checkboxField = generatorWrapper.findComponent(FieldCheckbox)

    await passwordField.find('input').setValue('password')
    expect(generatorWrapper.vm.model.password).toBe('password')

    await checkboxField.find('input').setChecked(true)
    expect(generatorWrapper.vm.model.checkboxTestModel).toBe(true)

    // Reset will be triggered when clicking the reset button, however
    // this isn't the case when using vue test utils.
    await generatorWrapper.find('form').trigger('reset')
    expect(generatorWrapper.emitted()).toHaveProperty('reset')
    await generatorWrapper.vm.$nextTick()

    expect(generatorWrapper.vm.model.password).toBe('')
  })

})