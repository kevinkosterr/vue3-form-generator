import { it, describe, expect, vi } from 'vitest'
import BaseOptionFieldBuilder from '@/builders/base/BaseOption'

const getBuilder = () => new BaseOptionFieldBuilder('type', 'name', 'model')

describe('BaseOptionBuilder', () => {

  describe('constructor', () => {

    it('Should instantiate with type, name and model', () => {
      expect(() => new BaseOptionFieldBuilder('type', 'name', 'model')).not.toThrow()
    })

    it('Should include empty options by default', () => {
      const builder = new BaseOptionFieldBuilder('type', 'name', 'model')
      const options = builder.__data__().options
      expect(options).toBeDefined()
      expect(Array.isArray(options)).toBe(true)
      expect(options).toHaveLength(0)
    })

  })

  describe('option()', () => {

    it('Should add an option to the options array', () => {
      const builder = getBuilder()
      const addOptionSpy = vi.spyOn(builder, 'addOption')

      builder.option('Test option', 'test')
      expect(addOptionSpy).toHaveBeenCalledOnce()
      const options = builder.__data__().options
      expect(options).toHaveLength(1)
      expect(options[0].name).toBe('Test option')
      expect(options[0].value).toBe('test')
    })

    it('Should return the builder instance', () => {
      const builder = getBuilder().option('Test option', 'test')
      expect(builder).toBeInstanceOf(BaseOptionFieldBuilder)
    })

  })

  describe('options()', () => {

    it('Should add multiple options to the options array', () => {
      const builder = getBuilder().options([
        { name: 'Test option 1', value: 'test1' },
        { name: 'Test option 2', value: 'test2' }
      ])
      expect(builder.__data__().options).toHaveLength(2)
    })

    it('Should replace old options with new ones', () => {
      const builder = getBuilder()
      builder.option('Replace', 'replace')
      expect(builder.__data__().options).toHaveLength(1)

      builder.options([
        { name: 'Test option 1', value: 'test1' },
        { name: 'Test option 2', value: 'test2' }
      ])
      expect(builder.__data__().options).toHaveLength(2)
      const hasReplacedOption: boolean = builder.__data__().options.some(o => o.value === 'replace')
      expect(hasReplacedOption).toBeFalsy()
    })

  })

})
