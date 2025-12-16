import { it, describe, expect, vi } from 'vitest'
import { SchemaBuilder } from '@/builders/schema'
import { isRef } from 'vue'

import TextFieldBuilder from '@/builders/fields/TextFieldBuilder'

const getBuilderNoGroups = () => new SchemaBuilder({
  testField: new TextFieldBuilder('testField')
})

describe('SchemaBuilder', () => {

  describe('constructor', () => {

    it('Should instantiate with field builders', () => {
      const builder = new SchemaBuilder({
        testField: new TextFieldBuilder('testField'),
        testField2: new TextFieldBuilder('testField2')
      }
      )
      expect(builder.getFields()).toHaveLength(2)
      const onlyBuilders = builder.getFields().filter(field => field instanceof TextFieldBuilder)
      expect(onlyBuilders).toHaveLength(2)
    })

  })

  describe('field()', () => {

    it('Should add a field builder to the schema', () => {
      const builder = getBuilderNoGroups()
      expect(builder.getFields().length).toBe(1)
      builder.field(new TextFieldBuilder('name2').model('model2'))
      expect(builder.getFields().length).toBe(2)
      expect(builder.getFields()[1].__data__().name).toBe('name2')
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

})
