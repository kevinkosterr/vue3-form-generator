import { generatePropsSingleField, generateSchemaSingleField, mountFormGenerator } from '@test/_resources/utils.js'
import { describe, it, expect } from 'vitest'
import { mount, config } from '@vue/test-utils'

import FieldSwitch from '@/fields/input/FieldSwitch.vue'

const form = generateSchemaSingleField(
  'switchTest',
  'testToggle',
  'switch',
  null,
  'Testing',
  false
)

const props = generatePropsSingleField(form)

describe('Test FieldSwitch', () => {

  it('Should render correctly', async () => {
    const wrapper = mount(FieldSwitch, { props })
    await wrapper.vm.$nextTick()
    expect(wrapper.find('input[type=checkbox]').exists()).toBe(true)
    expect(wrapper.find('span[class=slider]').exists()).toBe(true)
  })

  it('Should render correctly inside form generator', async () => {
    config.global.components = { FieldSwitch }

    const formWrapper = mountFormGenerator(form.schema, form.model)

    expect(formWrapper.findComponent(FieldSwitch).exists()).toBe(true)
    expect(formWrapper.find('input[type=checkbox]').exists()).toBe(true)
  })

  it('Should be checked when toggling switch', async () => {
    const wrapper = mount(FieldSwitch, { props })
    await wrapper.vm.$nextTick()
    await wrapper.find('label[class=field-switch]').trigger('click')
    expect(wrapper.find('input[type=checkbox]').element.checked).toBe(true)
  })

  it('Should update model value', async () => {
    config.global.components = { FieldSwitch }

    const formWrapper = mountFormGenerator(form.schema, form.model)


    const wrapper = formWrapper.findComponent(FieldSwitch)
    expect(wrapper.exists()).toBe(true)
    await wrapper.find('input[type=checkbox]').setChecked(true)
    expect(wrapper.emitted()).toHaveProperty('onInput', [ [ true ] ])
    expect(formWrapper.vm.model.testToggle).toBe(true)
  })

})

