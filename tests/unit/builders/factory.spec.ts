import { it, describe, expect } from 'vitest'
import { f } from '@/builders'
import { SchemaBuilder } from '@/builders/schema'
import TextFieldBuilder from '@/builders/fields/TextFieldBuilder'
import PasswordFieldBuilder from '@/builders/fields/PasswordFieldBuilder'
import NumberFieldBuilder from '@/builders/fields/NumberFieldBuilder'
import ColorFieldBuilder from '@/builders/fields/ColorFieldBuilder'
import TextareaFieldBuilder from '@/builders/fields/TextareaFieldBuilder'
import MaskFieldBuilder from '@/builders/fields/MaskFieldBuilder'
import CheckboxFieldBuilder from '@/builders/fields/CheckboxFieldBuilder'
import SwitchFieldBuilder from '@/builders/fields/SwitchFieldBuilder'
import ChecklistFieldBuilder from '@/builders/fields/ChecklistFieldBuilder'
import RadioFieldBuilder from '@/builders/fields/RadioFieldBuilder'
import SelectFieldBuilder from '@/builders/fields/SelectFieldBuilder'
import SelectNativeFieldBuilder from '@/builders/fields/SelectNativeFieldBuilder'
import ButtonFieldBuilder from '@/builders/fields/ButtonFieldBuilder'
import SubmitFieldBuilder from '@/builders/fields/SubmitFieldBuilder'
import ResetFieldBuilder from '@/builders/fields/ResetFieldBuilder'
import ObjectFieldBuilder from '@/builders/fields/ObjectFieldBuilder'

const factories = [
  [ 'text', TextFieldBuilder ],
  [ 'password', PasswordFieldBuilder ],
  [ 'number', NumberFieldBuilder ],
  [ 'color', ColorFieldBuilder ],
  [ 'textarea', TextareaFieldBuilder ],
  [ 'mask', MaskFieldBuilder ],
  [ 'checkbox', CheckboxFieldBuilder ],
  [ 'switch', SwitchFieldBuilder ],
  [ 'checklist', ChecklistFieldBuilder ],
  [ 'radio', RadioFieldBuilder ],
  [ 'select', SelectFieldBuilder ],
  [ 'selectNative', SelectNativeFieldBuilder ],
  [ 'button', ButtonFieldBuilder ],
  [ 'submit', SubmitFieldBuilder ],
  [ 'reset', ResetFieldBuilder ]
] as const

/** Builds a field, filling in the properties that some builders require besides the name. */
const buildBound = (builder: { extend: (p: Record<string, unknown>) => any }) =>
  builder.extend({ mask: '#', buttonText: 'Go' }).bindTo('key').build()

describe('f', () => {

  describe.each(factories)('f.%s()', (factory, BuilderClass) => {

    it(`Should return a ${BuilderClass.name} instance`, () => {
      expect(f[factory]()).toBeInstanceOf(BuilderClass)
    })

    it('Should return a new instance on every call', () => {
      expect(f[factory]()).not.toBe(f[factory]())
    })

    it('Should pass the name to the builder', () => {
      expect(buildBound(f[factory]('my_name')).name).toBe('my_name')
    })

    it('Should leave the name to the schema when omitted', () => {
      expect(buildBound(f[factory]()).name).toBe('key')
    })

  })

  describe('f.object()', () => {

    it('Should return an ObjectFieldBuilder with or without a name', () => {
      expect(f.object({ street: f.text() })).toBeInstanceOf(ObjectFieldBuilder)
      expect(f.object('addr', { street: f.text() })).toBeInstanceOf(ObjectFieldBuilder)
    })

  })

  describe('f.schema()', () => {

    it('Should return a SchemaBuilder with the given defaults', () => {
      const schema = f.schema({ name: f.text() }, { name: 'John' })
      expect(schema).toBeInstanceOf(SchemaBuilder)
      expect(schema.getModel()).toStrictEqual({ name: 'John' })
    })

  })

  describe('f.typed()', () => {

    it('Should return a factory with the same builders and no typed()', () => {
      const t = f.typed<{ name: string }>()
      expect(Object.keys(t).sort()).toStrictEqual(Object.keys(f).filter(key => key !== 'typed').sort())
      expect(t.text()).toBeInstanceOf(TextFieldBuilder)
      expect(t.schema({ name: t.text() })).toBeInstanceOf(SchemaBuilder)
    })

  })

})
