import { it, describe, expect, vi } from 'vitest'
import { SchemaBuilder } from '@/builders/schema'
import { isRef } from 'vue'

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
      expect(() => new SchemaBuilder({ name: 'test' } as any)).toThrowError(/name/)
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
      const { schema } = getBuilderNoGroups().group(undefined, { street: new TextFieldBuilder('street') }).build()
      expect(schema.groups![0]).not.toHaveProperty('legend')
    })

    it('Should not include groups when there are none', () => {
      expect(getBuilderNoGroups().build().schema).not.toHaveProperty('groups')
    })

  })

})
