import { it, describe, expect } from 'vitest'
import { getFieldComponentName } from '@/helpers'
import ObjectFieldBuilder from '@/builders/fields/ObjectFieldBuilder'
import TextFieldBuilder from '@/builders/fields/TextFieldBuilder'
import SwitchFieldBuilder from '@/builders/fields/SwitchFieldBuilder'

const getBuilder = () => new ObjectFieldBuilder('Address', {
  street: new TextFieldBuilder('Street'),
  active: new SwitchFieldBuilder('Active').default(true)
})

describe('ObjectFieldBuilder', () => {

  it('Should build a field that resolves to FieldObject', () => {
    expect(getFieldComponentName(getBuilder().model('address').build())).toBe('FieldObject')
  })

  it('Should use the nested model as default value', () => {
    expect(getBuilder().getDefaultValue()).toStrictEqual({ street: '', active: true })
  })

  it('Should build the nested schema', () => {
    const field = getBuilder().model('address').build()
    expect(field.schema.fields).toHaveLength(2)
    expect(field.schema.fields![0].model).toBe('street')
    expect(field.schema.fields![1].model).toBe('active')
  })

})
