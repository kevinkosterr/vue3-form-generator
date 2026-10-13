import type { AbstractBaseBuilder } from '@/builders/base'
import type { FormGeneratorGroup } from '@/resources/types/generic'
import { BuilderError } from '@/exceptions'

/**
 * Builder for a group of fields. Usually created through `SchemaBuilder.group()`.
 */
export default class GroupBuilder {
  protected readonly fields: Map<string, AbstractBaseBuilder<any, any, any>>
  protected readonly legend?: string

  /**
   * @param fields - Field builders, keyed by their key inside the schema.
   * @param legend - Legend of the group.
   */
  constructor (fields: Map<string, AbstractBaseBuilder<any, any, any>>, legend?: string) {
    this.fields = fields
    this.legend = legend
  }

  /**
   * Get an array of all fields in this group.
   */
  getFields (): AbstractBaseBuilder<any, any, any>[] {
    return [ ...this.fields.values() ]
  }

  build (): FormGeneratorGroup {
    const group: FormGeneratorGroup = {
      fields: [ ...this.fields ].map(([ key, field ]) => {
        try {
          return field.build()
        } catch (e) {
          throw BuilderError.wrap(e, key)
        }
      })
    }
    if (this.legend) group.legend = this.legend
    return group
  }

}
