import { describe, it, expect } from 'vitest'
import { useFieldAttributes } from '@/composables/useFieldAttributes'
import { ref } from 'vue'

const attributeAllSchema = (setValue) => {
  return {
    model: { password: '' },
    fields: [
      {
        name: 'Password',
        label: 'Password',
        required: setValue,
        disabled: setValue,
        visible: setValue,
        readonly: setValue,
        model: 'password',
        hint: 'This is a password'
      }
    ]
  }
}

const schemaAllTrueBool = attributeAllSchema(true)
const schemaAllFalseBool = attributeAllSchema(false)
const schemaAllTrueFn = attributeAllSchema((model, _field) => model.password === '')
const schemaAllFalseFn = attributeAllSchema((model, _field) => model.password !== '')

describe('useFieldAttributes', () => {

  it('Attributes should attest to true, set by boolean', () => {
    const attributes = useFieldAttributes(schemaAllTrueBool.model, schemaAllTrueBool.fields[0])
    expect(attributes.isRequired.value).toBe(true)
    expect(attributes.isDisabled.value).toBe(true)
    expect(attributes.isVisible.value).toBe(true)
    expect(attributes.isReadonly.value).toBe(true)
  })

  it('Attributes should attest to false, set by boolean', () => {
    const attributes = useFieldAttributes(schemaAllFalseBool.model, schemaAllFalseBool.fields[0])
    expect(attributes.isRequired.value).toBe(false)
    expect(attributes.isDisabled.value).toBe(false)
    expect(attributes.isVisible.value).toBe(false)
    expect(attributes.isReadonly.value).toBe(false)
  })

  it('Attributes should attest to true, set by function', () => {
    const attributes = useFieldAttributes(schemaAllTrueFn.model, schemaAllTrueFn.fields[0])
    expect(attributes.isRequired.value).toBe(true)
    expect(attributes.isDisabled.value).toBe(true)
    expect(attributes.isVisible.value).toBe(true)
    expect(attributes.isReadonly.value).toBe(true)
  })

  it('Attributes should attest to false, set by function', () => {
    const attributes = useFieldAttributes(schemaAllFalseFn.model, schemaAllFalseFn.fields[0])
    expect(attributes.isRequired.value).toBe(false)
    expect(attributes.isDisabled.value).toBe(false)
    expect(attributes.isVisible.value).toBe(false)
    expect(attributes.isReadonly.value).toBe(false)
  })

  it('Hint should be set accordingly, by string', () => {
    const attributes = useFieldAttributes(schemaAllTrueBool.model, schemaAllFalseBool.fields[0])
    expect(attributes.hint.value).toBe('This is a password')
  })

  it('Hint should be set accordingly, by function', () => {
    const schema = { ...schemaAllTrueBool }
    schema.fields[0].hint = (model, field) => field.name + field.label
    const attributes = useFieldAttributes(schema.model, schema.fields[0])
    expect(attributes.hint.value).toBe('PasswordPassword')
  })

  it('Should update according to changes in the schema', () => {
    const disabledIfPasswordHasValue = (model, _field) => model.password !== ''
    const schema = ref({
      model: { password: '' },
      fields: [
        { name: 'password', label: 'Password', model: 'password', disabled: disabledIfPasswordHasValue }
      ]
    })
    const attributes = useFieldAttributes(schema.value.model, schema.value.fields[0])
    expect(attributes.isDisabled.value).toBe(false)
    schema.value.model.password = 'a'
    expect(attributes.isDisabled.value).toBe(true)
  })

})