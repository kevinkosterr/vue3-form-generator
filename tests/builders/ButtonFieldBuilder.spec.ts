import { it, describe, expect } from 'vitest'
import ButtonFieldBuilder from '@/builders/fields/ButtonFieldBuilder'
import { NoValueError } from '@/exceptions'

const getBuilder = () => new ButtonFieldBuilder('testField')

describe('ButtonFieldBuilder', () => {

  describe('constructor', () => {

    it('Should instantiate with the right type', () => {
      const builder = new ButtonFieldBuilder('testField')
      expect(builder.__data__().type).toBe('button')
    })

    it('Should instantiate with the right name', () => {
      const builder = new ButtonFieldBuilder('testName')
      expect(builder.__data__().name).toBe('testName')
    })

  })

  describe('getDefaultValue()', () => {

    it('Should throw NoValueError', () => {
      expect(() => {
        getBuilder().getDefaultValue()
      }).toThrowError(NoValueError)
    })

  })

  describe('buttonText()', () => {

    it('Should properly set buttonText property', () => {
      const builder = getBuilder()
      builder.buttonText('Test text')
      expect(builder.__data__().buttonText).toBe('Test text')
    })

    it('Should return builder instance', () => {
      const builder = getBuilder().buttonText('Test text')
      expect(builder).toBeInstanceOf(ButtonFieldBuilder)
    })

  })

  describe('onClick()', () => {

    it('Should properly set onClick property', () => {
      const fn = (model, field) => console.log(model, field)
      const builder = getBuilder()
      builder.onClick(fn)
      expect(builder.__data__().onClick).toBe(fn)
    })

    it('Should return builder instance', () => {
      const builder = getBuilder().onClick(() => {})
      expect(builder).toBeInstanceOf(ButtonFieldBuilder)
    })

  })

})
