import { GroupBuilder } from '@/builders/group'
import { SchemaBuilder } from '@/builders/schema'
import { BaseFieldBuilder } from '@/builders/base'

import TextFieldBuilder from '@/builders/fields/TextFieldBuilder'

import type { FormModel } from '@/resources/types/fieldAttributes'

type SchemaItem = BaseFieldBuilder<any> | GroupBuilder

function schema(model: FormModel): SchemaBuilder
function schema(model: FormModel, ...items: BaseFieldBuilder<any>[]): SchemaBuilder
function schema(model: FormModel, ...items: GroupBuilder[]): SchemaBuilder
function schema(model: FormModel, ...items: SchemaItem[]): SchemaBuilder
function schema(
  model: FormModel,
  ...items: SchemaItem[]
): SchemaBuilder {
  if (!items || items.length === 0) {
    return new SchemaBuilder(model, undefined, undefined)
  }

  const fields: BaseFieldBuilder<any>[] = []
  const groups: GroupBuilder[] = []

  items.forEach(item => {
    if (item instanceof GroupBuilder) {
      groups.push(item)
    } else {
      fields.push(item as BaseFieldBuilder<any>)
    }
  })

  return new SchemaBuilder(
    model,
    fields.length > 0 ? fields : undefined,
    groups.length > 0 ? groups : undefined
  )
}

export const f = {
  group: (legend?: string, ...fields: BaseFieldBuilder[])=> {
    return new GroupBuilder(fields, legend)
  },
  /**
   * Returns a form schema builder instance.
   * Takes a model object as the first argument. Takes field builders and group builders as the rest of the arguments.
   *
   * The order of field builders and group builders will be reflected inside the rendered form.
   *
   * @example
   *  // With field builders
   *  f.schema(
   *    {
   *     username: ''
   *     role: ''
   *    },
   *    f.text('Username', 'username').placeholder('Enter your username'),
   *    f.select('Role', 'role').addOption('Admin', 'admin')
   *  ).build()
   *
   *  // With groups
   *  f.schema(
   *    {
   *     username: ''
   *     role: ''
   *    },
   *    f.group(
   *      'User details',
   *      f.text('Username', 'username').placeholder('Enter your username'),
   *      f.select('Role', 'role').addOption('Admin', 'admin')
   *    )
   *  ).build()
   *
   * // With groups and field builders
   * f.schema(
   *    {
   *     username: ''
   *     role: '',
   *     terms: false
   *    },
   *    f.group(
   *      'User details',
   *      f.text('Username', 'username').placeholder('Enter your username'),
   *      f.select('Role', 'role').addOption('Admin', 'admin')
   *    ),
   *    f.checkbox('Terms and conditions', 'terms').label('I agree to the terms and conditions')
   *  ).build()
   */
  schema,
  /**
   *
   *
   * @example
   *  // As builder
   *  f.text('modelKey').placeholder('Field placeholder')
   *  // As JSON
   *  f.text('modelKey').placeholder('Field placeholder').build()
   * @param model
   * @returns A text field builder instance.
   */
  text: (model: string): TextFieldBuilder => new TextFieldBuilder(model)
}

