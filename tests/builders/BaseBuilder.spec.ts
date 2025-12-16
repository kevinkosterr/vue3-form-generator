import { describe, it, expect } from 'vitest'
import { BaseBuilder } from '@/builders/base'
import { FieldBase } from '@/resources/types/field/base'

type TestField = FieldBase & { [key: string]: any }
class TestBaseBuilder extends BaseBuilder<TestField> {
  constructor(name: string) {
    super('test', name)
  }
}

function getBuilder () {
  return new TestBaseBuilder('testName').model('testModel')
}

describe('BaseBuilder', () => {

  describe('extend()', () => {

    it('Should extend field object with additional properties', () => {
      const field = getBuilder().extend({ testKey2: 2 }).build()

      expect(field['testKey2']).not.toBeUndefined()
      expect(field['testKey2']).toBe(2)
    })

    it('Should return builder instance', () => {
      const builder = getBuilder().extend({})
      expect(builder).toBeInstanceOf(TestBaseBuilder)
    })

  })

  describe('build()', () => {

    it('Should contain all properties as set by the builder', () => {
      const field = getBuilder()
        .build()

      expect(field.name).toBe('testName')
      expect(field.model).toBe('testModel')
    })

    it('Should return regular JSON object', () => {
      const field = getBuilder().build()
      expect(field).not.toHaveProperty('__data__')
      expect(field).not.toBeInstanceOf(TestBaseBuilder)
    })

  })

})
