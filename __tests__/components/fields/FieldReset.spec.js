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

    const formWrapper = mountFormGenerator(form.schema, form.model)


    expect(formWrapper.findComponent(FieldReset).exists()).toBeTruthy()
    expect(formWrapper.find('input[type=reset]').exists()).toBeTruthy()
  })

  it('Should reset all values in a form\'s model', async () => {
    config.global.components = { FieldPassword, FieldCheckbox, FieldReset }

    const formWrapper = mountFormGenerator(form.schema, form.model)

    // Check that the initial values have been passed down correctly
    expect(formWrapper.vm.model.password).toBeFalsy()
    expect(formWrapper.vm.model.checkboxTestModel).toBeFalsy()

    expect(formWrapper.findAllComponents([ FieldPassword, FieldCheckbox, FieldReset ])).toBeTruthy()

    const passwordField = formWrapper.findComponent(FieldPassword)
    const checkboxField = formWrapper.findComponent(FieldCheckbox)

    await passwordField.find('input').setValue('password')
    expect(formWrapper.vm.model.password).toBe('password')

    await checkboxField.find('input').setChecked(true)
    expect(formWrapper.vm.model.checkboxTestModel).toBe(true)

    // Reset will be triggered when clicking the reset button, however
    // this isn't the case when using vue test utils.
    await formWrapper.find('form').trigger('reset')
    expect(formWrapper.emitted()).toHaveProperty('reset')


    expect(formWrapper.vm.model.password).toBe('')
  })

})