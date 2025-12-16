import GroupBuilder from '@/builders/group'
import { SchemaBuilder } from '@/builders/schema'
import { BaseFieldBuilder } from '@/builders/base'

import TextFieldBuilder from '@/builders/fields/TextFieldBuilder'
import CheckboxFieldBuilder from '@/builders/fields/CheckboxFieldBuilder'
import ChecklistFieldBuilder from '@/builders/fields/ChecklistFieldBuilder'


export const f = {
  group: (legend?: string, ...fields: BaseFieldBuilder[])=> {
    return new GroupBuilder(fields, legend)
  },
  /**
   * Returns a form schema builder instance.
   * Takes a model object as the first argument. Takes field builders and group builders as the rest of the arguments.
   *
   * @example
   *  // Input
   *  f.schema({
   *    name: f.text('Name').placeholder('Enter your name')
   *  })
   *  // Output
   *  {
   *    model: { name: '' },
   *    schema: {
   *      fields: [
   *        {
   *          type: 'input',
   *          inputType: 'text',
   *          name: 'Name',
   *          model: 'name',
   *          placeholder: 'Enter your name'
   *        }
   *      ]
   *    }
   *  }
   */
  schema: <S extends Record<string, BaseFieldBuilder<any>>>(
    schema: S,
    defaults?: Partial<Record<keyof S, unknown>>
  ): SchemaBuilder<S> => new SchemaBuilder<S>(schema, defaults),
  /**
   * Create a text field builder instance.
   *
   * @example
   *  // Inside a schema
   *  f.schema({
   *    fieldModel: f.text('fieldName').placeholder('Field placeholder')
   *  })
   * @param name - Name of the field.
   * @returns A text field builder instance.
   */
  text: (name: string): TextFieldBuilder => {
    return new TextFieldBuilder(name)
  },
  /**
   * Create a checkbox field builder instance.
   * @example
   *  // Inside a schema
   *  f.schema({
   *    fieldModel: f.checkbox('fieldName').label('Checkbox label')
   *  })
   * @param name
   * @returns A checkbox field builder instance.
   */
  checkbox: (name: string): CheckboxFieldBuilder => new CheckboxFieldBuilder(name),
  /**
   * Create a checklist field builder instance.
   * @example
   *  f.schema({
   *    fieldModel: f.checklist('fieldName').options([
   *      { name: 'All', value: 'all' },
   *      { name: 'Supervisor', value: 'supervisor' }
   *    ]),
   *    // Or...
   *    fieldModel2: f.checklist('fieldName').option('All', 'all').option('Supervisor', 'supervisor')
   *  })
   * @param name
   * @returns A checkbox field builder instance.
   */
  checklist: (name: string): ChecklistFieldBuilder => new ChecklistFieldBuilder(name)
}

