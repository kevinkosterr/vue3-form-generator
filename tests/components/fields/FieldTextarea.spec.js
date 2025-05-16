import { generateSchemaSingleField, generatePropsSingleField, mountFormGenerator } from '@test/_resources/utils.js'
import { mount, config } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'

import FieldTextarea from '@/fields/core/FieldTextarea.vue'

const form = generateSchemaSingleField(
  'textTest',
  'textModel',
  'textarea',
  null,
  'A test for text',
  '',
  {
    placeholder: 'test placeholder'
  }
)

const props = generatePropsSingleField(form)

describe('FieldTextarea', () => {

  it('Should render correctly', () => {
    const wrapper = mount(FieldTextarea, { props })
    const textAreaEl = wrapper.find('textarea')
    expect(textAreaEl.exists()).toBe(true)
    expect(textAreaEl.attributes().placeholder).toBe('test placeholder')
  })

  it('Should render correctly inside form generator', async () => {
    config.global.components = { FieldTextarea }

    const formWrapper = mountFormGenerator(form.schema, form.model)
    expect(formWrapper.findComponent(FieldTextarea).exists()).toBeTruthy()

    const textAreaEl = formWrapper.find('textarea')
    expect(textAreaEl.exists()).toBeTruthy()
    expect(textAreaEl.attributes().placeholder).toBe('test placeholder')
  })

  it('Should emit onInput event', async () => {
    const wrapper = mount(FieldTextarea, { props })
    await wrapper.find('textarea').trigger('input')
    expect(wrapper.emitted()).toHaveProperty('onInput')
  })

  it('Should update model value', async () => {
    config.global.components = { FieldTextarea }

    const formWrapper = mountFormGenerator(form.schema, form.model)

    const textAreaField = formWrapper.findComponent(FieldTextarea)
    expect(textAreaField.exists()).toBeTruthy()
    await textAreaField.find('textarea').setValue('I have the high ground')
    expect(formWrapper.vm.model.textModel).toBe('I have the high ground')
  })

})
