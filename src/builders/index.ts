import { SchemaBuilder, type SchemaEntries, type SchemaModel, type ValidateEntries } from '@/builders/schema'
import type { FormModel } from '@/resources/types/fieldAttributes'

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

/**
 * Creates the builder factory. Every builder is bound to the model type `M`, which is passed to callbacks
 * such as `visible()`, `required()` and `validator()`.
 *
 * Every field builder takes an optional `name`, the HTML name attribute of the field. Inside a schema it
 * defaults to the key of the field.
 */
const createFactory = <M extends object = FormModel>() => {

  function object<S extends SchemaEntries> (schema: S): ObjectFieldBuilder<S, M>
  function object<S extends SchemaEntries> (name: string, schema: S): ObjectFieldBuilder<S, M>
  function object<S extends SchemaEntries> (nameOrSchema: string | S, schema?: S): ObjectFieldBuilder<S, M> {
    return typeof nameOrSchema === 'string'
      ? new ObjectFieldBuilder<S, M>(schema as S, nameOrSchema)
      : new ObjectFieldBuilder<S, M>(nameOrSchema)
  }

  return {
    /**
     * Returns a form schema builder instance.
     * Takes an object of field builders, keyed by their model key, as the first argument.
     * Optionally takes an object of default values, overriding the defaults set on the field builders.
     * Groups can be added by chaining `.group(legend, fields)`.
     *
     * @example
     *  // Input
     *  f.schema({
     *    name: f.text().label('Name').placeholder('Enter your name')
     *  })
     *  // Output
     *  {
     *    model: { name: '' },
     *    schema: {
     *      fields: [
     *        {
     *          type: 'input',
     *          inputType: 'text',
     *          name: 'name',
     *          model: 'name',
     *          label: 'Name',
     *          placeholder: 'Enter your name'
     *        }
     *      ]
     *    }
     *  }
     */
    schema: <S extends SchemaEntries>(
      schema: S & ValidateEntries<S, M>,
      defaults?: Partial<SchemaModel<S>>
    ): SchemaBuilder<S, M> => new SchemaBuilder<S, M>(schema, defaults),
    /**
     * Create a text field builder instance.
     * @example
     *  f.schema({
     *    username: f.text().label('Username').placeholder('Enter your username')
     *  })
     * @param name - HTML name of the field, defaults to its key inside the schema.
     */
    text: (name?: string) => new TextFieldBuilder<M>(name),
    /**
     * Create a password field builder instance.
     * @param name - HTML name of the field, defaults to its key inside the schema.
     */
    password: (name?: string) => new PasswordFieldBuilder<M>(name),
    /**
     * Create a number field builder instance.
     * @example
     *  f.schema({
     *    age: f.number().label('Age').min(0).max(120).default(25)
     *  })
     * @param name - HTML name of the field, defaults to its key inside the schema.
     */
    number: (name?: string) => new NumberFieldBuilder<M>(name),
    /**
     * Create a color field builder instance.
     * @param name - HTML name of the field, defaults to its key inside the schema.
     */
    color: (name?: string) => new ColorFieldBuilder<M>(name),
    /**
     * Create a textarea field builder instance.
     * @param name - HTML name of the field, defaults to its key inside the schema.
     */
    textarea: (name?: string) => new TextareaFieldBuilder<M>(name),
    /**
     * Create a mask field builder instance.
     * @example
     *  f.schema({
     *    date: f.mask().mask('##-##-####')
     *  })
     * @param name - HTML name of the field, defaults to its key inside the schema.
     */
    mask: (name?: string) => new MaskFieldBuilder<M>(name),
    /**
     * Create a checkbox field builder instance.
     * @example
     *  f.schema({
     *    accept: f.checkbox().label('I accept the terms')
     *  })
     * @param name - HTML name of the field, defaults to its key inside the schema.
     */
    checkbox: (name?: string) => new CheckboxFieldBuilder<M>(name),
    /**
     * Create a switch field builder instance.
     * @param name - HTML name of the field, defaults to its key inside the schema.
     */
    switch: (name?: string) => new SwitchFieldBuilder<M>(name),
    /**
     * Create a checklist field builder instance. The model value is an array of the selected option values.
     * @example
     *  f.schema({
     *    roles: f.checklist().options({ all: 'All', supervisor: 'Supervisor' }),
     *    // Or...
     *    roles2: f.checklist().option('All', 'all').option('Supervisor', 'supervisor')
     *  })
     * @param name - HTML name of the field, defaults to its key inside the schema.
     */
    checklist: (name?: string) => new ChecklistFieldBuilder<never, M>(name),
    /**
     * Create a radio field builder instance.
     * @example
     *  f.schema({
     *    gender: f.radio().option('Male', 'm').option('Female', 'f') // Model value: 'm' | 'f' | ''
     *  })
     * @param name - HTML name of the field, defaults to its key inside the schema.
     */
    radio: (name?: string) => new RadioFieldBuilder<never, M>(name),
    /**
     * Create a select field builder instance.
     * @example
     *  f.schema({
     *    role: f.select().option('Admin', 'admin').option('User', 'user'), // 'admin' | 'user' | ''
     *    roles: f.select().options([ 'admin', 'user' ]).multiple() // ('admin' | 'user')[]
     *  })
     * @param name - HTML name of the field, defaults to its key inside the schema.
     */
    select: (name?: string) => new SelectFieldBuilder<never, false, M>(name),
    /**
     * Create a native select field builder instance.
     * @param name - HTML name of the field, defaults to its key inside the schema.
     */
    selectNative: (name?: string) => new SelectNativeFieldBuilder<never, false, M>(name),
    /**
     * Create an object field builder instance, which renders a nested form.
     * @example
     *  f.schema({
     *    address: f.object({
     *      street: f.text(),
     *      city: f.text()
     *    })
     *  })
     *  // Model: { address: { street: '', city: '' } }
     */
    object,
    /**
     * Create a button field builder instance.
     * @param name - HTML name of the button, defaults to its key inside the schema.
     */
    button: (name?: string) => new ButtonFieldBuilder<M>(name),
    /**
     * Create a submit button field builder instance.
     * @param name - HTML name of the button, defaults to its key inside the schema.
     */
    submit: (name?: string) => new SubmitFieldBuilder<M>(name),
    /**
     * Create a reset button field builder instance.
     * @param name - HTML name of the button, defaults to its key inside the schema.
     */
    reset: (name?: string) => new ResetFieldBuilder<M>(name)
  }
}

/**
 * The builder factory, bound to the model type `M`.
 */
export type BuilderFactory<M extends object = FormModel> = ReturnType<typeof createFactory<M>>

/**
 * Builder factory for creating form schemas.
 */
export const f = {
  ...createFactory(),
  /**
   * Returns a builder factory bound to the given model type. Callbacks such as `visible()`, `required()`
   * and `validator()` receive the typed model, and the schema checks its keys and values against it.
   *
   * @example
   *  type User = { name: string, age: number }
   *  const t = f.typed<User>()
   *  t.schema({
   *    age: t.number(),
   *    name: t.text().visible(model => model.age >= 18)
   *  })
   */
  typed: <M extends object>(): BuilderFactory<M> => createFactory<M>()
}

/**
 * Every builder of `f`, also available as a named export under the same name, e.g. `import { schema, text }`.
 * `switch` is a reserved word, so it has to be renamed when imported: `import { switch as switchField }`.
 */
export const {
  schema,
  text,
  password,
  number,
  color,
  textarea,
  mask,
  checkbox,
  switch: _switch,
  checklist,
  radio,
  select,
  selectNative,
  object,
  button,
  submit,
  reset,
  typed
} = f
export { _switch as switch }
