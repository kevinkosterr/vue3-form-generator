import { BaseFieldBuilder } from '@/builders/base'
import { SchemaBuilder, type SchemaEntries, type SchemaModel } from '@/builders/schema'
import type { ObjectField } from '@/resources/types/field/fields'

/**
 * Field builder for the object field. Renders a nested form, whose model is an object inside the parent model.
 */
export default class ObjectFieldBuilder<S extends SchemaEntries> extends BaseFieldBuilder<ObjectField, SchemaModel<S>> {
  protected schema: SchemaBuilder<S>

  /**
   * @param name - Name of the field.
   * @param schema - An object containing field builders, keyed by their model key inside the object.
   */
  constructor(name: string, schema: S) {
    super('object', name)
    this.schema = new SchemaBuilder<S>(schema)
    this.__default__ = this.schema.getModel()
  }

  protected getRequiredKeys (): (keyof ObjectField)[] {
    return [ ...super.getRequiredKeys(), 'schema' ]
  }

  build (): ObjectField {
    this.data.schema = this.schema.build().schema
    return super.build()
  }

}
