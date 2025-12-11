import { it, expect, describe } from 'vitest'
import TextFieldBuilder from '@/builders/fields/TextFieldBuilder'

const getBuilder = () => new TextFieldBuilder('fieldName', 'fieldModel')

describe('TextFieldBuilder', () => {

  describe('constructor', () => {

    it('Should instantiate with name and model', () => {
      const builder = new TextFieldBuilder('testField', 'testModel')
      expect(builder.__data__().name).toBe('testField')
      expect(builder.__data__().model).toBe('testModel')
    })

    it('Should instantiate with the right types', () => {
      const builder = new TextFieldBuilder('testField', 'testModel')
      expect(builder.__data__().type).toBe('input')
      expect(builder.__data__().inputType).toBe('text')
    })

  })

  describe('placeholder()', () => {

    it('Should set placeholder property', () => {
      const builder = getBuilder().placeholder('testPlaceholder')
      expect(builder.__data__().placeholder).toBe('testPlaceholder')
      expect(builder.build().placeholder).toBe('testPlaceholder')
    })

    it('Should return the builder instance', () => {
      const builder = getBuilder().placeholder('testPlaceholder')
      expect(builder).toBeInstanceOf(TextFieldBuilder)
    })

  })

  describe('autoComplete()', () => {

    it('Should set autocomplete property', () => {
      const builder = getBuilder().autoComplete(true)
      expect(builder.__data__().autocomplete).toBe(true)
      builder.autoComplete(false)
      expect(builder.__data__().autocomplete).toBe(false)
      expect(builder.build().autocomplete).toBe(false)
    })

    it('Should set the autocomplete property to true, by default', () => {
      const builder = getBuilder().autoComplete()
      expect(builder.__data__().autocomplete).toBe(true)
    })

    it('Should return the builder instance', () => {
      const builder = getBuilder().autoComplete(true)
      expect(builder).toBeInstanceOf(TextFieldBuilder)
    })

  })

})
