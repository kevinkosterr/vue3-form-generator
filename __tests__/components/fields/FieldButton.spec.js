import { mountFormGenerator, generatePropsSingleField } from '@test/_resources/utils.js'
import { describe, it, expect } from 'vitest'
import { mount, config } from '@vue/test-utils'

import FieldButton from '@/fields/buttons/FieldButton.vue'
import FieldPassword from '@/fields/input/FieldPassword.vue'
import FieldCheckbox from '@/fields/input/FieldCheckbox.vue'

const form = {
  model: {
    password: '',
    checkboxTestModel: false
  },
  schema: {
    fields: [
      {
        type: 'button',
        buttonText: 'Reset password field',
        onClick: (model, _field) => {
          model.password = ''
        }
      },
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
      }
    ]
  }
}

const props = generatePropsSingleField(form)


describe('Test FieldButton', () => {

  it('Should render correctly', () => {
    const wrapper = mount(FieldButton, { props })
    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.find('button').element.innerHTML).toContain(props.field.buttonText)
  })

  it('Should render correctly inside form generator', async () => {
    config.global.components = { FieldButton }

    const formWrapper = mountFormGenerator(form.schema, form.model)
    const buttonField = formWrapper.findComponent(FieldButton)
    expect(buttonField.exists()).toBeTruthy()
    expect(buttonField.find('button').element.innerHTML).toContain(props.field.buttonText)
  })

  it('Should update model values', async () => {
    config.global.components = { FieldPassword, FieldButton, FieldCheckbox }

    const formWrapper = mountFormGenerator(form.schema, form.model)
    expect(formWrapper.find('input[type=password]').exists()).toBe(true)
    expect(formWrapper.find('input[type=checkbox]').exists()).toBe(true)
    expect(formWrapper.find('button').exists()).toBe(true)

    await formWrapper.find('input[type=password]').setValue('password')
    expect(formWrapper.vm.model.password).toBe('password')

    const buttonField = formWrapper.findComponent(FieldButton)
    expect(buttonField.exists()).toBe(true)

    await buttonField.find('button').trigger('click.prevent')
    expect(formWrapper.vm.model.password).toBe('')
  })

})