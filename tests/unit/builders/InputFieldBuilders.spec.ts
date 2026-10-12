import { it, describe, expect } from 'vitest'
import { getFieldComponentName } from '@/helpers'
import NumberFieldBuilder from '@/builders/fields/NumberFieldBuilder'
import PasswordFieldBuilder from '@/builders/fields/PasswordFieldBuilder'
import ColorFieldBuilder from '@/builders/fields/ColorFieldBuilder'
import CheckboxFieldBuilder from '@/builders/fields/CheckboxFieldBuilder'
import SwitchFieldBuilder from '@/builders/fields/SwitchFieldBuilder'
import TextareaFieldBuilder from '@/builders/fields/TextareaFieldBuilder'
import MaskFieldBuilder from '@/builders/fields/MaskFieldBuilder'

describe('Input field builders', () => {

  describe('Component resolution', () => {

    it.each([
      [ 'FieldNumber', () => new NumberFieldBuilder('n') ],
      [ 'FieldPassword', () => new PasswordFieldBuilder('n') ],
      [ 'FieldColor', () => new ColorFieldBuilder('n') ],
      [ 'FieldCheckbox', () => new CheckboxFieldBuilder('n') ],
      [ 'FieldSwitch', () => new SwitchFieldBuilder('n') ],
      [ 'FieldTextarea', () => new TextareaFieldBuilder('n') ],
      [ 'FieldMask', () => new MaskFieldBuilder('n').mask('##') ]
    ])('Should build a field that resolves to %s', (componentName, getBuilder) => {
      const field = getBuilder().model('m').build()
      expect(getFieldComponentName(field)).toBe(componentName)
    })

  })

  describe('Default values', () => {

    it.each([
      [ 'NumberFieldBuilder', new NumberFieldBuilder('n'), 0 ],
      [ 'PasswordFieldBuilder', new PasswordFieldBuilder('n'), '' ],
      [ 'ColorFieldBuilder', new ColorFieldBuilder('n'), '#000000' ],
      [ 'CheckboxFieldBuilder', new CheckboxFieldBuilder('n'), false ],
      [ 'SwitchFieldBuilder', new SwitchFieldBuilder('n'), false ],
      [ 'TextareaFieldBuilder', new TextareaFieldBuilder('n'), '' ],
      [ 'MaskFieldBuilder', new MaskFieldBuilder('n'), '' ]
    ])('%s should have the right default value', (_, builder, expected) => {
      expect(builder.getDefaultValue()).toStrictEqual(expected)
    })

  })

  describe('NumberFieldBuilder', () => {

    it('Should set placeholder, min, max and step', () => {
      const field = new NumberFieldBuilder('n').model('m')
        .placeholder('Amount').min(1).max(10).step(0.5)
        .build()
      expect(field.placeholder).toBe('Amount')
      expect(field.min).toBe(1)
      expect(field.max).toBe(10)
      expect(field.step).toBe(0.5)
    })

  })

  describe('PasswordFieldBuilder', () => {

    it('Should set placeholder, min and max', () => {
      const field = new PasswordFieldBuilder('n').model('m').placeholder('Password').min(8).max(64).build()
      expect(field.placeholder).toBe('Password')
      expect(field.min).toBe(8)
      expect(field.max).toBe(64)
    })

    it('Should set indicator to true by default, if called', () => {
      expect(new PasswordFieldBuilder('n').indicator().__data__().indicator).toBe(true)
      expect(new PasswordFieldBuilder('n').indicator(false).__data__().indicator).toBe(false)
    })

  })

  describe('ColorFieldBuilder', () => {

    it('Should set withInput to true by default, if called', () => {
      expect(new ColorFieldBuilder('n').withInput().__data__().withInput).toBe(true)
      expect(new ColorFieldBuilder('n').withInput(false).__data__().withInput).toBe(false)
    })

  })

  describe('TextareaFieldBuilder', () => {

    it('Should set placeholder, maxLength and resizable', () => {
      const field = new TextareaFieldBuilder('n').model('m').placeholder('Text').maxLength(200).resizable().build()
      expect(field.placeholder).toBe('Text')
      expect(field.maxLength).toBe('200')
      expect(field.resizable).toBe(true)
    })

  })

  describe('MaskFieldBuilder', () => {

    it('Should set mask and mask options', () => {
      const field = new MaskFieldBuilder('n').model('m').mask('##-##', { eager: true }).placeholder('dd-mm').build()
      expect(field.mask).toBe('##-##')
      expect(field.maskOptions).toStrictEqual({ eager: true })
      expect(field.placeholder).toBe('dd-mm')
    })

    it('Should fail to build without a mask', () => {
      expect(() => new MaskFieldBuilder('n').model('m').build()).toThrowError(/mask/)
    })

  })

})
