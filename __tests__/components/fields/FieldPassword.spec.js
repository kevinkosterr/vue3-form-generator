import { mountFormGenerator } from '@test/_resources/utils.js'
import { describe, it, expect } from 'vitest'
import { mount, config } from '@vue/test-utils'

import FieldPassword from '@/fields/input/FieldPassword.vue'

const form = {
  model: {
    password: ''
  },
  schema: {
    fields: [
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

const props = {
  id: 'password_test',
  formGenerator: {},
  field: { ...form.schema.fields[0] },
  model: { ...form.model }
}

const propsWithIndicator = {
  ...props,
  field: { ...props.field, indicator: true }
}

describe('Test FieldPassword', () => {

  it('Should render correctly', async () => {
    const wrapper = mount(FieldPassword, { props })
    expect(wrapper.find('input[type=password]').exists()).toBe(true)
  })

  it('Should render correctly inside form generator', async () => {
    config.global.components = { FieldPassword }

    const generatorWrapper = mountFormGenerator(form.schema, form.model)
    await generatorWrapper.vm.$nextTick()

    expect(generatorWrapper.find('input[type=password]').exists()).toBe(true)
    expect(generatorWrapper.findComponent(FieldPassword).exists()).toBe(true)
  })

  it('Shouldn\'t display password strength meter, if not specified', async () => {
    const wrapper = mount(FieldPassword, { props })
    expect(wrapper.find('input[type=password]').exists()).toBe(true)
    expect(wrapper.find('div[class=password-strength-indicator]').exists()).toBe(false)
  })

  it('Should display password strength meter, if specified', async () => {
    const wrapper = mount(FieldPassword, { props: propsWithIndicator })
    expect(wrapper.find('div[class=password-strength-indicator]').exists()).toBe(true)
  })

  it('Should display no password strength', async() => {
    const wrapper = mount(FieldPassword, { props: propsWithIndicator })
    expect(wrapper.vm.passwordStrength).toBe(0)
  })

  it('Should display weak password strength', async() => {
    const weakPasswordModel = { password: 'test' }
    const wrapper = mount(FieldPassword, { props: { ...propsWithIndicator, model: weakPasswordModel } })
    expect(wrapper.vm.passwordStrength).toBe(1)
    expect(wrapper.find('div[class=password-strength-indicator]').attributes().style).toContain('15%')
    expect(wrapper.find('div[class=password-strength-indicator]').attributes().style).toContain('red')
  })

  it('Should display medium password strength', async() => {
    const mediumPasswordModel = { password: 'shouldbemedium12' }
    const wrapper = mount(FieldPassword, { props: { ...propsWithIndicator, model: mediumPasswordModel } })
    expect(wrapper.vm.passwordStrength).toBe(2)
    expect(wrapper.find('div[class=password-strength-indicator]').attributes().style).toContain('50%')
    expect(wrapper.find('div[class=password-strength-indicator]').attributes().style).toContain('orange')
  })

  it('Should display good password strength', async() => {
    const goodPasswordModel = { password: 'This-shOuld-be-a-good-password12!' }
    const wrapper = mount(FieldPassword, { props: { ...propsWithIndicator, model: goodPasswordModel } })
    expect(wrapper.vm.passwordStrength).toBe(3)
    expect(wrapper.find('div[class=password-strength-indicator]').attributes().style).toContain('100%')
    expect(wrapper.find('div[class=password-strength-indicator]').attributes().style).toContain('green')
  })

  it('Should emit onInput event', async () => {
    const wrapper = mount(FieldPassword, { props })
    await wrapper.find('input[type=password]').setValue('password')
    expect(wrapper.emitted()).toHaveProperty('onInput')
  })

  it('Should update model value', async () => {
    config.global.components = { FieldPassword }

    const generatorWrapper = mountFormGenerator(form.schema, form.model)
    await generatorWrapper.vm.$nextTick()

    const wrapper = generatorWrapper.findComponent(FieldPassword)
    expect(wrapper.exists()).toBe(true)
    await wrapper.find('input').setValue('testpassword')
    expect(wrapper.emitted()).toHaveProperty('onInput', [ [ 'testpassword' ] ])
    await wrapper.vm.$nextTick()

    expect(generatorWrapper.vm.model.password).toBe('testpassword')
    expect(wrapper.vm.model.password).toBe('testpassword')
  })

  it('Should give an error when required and empty', async () => {
    const fieldProps = { ...props, field: { ...props.field, required: true } }
    const wrapper = mount(FieldPassword, { props: fieldProps })

    const input = wrapper.find('input[type=password]')
    await input.trigger('change')
    await wrapper.vm.$nextTick()
    await input.trigger('blur')
    expect(wrapper.vm.errors.length).toBe(1)
  })

})
