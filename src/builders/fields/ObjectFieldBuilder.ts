import { BaseFieldBuilder } from '@/builders/base'
import { SchemaBuilder, type SchemaEntries, type SchemaModel, type ValidateEntries } from '@/builders/schema'
import type { ObjectField } from '@/resources/types/field/fields'
import type { FormModel } from '@/resources/types/fieldAttributes'

/**
 * Field builder for the object field. Renders a nested form, whose model is an object inside the parent model.
 */
export default class ObjectFieldBuilder<S extends SchemaEntries, M extends object = FormModel>
  extends BaseFieldBuilder<ObjectField, SchemaModel<S>, M>
{
  protected schema: SchemaBuilder<S>

  /**
   * @param schema - An object containing field builders, keyed by their model key inside the object.
   * @param name - Name of the field.
   */
  constructor (schema: S, name?: string) {
    super('object', name)
    this.schema = new SchemaBuilder<S>(schema as S & ValidateEntries<S, FormModel>)
    this.defaultValue = this.schema.getModel()
  }

  protected getRequiredKeys (): (keyof ObjectField)[] {
    return [ ...super.getRequiredKeys(), 'schema' ]
  }

  build (): ObjectField {
    this.data.schema = this.schema.build().schema
    return super.build()
  }

}
