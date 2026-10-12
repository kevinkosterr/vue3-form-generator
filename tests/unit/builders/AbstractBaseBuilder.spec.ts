import { it, describe, expect } from 'vitest'
import { BuilderError } from '@/exceptions'
import TextFieldBuilder from '@/builders/fields/TextFieldBuilder'
import ChecklistFieldBuilder from '@/builders/fields/ChecklistFieldBuilder'

describe('AbstractBaseBuilder', () => {

  describe('extend()', () => {

    it('Should extend field object with additional properties', () => {
      const field = new TextFieldBuilder('n').model('m').extend({ customProp: 'value', placeholder: 'p' }).build()
      expect(field).toMatchObject({ customProp: 'value', placeholder: 'p' })
    })

    it('Should return builder instance', () => {
      const builder = new TextFieldBuilder('n')
      expect(builder.extend({})).toBe(builder)
    })

  })

  describe('build()', () => {

    it('Should contain all properties as set by the builder', () => {
      const field = new TextFieldBuilder('name').model('name').label('Name').build()
      expect(field).toStrictEqual({ type: 'input', inputType: 'text', name: 'name', model: 'name', label: 'Name' })
    })

    it('Should return a new object on every call', () => {
      const builder = new ChecklistFieldBuilder('n').model('m').option('A', 'a')
      const first = builder.build()
      first.options.push({ name: 'B', value: 'b' })
      first.label = 'Changed'
      const second = builder.build()
      expect(second).not.toBe(first)
      expect(second.options).toStrictEqual([ { name: 'A', value: 'a' } ])
      expect(second.label).toBeUndefined()
    })

    it('Should throw a BuilderError naming the missing keys', () => {
      expect(() => new TextFieldBuilder('n').build()).toThrowError(BuilderError)
      expect(() => new TextFieldBuilder('n').build()).toThrowError(/text|input/)
      expect(() => new TextFieldBuilder('n').build()).toThrowError(/"model" \(call \.model\(key\)/)
    })

    it('Should require a name', () => {
      expect(() => new TextFieldBuilder().model('m').build()).toThrowError(/"name"/)
    })

    it('Should throw when required keys are empty', () => {
      expect(() => new TextFieldBuilder('n').model('').build()).toThrowError(/"model"/)
    })

  })

  describe('id(), visible(), hidden(), disabled()', () => {

    it('Should set the properties, defaulting booleans to true', () => {
      const field = new TextFieldBuilder('n').model('m').id('my-id').visible().disabled().build()
      expect(field).toMatchObject({ id: 'my-id', visible: true, disabled: true })
    })

    it('Should accept functions', () => {
      const isVisible = () => false
      expect(new TextFieldBuilder('n').model('m').visible(isVisible).build().visible).toBe(isVisible)
    })

    it('Should set visible to false with hidden()', () => {
      expect(new TextFieldBuilder('n').model('m').hidden().build().visible).toBe(false)
    })

  })

  describe('bindTo()', () => {

    it('Should not modify the original builder', () => {
      const builder = new TextFieldBuilder()
      const bound = builder.bindTo('username', 'John')
      expect(bound).not.toBe(builder)
      expect(bound.build()).toMatchObject({ name: 'username', model: 'username' })
      expect(bound.getDefaultValue()).toBe('John')
      expect(builder.getDefaultValue()).toBe('')
      expect(() => builder.build()).toThrowError(BuilderError)
    })

    it('Should keep an explicitly set name', () => {
      expect(new TextFieldBuilder('user_name').bindTo('username').build().name).toBe('user_name')
    })

    it('Should throw when an explicit model conflicts with the key', () => {
      expect(() => new TextFieldBuilder().model('other').bindTo('username')).toThrowError(/conflicts/)
      expect(() => new TextFieldBuilder().model('username').bindTo('username')).not.toThrow()
    })

  })


  describe('missing keys', () => {

    it('Should list every missing key', () => {
      expect(() => new TextFieldBuilder().build()).toThrowError(/"name" .*"model" /)
    })

    it('Should name a missing key without hint', () => {
      expect(() => new TextFieldBuilder('n').model('m').extend({ inputType: '' }).build())
        .toThrowError(/missing required "inputType"\./)
    })

  })

  describe('default()', () => {

    it('Should set the default value', () => {
      expect(new TextFieldBuilder().default('John').getDefaultValue()).toBe('John')
    })

    it('Should return builder instance', () => {
      const builder = new TextFieldBuilder()
      expect(builder.default('John')).toBe(builder)
    })

  })

  describe('clone()', () => {

    it('Should return an instance of the same class', () => {
      const builder = new ChecklistFieldBuilder('n')
      expect(builder.clone()).toBeInstanceOf(ChecklistFieldBuilder)
      expect(builder.clone()).not.toBe(builder)
    })

    it('Should not share field data with the original', () => {
      const builder = new ChecklistFieldBuilder('n').model('m').option('A', 'a')
      const copy = builder.clone().option('B', 'b').label('Copy')
      expect(builder.build().options).toHaveLength(1)
      expect(builder.build().label).toBeUndefined()
      expect(copy.build().options).toHaveLength(2)
    })

    it('Should not share the default value with the original', () => {
      const builder = new TextFieldBuilder().default('a')
      builder.clone().default('b')
      expect(builder.getDefaultValue()).toBe('a')
    })

  })

  describe('model()', () => {

    it('Should set the model and return builder instance', () => {
      const builder = new TextFieldBuilder('n')
      expect(builder.model('m')).toBe(builder)
      expect(builder.build().model).toBe('m')
    })

  })

  describe('extend()', () => {

    it('Should be able to override builder properties', () => {
      expect(new TextFieldBuilder('n').model('m').placeholder('a').extend({ placeholder: 'b' }).build().placeholder)
        .toBe('b')
    })

  })

})
