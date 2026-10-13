import { it, describe, expect } from 'vitest'
import { camelize } from 'vue'
import { getFieldComponentName } from '@/helpers'
import RadioFieldBuilder from '@/builders/fields/RadioFieldBuilder'
import SelectFieldBuilder from '@/builders/fields/SelectFieldBuilder'
import SelectNativeFieldBuilder from '@/builders/fields/SelectNativeFieldBuilder'
import ChecklistFieldBuilder from '@/builders/fields/ChecklistFieldBuilder'

const optionBuilders = [
  [ 'RadioFieldBuilder', () => new RadioFieldBuilder('n').model('m') ],
  [ 'SelectFieldBuilder', () => new SelectFieldBuilder('n').model('m') ],
  [ 'SelectNativeFieldBuilder', () => new SelectNativeFieldBuilder('n').model('m') ],
  [ 'ChecklistFieldBuilder', () => new ChecklistFieldBuilder('n').model('m') ]
] as const

describe('Option field builders', () => {

  describe('Component resolution', () => {

    it.each([
      [ 'FieldRadio', () => new RadioFieldBuilder('n') ],
      [ 'FieldSelect', () => new SelectFieldBuilder('n') ],
      [ 'FieldSelectNative', () => new SelectNativeFieldBuilder('n') ],
      [ 'FieldChecklist', () => new ChecklistFieldBuilder('n') ]
    ])('Should build a field that resolves to %s', (componentName, getBuilder) => {
      const field = getBuilder().model('m').option('A', 'a').build()
      expect(camelize(getFieldComponentName(field))).toBe(componentName)
      expect(field.options).toStrictEqual([ { name: 'A', value: 'a' } ])
    })

  })

  describe('RadioFieldBuilder', () => {

    it('Should default to an empty string', () => {
      expect(new RadioFieldBuilder('n').getDefaultValue()).toBe('')
    })

  })

  describe.each([
    [ 'SelectFieldBuilder', (name: string) => new SelectFieldBuilder(name) ],
    [ 'SelectNativeFieldBuilder', (name: string) => new SelectNativeFieldBuilder(name) ]
  ])('%s', (_, getBuilder) => {

    it('Should default to an empty string', () => {
      expect(getBuilder('n').getDefaultValue()).toBe('')
    })

    it('Should set placeholder', () => {
      expect(getBuilder('n').model('m').placeholder('Pick one').build().placeholder).toBe('Pick one')
    })

    it('Should set multiple to true by default and switch default value to an array', () => {
      const builder = getBuilder('n').multiple()
      expect(builder.model('m').build().multiple).toBe(true)
      expect(builder.getDefaultValue()).toStrictEqual([])
    })

    it('Should keep a previously set default value when switching to multiple', () => {
      expect(getBuilder('n').default('a').multiple().getDefaultValue()).toStrictEqual([ 'a' ])
    })

    it('Should switch back to a single value when multiple is disabled', () => {
      const builder = getBuilder('n').multiple().default([ 'a', 'b' ]).multiple(false)
      expect(builder.model('m').build().multiple).toBe(false)
      expect(builder.getDefaultValue()).toBe('a')
    })

  })


  describe.each(optionBuilders)('%s options', (_, getBuilder) => {

    it('Should have no options by default', () => {
      expect(getBuilder().build().options).toStrictEqual([])
    })

    it('Should append options with option()', () => {
      expect(getBuilder().option('A', 'a').option('B', 'b').build().options)
        .toStrictEqual([ { name: 'A', value: 'a' }, { name: 'B', value: 'b' } ])
    })

    it('Should accept an array of options', () => {
      expect(getBuilder().options([ { name: 'A', value: 'a' } ]).build().options)
        .toStrictEqual([ { name: 'A', value: 'a' } ])
    })

    it('Should accept an array of values', () => {
      expect(getBuilder().options([ 'a', 'b' ]).build().options)
        .toStrictEqual([ { name: 'a', value: 'a' }, { name: 'b', value: 'b' } ])
    })

    it('Should accept an object mapping values to names', () => {
      expect(getBuilder().options({ a: 'A', b: 'B' }).build().options)
        .toStrictEqual([ { name: 'A', value: 'a' }, { name: 'B', value: 'b' } ])
    })

    it('Should replace previous options', () => {
      expect(getBuilder().option('A', 'a').options([ 'b' ]).build().options)
        .toStrictEqual([ { name: 'b', value: 'b' } ])
    })

    it('Should not share options with a previous build', () => {
      const builder = getBuilder().option('A', 'a')
      const first = builder.build()
      builder.option('B', 'b')
      expect(first.options).toHaveLength(1)
    })

  })

  describe('ChecklistFieldBuilder', () => {

    it('Should default to an empty array', () => {
      expect(new ChecklistFieldBuilder('n').getDefaultValue()).toStrictEqual([])
    })

  })


  describe.each([
    [ 'SelectFieldBuilder', () => new SelectFieldBuilder('n').model('m') ],
    [ 'SelectNativeFieldBuilder', () => new SelectNativeFieldBuilder('n').model('m') ]
  ])('%s multiple()', (_, getBuilder) => {

    it('Should keep an array default when multiple is enabled twice', () => {
      expect(getBuilder().multiple().default([ 'a', 'b' ]).multiple().getDefaultValue()).toStrictEqual([ 'a', 'b' ])
    })

    it('Should keep a single default when multiple is disabled on a single select', () => {
      expect(getBuilder().default('a').multiple(false).getDefaultValue()).toBe('a')
    })

    it('Should switch an empty array back to an empty string', () => {
      expect(getBuilder().multiple().multiple(false).getDefaultValue()).toBe('')
    })

    it('Should not share the default array between builders', () => {
      const first = getBuilder().multiple()
      const second = getBuilder().multiple()
      expect(first.getDefaultValue()).not.toBe(second.getDefaultValue())
    })

  })

  describe.each(optionBuilders)('%s option values', (_, getBuilder) => {

    it('Should copy option objects passed to options()', () => {
      const options = [ { name: 'A', value: 'a' } ]
      const field = getBuilder().options(options).build()
      options[0].name = 'Changed'
      expect(field.options).toStrictEqual([ { name: 'A', value: 'a' } ])
    })

    it('Should add options after extend() removed them', () => {
      expect(getBuilder().extend({ options: undefined }).option('A', 'a').build().options)
        .toStrictEqual([ { name: 'A', value: 'a' } ])
    })

    it('Should return the builder instance from option() and options()', () => {
      const builder = getBuilder()
      expect(builder.option('A', 'a')).toBe(builder)
      expect(builder.options([ 'b' ])).toBe(builder)
    })

  })

  describe('RadioFieldBuilder', () => {

    it('Should build with type "input" and inputType "radio"', () => {
      expect(new RadioFieldBuilder('n').model('m').build()).toMatchObject({ type: 'input', inputType: 'radio' })
    })

    it('Should accept an option value as default', () => {
      expect(new RadioFieldBuilder('n').option('A', 'a').default('a').getDefaultValue()).toBe('a')
    })

  })

})
