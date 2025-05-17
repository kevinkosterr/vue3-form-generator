import { mountFormGenerator, generateSchemaSingleField, generatePropsSingleField } from '@test/_resources/utils.js'
import { describe, it, expect, beforeAll } from 'vitest'
import { mount, config } from '@vue/test-utils'
import validators from '@/validators'

import FieldPassword from '@/fields/core/FieldPassword.vue'

const form = generateSchemaSingleField(
  'passwordTest',
  'password',
  'input',
  'password',
  'Password',
  ''
)

const props = generatePropsSingleField(form)

const propsWithIndicator = {
  ...props,
  field: { ...props.field, indicator: true }
}

beforeAll(() => {
  config.global.components = { FieldPassword }
})

describe('FieldPassword', () => {

  it('Should render correctly', async () => {
    const wrapper = mount(FieldPassword, { props })
    expect(wrapper.find('input[type=password]').exists()).toBe(true)
  })

  it('Should render correctly inside form generator', async () => {
    const formWrapper = mountFormGenerator(form.schema, form.model)


    expect(formWrapper.find('input[type=password]').exists()).toBe(true)
    expect(formWrapper.findComponent(FieldPassword).exists()).toBe(true)
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
    const formWrapper = mountFormGenerator(form.schema, form.model)


    const wrapper = formWrapper.findComponent(FieldPassword)
    expect(wrapper.exists()).toBe(true)
    await wrapper.find('input').setValue('testpassword')
    expect(wrapper.emitted()).toHaveProperty('onInput', [ [ 'testpassword' ] ])
    await wrapper.vm.$nextTick()

    expect(formWrapper.vm.model.password).toBe('testpassword')
    expect(wrapper.vm.model.password).toBe('testpassword')
  })

  it('Should give an error when required and empty', async () => {
    const fieldProps = { ...props, field: { ...props.field, required: true } }
    fieldProps.field.validator = [ validators.required ]
    const wrapper = mount(FieldPassword, { props: fieldProps })

    const input = wrapper.find('input[type=password]')
    await input.trigger('change')
    await wrapper.vm.$nextTick()
    await input.trigger('blur')
    expect(wrapper.vm.errors.length).toBe(1)
  })

  it('Should display error, with minimum length 3', async () => {
    const schema = { ...form.schema }
    const validator = (value) => value.length >= 3
    schema.fields[0].validator = [ validator ]

    const formWrapper = mountFormGenerator(schema, form.model)
    const wrapper = formWrapper.findComponent(FieldPassword)
    const input = wrapper.find('input[type=password]')
    await input.setValue('aa')
    await input.trigger('blur')
    expect(wrapper.vm.errors.length).toBe(1)
    const errorContainer = formWrapper.find('.errors')
    expect(errorContainer.exists()).toBeTruthy()
    expect(errorContainer.find('.error').element.innerHTML).toBe('Field is invalid')
  })

})
