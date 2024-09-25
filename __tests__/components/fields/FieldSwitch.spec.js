import { mountFormGenerator } from '@test/_resources/tools.js'
import { describe, it, expect } from 'vitest'
import { mount, config } from '@vue/test-utils'

import FieldSwitch from '@/fields/input/FieldSwitch.vue'

const form = {
  model: {
    testToggle: false
  },
  schema: {
    fields: [
      {
        name: 'switchTest',
        model: 'testToggle',
        label: 'Testing',
        type: 'switch'
      }
    ]
  }
}

const props = {
  id: 'switch_test',
  formGenerator: {},
  field: { ...form.schema.fields[0] },
  model: { ...form.model }
}

describe('Test FieldSwitch', () => {

  it('Should render correctly', async () => {
    const wrapper = mount(FieldSwitch, { props })
    await wrapper.vm.$nextTick()
    expect(wrapper.find('input[type=checkbox]').exists()).toBe(true)
    expect(wrapper.find('span[class=slider]').exists()).toBe(true)
  })

  it('Should render correctly inside form generator', async () => {
    config.global.components = { FieldSwitch }

    const generatorWrapper = mountFormGenerator(form.schema, form.model)
    await generatorWrapper.vm.$nextTick()
    expect(generatorWrapper.findComponent(FieldSwitch).exists()).toBe(true)
    expect(generatorWrapper.find('input[type=checkbox]').exists()).toBe(true)
  })

  it('Should be checked when toggling switch', async () => {
    const wrapper = mount(FieldSwitch, { props })
    await wrapper.vm.$nextTick()
    await wrapper.find('label[class=field-switch]').trigger('click')
    expect(wrapper.find('input[type=checkbox]').element.checked).toBe(true)
  })

  it('Should update model value', async () => {
    config.global.components = { FieldSwitch }

    const generatorWrapper = mountFormGenerator(form.schema, form.model)
    await generatorWrapper.vm.$nextTick()

    const wrapper = generatorWrapper.findComponent(FieldSwitch)
    expect(wrapper.exists()).toBe(true)
    await wrapper.find('input[type=checkbox]').setChecked(true)
    expect(wrapper.emitted()).toHaveProperty('onInput', [ [ true ] ])
  })

})

