import { mountFormGenerator, generatePropsSingleField, generateSchemaSingleField } from '@test/_resources/utils.js'
import { mount, config } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'

import FieldColor from '@/fields/input/FieldColor.vue'

const form = generateSchemaSingleField(
  'testColor',
  'colorModel',
  'input',
  'color',
  'Pick a color',
  ''
)

const props = generatePropsSingleField(form)

describe('Test FieldColor', () => {

  it('Should render correctly', async () => {
    const wrapper = mount(FieldColor, { props })
    expect(wrapper.find('input[type=color]').exists()).toBe(true)
  })

  it('Should render correctly inside form generator', async () => {
    config.global.components = { FieldColor }

    const formWrapper = mountFormGenerator(form.schema, form.model)
    expect(formWrapper.findComponent(FieldColor).exists()).toBe(true)
    expect(formWrapper.find('input[type=color]').exists()).toBe(true)
  })

  it('Should emit onInput event', async () => {
    const wrapper = mount(FieldColor, { props })
    await wrapper.find('input[type=color]').trigger('change')
    expect(wrapper.emitted()).toHaveProperty('onInput')
  })

  it('Should update model value', async () => {
    config.global.components = { FieldColor }

    const formWrapper = mountFormGenerator(form.schema, form.model)

    const wrapper = formWrapper.findComponent(FieldColor)
    await wrapper.find('input[type=color]').setValue('#efefef')
    expect(wrapper.emitted()).toHaveProperty('onInput', [ [ '#efefef' ] ])
    expect(formWrapper.vm.model.colorModel).toBe('#efefef')
  })

})
