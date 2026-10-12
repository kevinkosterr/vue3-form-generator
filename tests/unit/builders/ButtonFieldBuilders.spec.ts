import { it, describe, expect } from 'vitest'
import { getFieldComponentName } from '@/helpers'
import ButtonFieldBuilder from '@/builders/fields/ButtonFieldBuilder'
import SubmitFieldBuilder from '@/builders/fields/SubmitFieldBuilder'
import ResetFieldBuilder from '@/builders/fields/ResetFieldBuilder'

describe.each([
  [ 'ButtonFieldBuilder', 'FieldButton', (name: string) => new ButtonFieldBuilder(name).buttonText('Click') ],
  [ 'SubmitFieldBuilder', 'FieldSubmit', (name: string) => new SubmitFieldBuilder(name) ],
  [ 'ResetFieldBuilder', 'FieldReset', (name: string) => new ResetFieldBuilder(name) ]
])('%s', (_, componentName, getBuilder) => {

  it(`Should build a field that resolves to ${componentName}`, () => {
    expect(getFieldComponentName(getBuilder('n').build())).toBe(componentName)
  })

  it('Should set buttonText and buttonClasses', () => {
    const field = getBuilder('n').buttonText('Go').buttonClasses('btn btn-primary').build()
    expect(field.buttonText).toBe('Go')
    expect(field.buttonClasses).toBe('btn btn-primary')
  })

  it('Should not require a model', () => {
    expect(() => getBuilder('n').build()).not.toThrow()
  })

  it('Should not emit a value', () => {
    expect(getBuilder('n').emitsValue).toBe(false)
  })

  it('Should not set a model when bound to a schema key', () => {
    expect(getBuilder('n').bindTo('key').build().model).toBeUndefined()
  })

})

describe.each([
  [ 'SubmitFieldBuilder', 'Submit', () => new SubmitFieldBuilder('n') ],
  [ 'ResetFieldBuilder', 'Reset', () => new ResetFieldBuilder('n') ]
])('%s', (_, buttonText, getBuilder) => {

  it(`Should have "${buttonText}" as default button text`, () => {
    expect(getBuilder().build().buttonText).toBe(buttonText)
  })

})

describe('ButtonFieldBuilder', () => {

  it('Should require buttonText', () => {
    expect(() => new ButtonFieldBuilder('n').build()).toThrowError(/"buttonText" \(call \.buttonText\(text\)\)/)
  })

  it('Should not require onClick', () => {
    expect(() => new ButtonFieldBuilder('n').buttonText('Click').build()).not.toThrow()
  })

  it('Should set onClick', () => {
    const onClick = () => {}
    expect(new ButtonFieldBuilder('n').buttonText('Click').onClick(onClick).build().onClick).toBe(onClick)
  })

})
