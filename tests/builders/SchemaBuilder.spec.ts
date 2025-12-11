import { it, describe, expect, vi } from 'vitest'
import { SchemaBuilder } from '@/builders/schema'
import { isRef } from 'vue'

import TextFieldBuilder from '@/builders/fields/TextFieldBuilder'
import GroupBuilder from '@/builders/group'

const getBuilderNoGroups = () => new SchemaBuilder({}, [
  new TextFieldBuilder('testField', 'testModel')
], undefined)

describe('SchemaBuilder', () => {

  describe('constructor', () => {

    it('Should instantiate with field builders', () => {
      const builder = new SchemaBuilder({},
        [
          new TextFieldBuilder('testField', 'testModel'),
          new TextFieldBuilder('testField2', 'testModel2')
        ]
      )
      expect(builder.getFields()).toHaveLength(2)
      const onlyBuilders = builder.getFields().filter(field => field instanceof TextFieldBuilder)
      expect(onlyBuilders).toHaveLength(2)
    })

    it('Should instantiate with groups', () => {
      const builder = new SchemaBuilder({}, [], [
        new GroupBuilder([
          new TextFieldBuilder('testField', 'testModel'),
          new TextFieldBuilder('testField2', 'testModel2')
        ], 'testGroup')
      ])
      expect(builder.getFields()).toHaveLength(0)
      expect(builder.getGroups()).toHaveLength(1)
    })

    it('Should instantiate with both field builders and groups', () => {
      const builder = new SchemaBuilder({},
        [
          new TextFieldBuilder('testField', 'testModel'),
          new TextFieldBuilder('testField2', 'testModel2')
        ],
        [
          new GroupBuilder([
            new TextFieldBuilder('testField', 'testModel'),
            new TextFieldBuilder('testField2', 'testModel2')
          ], 'testGroup')
        ]
      )
      expect(builder.getFields()).toHaveLength(2)
      expect(builder.getGroups()).toHaveLength(1)
    })

    it('Should instantiate without field builders or groups', () => {
      expect(() => {
        new SchemaBuilder({}, undefined, undefined)
      }).not.toThrowError()
    })

  })

  describe('field()', () => {

    it('Should add a field builder to the schema', () => {
      const builder = getBuilderNoGroups()
      expect(builder.getFields().length).toBe(1)
      builder.field(new TextFieldBuilder('name2', 'model2'))
      expect(builder.getFields().length).toBe(2)
      expect(builder.getFields()[1].__data__().name).toBe('name2')
    })

  })

  describe('group()', () => {

    it('Should add a group builder to the schema', () => {
      const builder = new SchemaBuilder({}, [], [
        new GroupBuilder([], 'testGroup')
      ])
      expect(builder.getGroups()).toHaveLength(1)
      builder.group('testGroup2', new TextFieldBuilder('name2', 'model2'), new TextFieldBuilder('name1', 'model1'))
      expect(builder.getGroups()).toHaveLength(2)
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
        username: '',
        name: '',
        surname: ''
      }, [
        new TextFieldBuilder('username', 'username')
      ],
      [
        new GroupBuilder([
          new TextFieldBuilder('name', 'name'),
          new TextFieldBuilder('surname', 'surname')
        ], 'Personal details')
      ])
      const formSchema = builder.build()
      expect(formSchema.model).toBeDefined()
      expect(formSchema.model.username).toBeDefined()
      expect(formSchema.model.name).toBeDefined()
      expect(formSchema.model.surname).toBeDefined()

      const schema = formSchema.schema
      expect(schema).toBeDefined()
      expect(schema.fields).toBeDefined()
      expect(schema.groups).toBeDefined()

      expect(schema.fields[0].name).toBe('username')
      expect(schema.fields[0].model).toBe('username')

      const group = schema.groups[0]
      expect(group).toBeDefined()
      expect(group.fields[0].name).toBe('name')
      expect(group.fields[0].model).toBe('name')
      expect(group.fields[0].type).toBe('input')
      expect(group.fields[0].inputType).toBe('text')
    })

    it('Should fail when provided items are pre-built', () => {
      const builder = new SchemaBuilder({
        username: '',
        name: '',
        surname: ''
      }, [
        // @ts-expect-error: Pre-built field builder
        new TextFieldBuilder('username', 'username').build()
      ],
      [
        new GroupBuilder([
          new TextFieldBuilder('name', 'name'),
          new TextFieldBuilder('surname', 'surname')
        ], 'Personal details').build()
      ])
      expect(() => {
        builder.build()
      }).toThrowError()
    })

  })

})
