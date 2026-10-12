import { it, describe, expect } from 'vitest'
import { NoValueError } from '@/exceptions'
import { getFieldComponentName } from '@/helpers'
import SubmitFieldBuilder from '@/builders/fields/SubmitFieldBuilder'
import ResetFieldBuilder from '@/builders/fields/ResetFieldBuilder'

describe.each([
  [ 'SubmitFieldBuilder', 'FieldSubmit', 'Submit', (name: string) => new SubmitFieldBuilder(name) ],
  [ 'ResetFieldBuilder', 'FieldReset', 'Reset', (name: string) => new ResetFieldBuilder(name) ]
])('%s', (_, componentName, buttonText, getBuilder) => {

  it(`Should build a field that resolves to ${componentName}`, () => {
    expect(getFieldComponentName(getBuilder('n').build())).toBe(componentName)
  })

  it(`Should have "${buttonText}" as default button text`, () => {
    expect(getBuilder('n').build().buttonText).toBe(buttonText)
  })

  it('Should set buttonText and buttonClasses', () => {
    const field = getBuilder('n').buttonText('Go').buttonClasses('btn btn-primary').build()
    expect(field.buttonText).toBe('Go')
    expect(field.buttonClasses).toBe('btn btn-primary')
  })

  it('Should not require a model', () => {
    expect(() => getBuilder('n').build()).not.toThrow()
  })

  it('Should throw NoValueError on getDefaultValue()', () => {
    expect(() => getBuilder('n').getDefaultValue()).toThrowError(NoValueError)
  })

})
