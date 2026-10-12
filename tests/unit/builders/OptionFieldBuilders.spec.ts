import { it, describe, expect } from 'vitest'
import { camelize } from 'vue'
import { getFieldComponentName } from '@/helpers'
import RadioFieldBuilder from '@/builders/fields/RadioFieldBuilder'
import SelectFieldBuilder from '@/builders/fields/SelectFieldBuilder'
import SelectNativeFieldBuilder from '@/builders/fields/SelectNativeFieldBuilder'
import ChecklistFieldBuilder from '@/builders/fields/ChecklistFieldBuilder'

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
      expect(getBuilder('n').placeholder('Pick one').__data__().placeholder).toBe('Pick one')
    })

    it('Should set multiple to true by default and switch default value to an array', () => {
      const builder = getBuilder('n').multiple()
      expect(builder.__data__().multiple).toBe(true)
      expect(builder.getDefaultValue()).toStrictEqual([])
    })

    it('Should keep a previously set default value when switching to multiple', () => {
      expect(getBuilder('n').default('a').multiple().getDefaultValue()).toStrictEqual([ 'a' ])
    })

    it('Should switch back to a single value when multiple is disabled', () => {
      const builder = getBuilder('n').multiple().default([ 'a', 'b' ]).multiple(false)
      expect(builder.__data__().multiple).toBe(false)
      expect(builder.getDefaultValue()).toBe('a')
    })

  })

})
