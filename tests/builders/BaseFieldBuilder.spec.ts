import { describe, it, expect } from 'vitest'
import { BaseFieldBuilder } from '@/builders/base'
import type { FieldBase } from '@/resources/types/field/base'
import FieldButton from '@/fields/core/FieldButton.vue'

type TestField = FieldBase & {
  type: 'test',
  testKey: string
}

class TestBaseFieldBuilder extends BaseFieldBuilder<TestField> {
  constructor(model: string, name?: string) {
    super('test', model)
    if (name) this.name(name)
  }

  testKey (value: string): this {
    this.data.testKey = value
    return this
  }

  getRequiredKeys(): (keyof TestField)[] {
    const keys = super.getRequiredKeys()
    return [ ...keys, 'testKey' ]
  }

}

function testField (name: string, model: string): TestBaseFieldBuilder {
  return new TestBaseFieldBuilder(model, name)
}

function getBuilder (): TestBaseFieldBuilder {
  return new TestBaseFieldBuilder('testField', 'testModel').testKey('test')
}

describe('BaseFieldBuilder', () => {

  describe('constructor', () => {

    it('Should initialize with type, name and model', () => {
      const field = testField('testField', 'testModel').testKey('test').build()

      expect(field.type).toBe('test')
      expect(field.name).toBe('testField')
      expect(field.testKey).toBe('test')
      expect(field.model).toBe('testModel')
    })

    it('Should initialize without name and model', () => {
      const builder = new TestBaseFieldBuilder('testName').testKey('test')
      expect(builder.__data__().type).toBeDefined()
      expect(builder.__data__().name).toBeUndefined()

      builder.name('testField').model('testModel')
      expect(builder.__data__().name).toBe('testField')
      expect(builder.__data__().model).toBe('testModel')
      expect(() => {
        builder.build()
      }).not.toThrowError()
    })

    it('Should not initialize without model', () => {
      expect(() => {
        new TestBaseFieldBuilder().build()
      }).toThrowError()
    })

    it('Should initialize data as partial object', () => {
      const builder = testField('testField', 'testModel').testKey('test')

      expect(builder.__data__()).toEqual({
        type: 'test',
        testKey: 'test',
        name: 'testField',
        model: 'testModel'
      })
    })

  })

  describe('id()', () => {

    it('Should properly set the id property', () => {
      const builder = getBuilder()
        .id('testId')

      expect(builder.__data__().id).toBe('testId')
      expect(builder.build().id).toBe('testId')
    })

    it('Should return builder instance', () => {
      const builder = getBuilder().id('testId')
      expect(builder).toBeInstanceOf(TestBaseFieldBuilder)
    })

  })

  describe('label()', () => {

    it('Should properly set the label property', () => {
      const builder = getBuilder().label('testLabel')

      expect(builder.__data__().label).toBe('testLabel')
      expect(builder.build().label).toBe('testLabel')
    })

    it('Should return builder instance', () => {
      const builder = getBuilder().label('testLabel')
      expect(builder).toBeInstanceOf(TestBaseFieldBuilder)
    })

  })

  describe('labelIcon()', () => {

    it('Should properly set the labelIcon property', () => {
      const builder = getBuilder().labelIcon('testIcon')

      expect(builder.__data__().labelIcon).toBe('testIcon')
      expect(builder.build().labelIcon).toBe('testIcon')
    })

    it('Should be able to set component instance as labelIcon', () => {
      const builder = getBuilder().labelIcon(FieldButton)

      expect(builder.__data__().labelIcon).toBeDefined()
      const field = builder.build()
      // Verify that it is actually a component.
      expect(field.labelIcon).toHaveProperty('__name', 'FieldButton')
      expect(field.labelIcon).toBe(FieldButton)
    })

    it('Should be able to supply LabelDefinition as labelIcon', () => {
      const builder = getBuilder().labelIcon({
        icon: FieldButton,
        position: 'right'
      })

      expect(builder.__data__().labelIcon).toBeDefined()
      expect(builder.__data__().labelIcon['icon']).toBe(FieldButton)
      expect(builder.__data__().labelIcon['position']).toBe('right')
      const field = builder.build()
      // Verify that it is actually a component.
      expect(field.labelIcon).toHaveProperty('icon')
      expect(field.labelIcon).toHaveProperty('position')
      expect(field.labelIcon['icon']).toBe(FieldButton)
    })

    it('Should return builder instance', () => {
      const builder = getBuilder().labelIcon('testLabel')
      expect(builder).toBeInstanceOf(TestBaseFieldBuilder)
    })

  })

  describe('noLabel()', () => {

    it('Should properly set noLabel property', () => {
      const builder = getBuilder().noLabel(true)
      expect(builder.__data__().noLabel).toBe(true)
      expect(builder.build().noLabel).toBe(true)
      builder.noLabel(false)
      expect(builder.__data__().noLabel).toBe(false)

      expect(builder.build().noLabel).toBe(false)
    })

    it('Should set noLabel property to true by default, if called', () => {
      const builder = getBuilder()
      expect(builder.__data__().noLabel).toBeUndefined()

      builder.noLabel()
      expect(builder.__data__().noLabel).toBe(true)
      expect(builder.build().noLabel).toBe(true)
    })

    it('Should return builder instance', () => {
      const builder = getBuilder().noLabel()
      expect(builder).toBeInstanceOf(TestBaseFieldBuilder)
    })

  })

  describe('hint()', () => {

    it('Should properly set the hint property', () => {
      const builder = getBuilder()
      expect(builder.__data__().hint).toBeUndefined()

      builder.hint('testHint')
      expect(builder.__data__().hint).toBe('testHint')
      expect(builder.build().hint).toBe('testHint')
    })

    it('Should be able to set function as hint property', () => {
      const hintFn = () => 'testHint'
      const builder = getBuilder().hint(hintFn)

      expect(builder.__data__().hint).toBe(hintFn)
      expect(builder.build().hint).toBe(hintFn)
    })

    it('Should return builder instance', () => {
      const builder = getBuilder().hint('testHint')
      expect(builder).toBeInstanceOf(TestBaseFieldBuilder)
    })

  })

})
