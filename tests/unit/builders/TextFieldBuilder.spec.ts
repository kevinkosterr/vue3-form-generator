import { it, describe, expect } from 'vitest'
import { getFieldComponentName } from '@/helpers'
import TextFieldBuilder from '@/builders/fields/TextFieldBuilder'

describe('TextFieldBuilder', () => {

  it('Should build a field that resolves to FieldText', () => {
    const field = new TextFieldBuilder('n').model('m').build()
    expect(field).toMatchObject({ type: 'input', inputType: 'text', name: 'n' })
    expect(getFieldComponentName(field)).toBe('FieldText')
  })

  it('Should default to an empty string', () => {
    expect(new TextFieldBuilder().getDefaultValue()).toBe('')
  })

  it('Should set placeholder, min and max', () => {
    expect(new TextFieldBuilder('n').model('m').placeholder('p').min(2).max(10).build())
      .toMatchObject({ placeholder: 'p', min: 2, max: 10 })
  })

  it('Should set autocomplete, defaulting to true', () => {
    expect(new TextFieldBuilder('n').model('m').autoComplete().build().autocomplete).toBe(true)
    expect(new TextFieldBuilder('n').model('m').autoComplete(false).build().autocomplete).toBe(false)
  })

})
