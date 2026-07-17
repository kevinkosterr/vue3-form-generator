import { mountFormGenerator, generatePropsSingleField } from '@test/_resources/utils.js'
import { describe, it, expect, beforeAll } from 'vitest'
import { mount, config } from '@vue/test-utils'

import FieldButton from '@/fields/core/FieldButton.vue'
import FieldPassword from '@/fields/core/FieldPassword.vue'
import FieldCheckbox from '@/fields/core/FieldCheckbox.vue'

beforeAll(() => {
  config.global.components = { FieldButton }
})

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


describe('FieldButton', () => {

  it('Should render correctly', () => {
    const wrapper = mount(FieldButton, { props })
    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.find('button').element.innerHTML).toContain(props.field.buttonText)
  })

  it('Should render correctly inside form generator', async () => {
    const formWrapper = mountFormGenerator(form.schema, form.model)
    const buttonField = formWrapper.findComponent(FieldButton)
    expect(buttonField.exists()).toBeTruthy()
    expect(buttonField.find('button').element.innerHTML).toContain(props.field.buttonText)
  })

  it('Should update model values', async () => {
    config.global.components = { ...config.global.components, FieldPassword, FieldCheckbox }

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