import { generatePropsSingleField, generateSchemaSingleField, mountFormGenerator } from '@test/_resources/utils.js'
import { describe, it, expect } from 'vitest'
import { mount, config } from '@vue/test-utils'

import FieldCheckbox from '@/fields/core/FieldCheckbox.vue'

const form = generateSchemaSingleField(
  'checkboxTestName',
  'checkboxTestModel',
  'input',
  'checkbox',
  'Checkbox Test',
  false
)

const props = generatePropsSingleField(form)

describe('FieldCheckbox', () => {

  it('Should render correctly', async () => {
    const wrapper = mount(FieldCheckbox, { props })
    // Checkbox should be rendered.
    expect(wrapper.find('input[type=checkbox]').exists()).toBe(true)
    // Label should be rendered and have the correct text.
    expect(wrapper.find('label').text()).toContain(props.field.label)
    await wrapper.vm.$nextTick()
    // Checked attribute should be false, since the default value is set to false inside the model.
    expect(wrapper.find('input[type=checkbox]').element.checked).toBe(false)
  })

  it('Should render correctly inside form generator', async() => {
    config.global.components = { FieldCheckbox }
    const formWrapper = mountFormGenerator(form.schema, form.model)

    expect(formWrapper.findComponent(FieldCheckbox).exists()).toBe(true)
    expect(formWrapper.find('input[type=checkbox]').exists()).toBe(true)
  })

  it('Should be disabled, when specified with a conditional function', async () => {
    const model = { ...form.model, otherTestProperty: false }
    const disabled = (model, _field) => model.otherTestProperty === false
    const field = { ...form.schema.fields[0], disabled }

    expect(disabled(model)).toBe(true)

    const wrapper = mount(FieldCheckbox, { props: { ...props, model, field  } })
    expect(wrapper.find('input[type=checkbox]').exists()).toBe(true)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isDisabled).toBe(true)
    expect(wrapper.find('input[type=checkbox]').element.disabled).toBe(true)
  })

  it('Should be disabled, when specified with boolean', async () => {
    const field = { ...props.field, disabled: true }
    const wrapper = mount(FieldCheckbox, { props: { ...props, field } })

    const checkbox = wrapper.find('input[type=checkbox]')

    expect(checkbox.exists()).toBe(true)
    expect(wrapper.vm.isDisabled).toBe(true)

    await wrapper.vm.$nextTick()

    expect(wrapper.find('input[type=checkbox]').element.disabled).toBe(true)
  })

  it('Checked state should be the same as default value', async () => {
    const model = { checkboxTestModel: true }
    const wrapper = mount(FieldCheckbox, { props: { ...props, model }  })

    await wrapper.vm.$nextTick()

    expect(wrapper.find('input[type=checkbox]').element.checked).toBe(model.checkboxTestModel)
  })

  it('Should emit onInput event', async () => {
    const wrapper = mount(FieldCheckbox, { props })
    await wrapper.find('input[type=checkbox]').trigger('change' )
    expect(wrapper.emitted()).toHaveProperty('onInput')
  })

  it('Should update model value', async () => {
    config.global.components = { FieldCheckbox }

    const formWrapper = mountFormGenerator(form.schema, form.model)


    const wrapper = formWrapper.findComponent(FieldCheckbox)
    expect(wrapper.exists()).toBe(true)

    await wrapper.vm.$nextTick()
    expect(wrapper.find('input').element.checked).toBe(false)

    await wrapper.find('input').trigger('click')
    expect(wrapper.find('input').element.checked).toBe(true)

    await wrapper.find('input').trigger('change')
    expect(wrapper.emitted()).toHaveProperty('onInput', [ [ true ] ])
    await wrapper.vm.$nextTick()

    expect(formWrapper.vm.model.checkboxTestModel).toBe(true)
    // Model value of wrapper should be updated as well, since this gets passed down from the Form Generator.
    expect(wrapper.vm.model.checkboxTestModel).toBe(true)
  })

})
