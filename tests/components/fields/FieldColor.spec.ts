import {
  mountFormGenerator,
  generatePropsSingleField,
  generateSchemaSingleField
} from '@test/_resources/utils.js'
import { mount, config } from '@vue/test-utils'
import { describe, it, expect, beforeAll } from 'vitest'

import FieldColor from '@/fields/core/FieldColor.vue'

const form = generateSchemaSingleField(
  'testColor',
  'colorModel',
  'input',
  'color',
  'Pick a color',
  '',
  {}
)

const props = generatePropsSingleField(form)

beforeAll(() => {
  config.global.components = { FieldColor }
})

describe('FieldColor', () => {

  it('Should render correctly', async () => {
    const wrapper = mount(FieldColor, { props })
    expect(wrapper.find('input[type=color]').exists()).toBe(true)
  })

  it('Should render correctly inside form generator', async () => {
    const formWrapper = mountFormGenerator(form.schema, form.model)
    expect(formWrapper.findComponent(FieldColor).exists()).toBe(true)
    expect(formWrapper.find('input[type=color]').exists()).toBe(true)
  })

  it('Should render correctly, with input', async () => {
    const schema = { ...form.schema }
    schema.fields[0].withInput = true
    const formWrapper = mountFormGenerator(schema, form.model)

    expect(formWrapper.findComponent(FieldColor).exists()).toBe(true)
    expect(formWrapper.find('input[type=color]').exists()).toBe(true)
    expect(formWrapper.find('input[type=text]').exists()).toBe(true)
  })

  it('Should emit onInput event', async () => {
    const wrapper = mount(FieldColor, { props })
    await wrapper.find('input[type=color]').trigger('input')
    expect(wrapper.emitted()).toHaveProperty('onInput')
  })

  it('Should update model value', async () => {
    const formWrapper = mountFormGenerator(form.schema, form.model)

    const wrapper = formWrapper.findComponent(FieldColor)
    await wrapper.find('input[type=color]').setValue('#efefef')
    expect(wrapper.emitted()).toHaveProperty('onInput', [ [ '#efefef' ] ])
    expect(formWrapper.vm.model.colorModel).toBe('#efefef')
  })

  it ('Should update model value and sync values', async () => {
    const schema = { ...form.schema }
    schema.fields[0].withInput = true
    const formWrapper = mountFormGenerator(schema, form.model)

    const wrapper = formWrapper.findComponent(FieldColor)
    wrapper.find('input[type=text]').setValue('#f00000')
    expect(wrapper.emitted()).toHaveProperty('onInput', [  [ '#f00000' ] ])
    expect(formWrapper.vm.model.colorModel).toBe('#f00000')
    // Wait for the DOM to update.
    await wrapper.vm.$nextTick()
    expect(wrapper.find('input[type=color').attributes().value).toBe('#f00000')

    // Clear emitted events for next interaction test.
    wrapper.emitted().onInput = []

    wrapper.find('input[type=color]').setValue('#ff0000')
    expect(wrapper.emitted()).toHaveProperty('onInput', [  [ '#ff0000' ] ])
    expect(formWrapper.vm.model.colorModel).toBe('#ff0000')
    // Wait for the DOM to update.
    await wrapper.vm.$nextTick()
    expect(wrapper.find('input[type=text]').attributes().value).toBe('#ff0000')
  })

  it('Should validate onBlur, by default', async () => {
    const formWrapper = mountFormGenerator(form.schema, form.model)
    const wrapper = formWrapper.findComponent(FieldColor)
    await wrapper.find('input[type=color]').trigger('blur')
    expect(wrapper.emitted()).toHaveProperty('validated')
  })

  it('Should validate onChanged, if set', async () => {
    const schema = { ...form.schema }
    schema.fields[0].validate = 'onChanged'
    const formWrapper = mountFormGenerator(schema, form.model)
    const wrapper = formWrapper.findComponent(FieldColor)

    await wrapper.find('input[type=color]').trigger('blur')
    expect(wrapper.emitted()).not.toHaveProperty('validated')

    await wrapper.find('input[type=text]').setValue('#efefef')
    expect(wrapper.emitted()).toHaveProperty('validated')
  })

})
