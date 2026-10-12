import { it, describe, expect } from 'vitest'
import { getFieldComponentName } from '@/helpers'
import { BuilderError } from '@/exceptions'
import { f } from '@/builders'

describe('ObjectFieldBuilder', () => {

  it('Should build a field that resolves to FieldObject', () => {
    const field = f.object({ street: f.text() }).bindTo('address').build()
    expect(getFieldComponentName(field)).toBe('FieldObject')
  })

  it('Should accept a name as first argument', () => {
    expect(f.object('addr', { street: f.text() }).bindTo('address').build().name).toBe('addr')
  })

  it('Should use the nested model as default value', () => {
    expect(f.object({ street: f.text().default('Main st.'), nr: f.number() }).getDefaultValue())
      .toStrictEqual({ street: 'Main st.', nr: 0 })
  })

  it('Should build the nested schema', () => {
    const field = f.object({ street: f.text() }).bindTo('address').build()
    expect(field.schema.fields).toStrictEqual([ { type: 'input', inputType: 'text', name: 'street', model: 'street' } ])
  })

  it('Should report the full path of a failing nested field', () => {
    const schema = f.schema({ address: f.object({ date: f.mask() }) })
    expect(() => schema.build()).toThrowError(BuilderError)
    expect(() => schema.build()).toThrowError(/Field "address\.date".*"mask" \(call \.mask\(pattern\)\)/)
  })


  it('Should require a schema', () => {
    expect(() => f.object(undefined as any).bindTo('address')).toThrow()
  })

  it('Should work inside a group', () => {
    const { model, schema } = f.schema({}).group('Group', { address: f.object({ street: f.text() }) }).build()
    expect(model).toStrictEqual({ address: { street: '' } })
    expect(schema.groups![0].fields[0].schema.fields).toHaveLength(1)
  })

  it('Should leave buttons in the nested schema out of the nested model', () => {
    const builder = f.object({ street: f.text(), save: f.submit() })
    expect(builder.getDefaultValue()).toStrictEqual({ street: '' })
    expect(builder.bindTo('address').build().schema.fields).toHaveLength(2)
  })

  it('Should support objects nested in objects', () => {
    const { model } = f.schema({ a: f.object({ b: f.object({ c: f.number() }) }) }).build()
    expect(model).toStrictEqual({ a: { b: { c: 0 } } })
  })

  it('Should return the builder instance from shared setters', () => {
    const builder = f.object({ street: f.text() })
    expect(builder.label('Address')).toBe(builder)
  })

})
