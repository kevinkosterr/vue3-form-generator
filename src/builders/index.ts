import { SchemaBuilder, type SchemaEntries, type SchemaModel } from '@/builders/schema'

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
import ObjectFieldBuilder from '@/builders/fields/ObjectFieldBuilder'
import ButtonFieldBuilder from '@/builders/fields/ButtonFieldBuilder'
import SubmitFieldBuilder from '@/builders/fields/SubmitFieldBuilder'
import ResetFieldBuilder from '@/builders/fields/ResetFieldBuilder'


export const f = {
  /**
   * Returns a form schema builder instance.
   * Takes an object of field builders, keyed by their model key, as the first argument.
   * Optionally takes an object of default values, overriding the defaults set on the field builders.
   * Groups can be added by chaining `.group(legend, fields)`.
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
  schema: <S extends SchemaEntries>(
    schema: S,
    defaults?: Partial<SchemaModel<S>>
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
   * Create a password field builder instance.
   * @param name - Name of the field.
   */
  password: (name: string): PasswordFieldBuilder => new PasswordFieldBuilder(name),
  /**
   * Create a number field builder instance.
   * @example
   *  f.schema({
   *    age: f.number('Age').min(0).max(120).default(25)
   *  })
   * @param name - Name of the field.
   */
  number: (name: string): NumberFieldBuilder => new NumberFieldBuilder(name),
  /**
   * Create a color field builder instance.
   * @param name - Name of the field.
   */
  color: (name: string): ColorFieldBuilder => new ColorFieldBuilder(name),
  /**
   * Create a textarea field builder instance.
   * @param name - Name of the field.
   */
  textarea: (name: string): TextareaFieldBuilder => new TextareaFieldBuilder(name),
  /**
   * Create a mask field builder instance.
   * @example
   *  f.schema({
   *    date: f.mask('Date').mask('##-##-####')
   *  })
   * @param name - Name of the field.
   */
  mask: (name: string): MaskFieldBuilder => new MaskFieldBuilder(name),
  /**
   * Create a checkbox field builder instance.
   * @example
   *  // Inside a schema
   *  f.schema({
   *    fieldModel: f.checkbox('fieldName').label('Checkbox label')
   *  })
   * @param name - Name of the field.
   * @returns A checkbox field builder instance.
   */
  checkbox: (name: string): CheckboxFieldBuilder => new CheckboxFieldBuilder(name),
  /**
   * Create a switch field builder instance.
   * @param name - Name of the field.
   */
  switch: (name: string): SwitchFieldBuilder => new SwitchFieldBuilder(name),
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
   * @param name - Name of the field.
   * @returns A checklist field builder instance.
   */
  checklist: (name: string): ChecklistFieldBuilder => new ChecklistFieldBuilder(name),
  /**
   * Create a radio field builder instance.
   * @param name - Name of the field.
   */
  radio: (name: string): RadioFieldBuilder => new RadioFieldBuilder(name),
  /**
   * Create a select field builder instance.
   * @example
   *  f.schema({
   *    role: f.select('Role').option('Admin', 'admin').option('User', 'user'),
   *    // Model value becomes string[]
   *    roles: f.select('Roles').option('Admin', 'admin').multiple()
   *  })
   * @param name - Name of the field.
   */
  select: (name: string): SelectFieldBuilder => new SelectFieldBuilder(name),
  /**
   * Create a native select field builder instance.
   * @param name - Name of the field.
   */
  selectNative: (name: string): SelectNativeFieldBuilder => new SelectNativeFieldBuilder(name),
  /**
   * Create an object field builder instance, which renders a nested form.
   * @example
   *  f.schema({
   *    address: f.object('Address', {
   *      street: f.text('Street'),
   *      city: f.text('City')
   *    })
   *  })
   *  // Model: { address: { street: '', city: '' } }
   * @param name - Name of the field.
   * @param schema - An object containing field builders, keyed by their model key inside the object.
   */
  object: <S extends SchemaEntries>(name: string, schema: S): ObjectFieldBuilder<S> => new ObjectFieldBuilder<S>(name, schema),
  /**
   * Create a button field builder instance.
   * @param name - Name of the button.
   */
  button: (name: string): ButtonFieldBuilder => new ButtonFieldBuilder(name),
  /**
   * Create a submit button field builder instance.
   * @param name - Name of the button.
   */
  submit: (name: string): SubmitFieldBuilder => new SubmitFieldBuilder(name),
  /**
   * Create a reset button field builder instance.
   * @param name - Name of the button.
   */
  reset: (name: string): ResetFieldBuilder => new ResetFieldBuilder(name)
}
