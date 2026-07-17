import { mountFormGenerator } from '@test/_resources/utils.js'
import { describe, it, expect } from 'vitest'
import { mount, config } from '@vue/test-utils'

import FieldCheckbox from '@/fields/core/FieldCheckbox.vue'
import FieldPassword from '@/fields/core/FieldPassword.vue'
import FieldSubmit from '@/fields/core/FieldSubmit.vue'

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
        type: 'submit',
        buttonText: 'Submit all'
      }
    ]
  }
}

const props = {
  id: 'submit_test',
  formGenerator: {},
  field: { ...form.schema.fields[2] },
  model: { ...form.model }
}

describe('FieldSubmit', () => {

  it('Should render correctly', async () => {
    const wrapper = mount(FieldSubmit, { props })
    const submitButton = wrapper.find('input[type=submit]')
    expect(submitButton.exists()).toBeTruthy()
    expect(submitButton.attributes().value).toBe('Submit all')
  })

  it('Should render correctly inside form generator', async () => {
    config.global.components = { FieldPassword, FieldCheckbox, FieldSubmit }

    const formWrapper = mountFormGenerator(form.schema, form.model)


    expect(formWrapper.findComponent(FieldSubmit).exists()).toBeTruthy()
    expect(formWrapper.find('input[type=submit]').exists()).toBeTruthy()
  })

  it('Should reset all values in a form\'s model', async () => {
    config.global.components = { FieldPassword, FieldCheckbox, FieldSubmit }

    const formWrapper = mountFormGenerator(form.schema, form.model)

    // Check that the initial values have been passed down correctly
    expect(formWrapper.vm.model.password).toBeFalsy()
    expect(formWrapper.vm.model.checkboxTestModel).toBeFalsy()

    expect(formWrapper.findAllComponents([ FieldPassword, FieldCheckbox, FieldSubmit ])).toBeTruthy()

    const passwordField = formWrapper.findComponent(FieldPassword)
    const checkboxField = formWrapper.findComponent(FieldCheckbox)

    await passwordField.find('input').setValue('password')
    expect(formWrapper.vm.model.password).toBe('password')

    await checkboxField.find('input').setChecked(true)
    expect(formWrapper.vm.model.checkboxTestModel).toBe(true)

    // Submit will be triggered when clicking the submit button, however
    // this isn't the case when using vue test utils.
    await formWrapper.find('form').trigger('submit')
    expect(formWrapper.emitted()).toHaveProperty('submit')

  })

})