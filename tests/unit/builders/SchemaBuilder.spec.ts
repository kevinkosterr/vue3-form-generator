import { it, describe, expect, vi } from 'vitest'
import { SchemaBuilder } from '@/builders/schema'
import { isRef } from 'vue'
import { BuilderError } from '@/exceptions'
import { f } from '@/builders'

import TextFieldBuilder from '@/builders/fields/TextFieldBuilder'
import ButtonFieldBuilder from '@/builders/fields/ButtonFieldBuilder'
import ChecklistFieldBuilder from '@/builders/fields/ChecklistFieldBuilder'
import CheckboxFieldBuilder from '@/builders/fields/CheckboxFieldBuilder'

const getBuilderNoGroups = () => new SchemaBuilder({
  testField: new TextFieldBuilder('testField')
})

describe('SchemaBuilder', () => {

  describe('constructor', () => {

    it('Should instantiate with field builders', () => {
      const builder = new SchemaBuilder({
        testField: new TextFieldBuilder('testField'),
        testField2: new TextFieldBuilder('testField2')
      })
      expect(builder.getFields()).toHaveLength(2)
      const onlyBuilders = builder.getFields().filter(field => field instanceof TextFieldBuilder)
      expect(onlyBuilders).toHaveLength(2)
    })

  })

  describe('toRef()', () => {

    it('Should return a ref', () => {
      const builder = getBuilderNoGroups()
      const schemaRef = builder.toRef()
      expect(isRef(schemaRef)).toBeTruthy()
    })

    it('Should call build()', () => {
      const builder = getBuilderNoGroups()
      const spy = vi.spyOn(builder, 'build')
      builder.toRef()
      expect(spy).toHaveBeenCalledOnce()
      spy.mockRestore()
    })

  })

  describe('build()', () => {

    it('Should return a complete schema as JSON object', () => {
      const builder = new SchemaBuilder({
        username: new TextFieldBuilder('username'),
        name: new TextFieldBuilder('name'),
        surname: new TextFieldBuilder('surname')
      })
      const formSchema = builder.build()
      expect(formSchema.model).toBeDefined()
      expect(formSchema.model.username).toBeDefined()
      expect(formSchema.model.name).toBeDefined()
      expect(formSchema.model.surname).toBeDefined()

      const schema = formSchema.schema
      expect(schema).toBeDefined()
      expect(schema.fields).toBeDefined()

      expect(schema.fields[0].name).toBe('username')
      expect(schema.fields[0].model).toBe('username')
    })

  })

  describe('defaults', () => {

    it('Should use the default values of the field builders', () => {
      const builder = new SchemaBuilder({
        name: new TextFieldBuilder('name').default('John'),
        tags: new ChecklistFieldBuilder('tags')
      })
      expect(builder.getModel()).toStrictEqual({ name: 'John', tags: [] })
    })

    it('Should override field defaults with schema defaults', () => {
      const builder = new SchemaBuilder({
        name: new TextFieldBuilder('name').default('John'),
        surname: new TextFieldBuilder('surname')
      }, { name: 'Jane' })
      expect(builder.build().model).toStrictEqual({ name: 'Jane', surname: '' })
    })

    it('Should apply falsy schema defaults', () => {
      const builder = new SchemaBuilder({
        accept: new CheckboxFieldBuilder('accept').default(true)
      }, { accept: false })
      expect(builder.getModel().accept).toBe(false)
    })

  })

  describe('fields without value', () => {

    it('Should add buttons to the fields, but not to the model', () => {
      const builder = new SchemaBuilder({
        name: new TextFieldBuilder('name'),
        save: new ButtonFieldBuilder('save').buttonText('Save').onClick(() => {})
      })
      const { model, schema } = builder.build()
      expect(schema.fields).toHaveLength(2)
      expect(model).not.toHaveProperty('save')
      expect(schema.fields![1].model).toBeUndefined()
    })

  })

  describe('validation', () => {

    it('Should throw when an entry is not a field builder', () => {
      expect(() => new SchemaBuilder({ name: 'test' } as any)).toThrowError(/Field "name"/)
    })

    it('Should throw on duplicate keys between groups, including buttons', () => {
      expect(() => f.schema({ save: f.submit() }).group({ save: f.submit() })).toThrowError(/Duplicate/)
    })

    it('Should throw a BuilderError with the key of a field that fails to build', () => {
      const schema = f.schema({ name: f.text(), date: f.mask() })
      expect(() => schema.build()).toThrowError(BuilderError)
      try {
        schema.build()
      } catch (e) {
        expect((e as BuilderError).path).toBe('date')
      }
    })

    it('Should throw with the key of a failing field inside a group', () => {
      expect(() => f.schema({}).group('Group', { date: f.mask() }).build()).toThrowError(/Field "date"/)
    })

    it('Should throw when an explicit model conflicts with the key', () => {
      expect(() => f.schema({ name: f.text().model('other') })).toThrowError(/Field "name".*conflicts/)
    })

    it('Should throw on duplicate keys between fields and groups', () => {
      const builder = getBuilderNoGroups()
      expect(() => builder.group('Group', { testField: new TextFieldBuilder('testField') })).toThrowError(/Duplicate/)
    })

  })

  describe('group()', () => {

    it('Should add a group with legend and fields', () => {
      const { schema } = getBuilderNoGroups()
        .group('Address', { street: new TextFieldBuilder('street'), city: new TextFieldBuilder('city') })
        .build()
      expect(schema.fields).toHaveLength(1)
      expect(schema.groups).toHaveLength(1)
      expect(schema.groups![0].legend).toBe('Address')
      expect(schema.groups![0].fields.map(field => field.model)).toStrictEqual([ 'street', 'city' ])
    })

    it('Should add group fields to the shared model, with defaults', () => {
      const { model } = getBuilderNoGroups()
        .group('Address', { street: new TextFieldBuilder('street') }, { street: 'Main st.' })
        .build()
      expect(model).toStrictEqual({ testField: '', street: 'Main st.' })
    })

    it('Should leave out the legend if not given', () => {
      const { schema } = getBuilderNoGroups().group({ street: new TextFieldBuilder('street') }).build()
      expect(schema.groups![0]).not.toHaveProperty('legend')
    })

    it('Should not include groups when there are none', () => {
      expect(getBuilderNoGroups().build().schema).not.toHaveProperty('groups')
    })

  })


  describe('names', () => {

    it('Should use the key as name when no name was given', () => {
      const { schema } = f.schema({ username: f.text(), save: f.submit() }).build()
      expect(schema.fields!.map(field => field.name)).toStrictEqual([ 'username', 'save' ])
    })

    it('Should keep an explicitly given name', () => {
      expect(f.schema({ username: f.text('user_name') }).build().schema.fields![0].name).toBe('user_name')
    })

  })

  describe('immutability', () => {

    it('Should not modify the field builders passed to it', () => {
      const name = f.text()
      f.schema({ first: name }, { first: 'John' })
      const { model, schema } = f.schema({ second: name }).build()
      expect(model).toStrictEqual({ second: '' })
      expect(schema.fields![0]).toMatchObject({ name: 'second', model: 'second' })
    })

    it('Should return a fresh model on every build', () => {
      const builder = f.schema({ tags: f.checklist(), address: f.object({ street: f.text() }) })
      const first = builder.build()
      first.model.tags.push('a')
      first.model.address.street = 'Main st.'
      expect(builder.build().model).toStrictEqual({ tags: [], address: { street: '' } })
      expect(builder.getModel()).not.toBe(builder.getModel())
    })

  })


  describe('getFields() and getGroups()', () => {

    it('Should return the top-level fields and groups separately', () => {
      const builder = f.schema({ name: f.text() }).group('Address', { street: f.text() })
      expect(builder.getFields()).toHaveLength(1)
      expect(builder.getFields()[0]).toBeInstanceOf(TextFieldBuilder)
      expect(builder.getGroups()).toHaveLength(1)
      expect(builder.getGroups()[0].getFields()).toHaveLength(1)
    })

    it('Should return no groups by default', () => {
      expect(getBuilderNoGroups().getGroups()).toStrictEqual([])
    })

    it('Should return bound copies, not the given builders', () => {
      const name = f.text()
      expect(f.schema({ name }).getFields()[0]).not.toBe(name)
    })

  })

  describe('group() overloads', () => {

    it('Should accept defaults without a legend', () => {
      const { model, schema } = f.schema({}).group({ street: f.text() }, { street: 'Main st.' }).build()
      expect(model).toStrictEqual({ street: 'Main st.' })
      expect(schema.groups![0]).not.toHaveProperty('legend')
    })

    it('Should keep the order of multiple groups', () => {
      const { schema } = f.schema({}).group('A', { a: f.text() }).group('B', { b: f.text() }).build()
      expect(schema.groups!.map(group => group.legend)).toStrictEqual([ 'A', 'B' ])
    })

    it('Should return the same schema builder', () => {
      const builder = f.schema({})
      expect(builder.group({ a: f.text() })).toBe(builder)
    })

  })

  describe('object defaults', () => {

    it('Should override the nested model with a schema default', () => {
      const { model } = f.schema({ address: f.object({ street: f.text() }) }, { address: { street: 'Main st.' } }).build()
      expect(model).toStrictEqual({ address: { street: 'Main st.' } })
    })

    it('Should not share the default object with the given defaults', () => {
      const defaults = { address: { street: 'Main st.' } }
      const { model } = f.schema({ address: f.object({ street: f.text() }) }, defaults).build()
      model.address.street = 'Changed'
      expect(defaults.address.street).toBe('Main st.')
    })

  })

  describe('changing builders afterwards', () => {

    it('Should not be affected by changes to the original builder', () => {
      const name = f.text()
      const builder = f.schema({ name })
      name.label('Changed').default('Changed')
      expect(builder.build().schema.fields![0].label).toBeUndefined()
      expect(builder.build().model.name).toBe('')
    })

  })

})
