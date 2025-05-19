import { expect, it, describe, beforeAll } from 'vitest'
import { config, mount } from '@vue/test-utils'

import FormGenerator from '@/FormGenerator.vue'
import FieldText from '@/fields/core/FieldText.vue'
import FieldTextarea from '@/fields/core/FieldTextarea.vue'
import FieldSubmit from '@/fields/core/FieldSubmit.vue'
import { generateSchemaSingleField } from '@test/_resources/utils.js'

beforeAll(() => {
  config.global.components = { FieldText, FieldTextarea, FieldSubmit }
})

const textSchema = generateSchemaSingleField(
  'text',
  'textModel',
  'input',
  'text',
  'Text input label',
  '',
  {
    required: true
  }
)

const textAreaSchema = generateSchemaSingleField(
  'textArea',
  'textAreaModel',
  'textarea',
  null,
  'Text area label',
  '',
  {}
)

const schema = {
  schema: { fields: [ ...textSchema.schema.fields, ...textAreaSchema.schema.fields ] },
  model: { ...textSchema.model, ...textAreaSchema.model }
}

describe('FormGenerator', () => {

  it('Shouldn\'t render without a schema', async () => {
    const wrapper = mount(FormGenerator)
    expect(wrapper.find('form').exists()).toBeFalsy()
  })

  it('Should render with a schema', async () => {
    const wrapper = mount(FormGenerator, { props: { model: schema.model, schema: schema.schema } })
    expect(wrapper.find('form').exists()).toBeTruthy()
    expect(wrapper.findComponent(FieldText).exists()).toBeTruthy()
    expect(wrapper.findComponent(FieldTextarea).exists()).toBeTruthy()
  })

})