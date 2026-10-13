# Schema builder
Instead of writing schema objects by hand, you can use the schema builder `f`. It builds the same `model` and
`schema` objects, but checks your schema while you write it:

- The model is generated from the fields, including default values.
- Field names and model keys are taken from the keys of the schema, so you write them once.
- Model types are inferred, including the values of select, radio and checklist options.
- Mistakes such as a missing mask or an unknown model key are reported with the path of the field.

## Quick start
```vue
<template>
  <vue-form-generator :schema="form.schema" :model="form.model" />
</template>

<script setup lang="ts">
import { f } from '@kevinkosterr/vue3-form-generator'

const form = f.schema({
  name: f.text().label('Name').placeholder('Enter your name').required(),
  age: f.number().label('Age').min(0).max(120).default(25),
  role: f.select().label('Role').options({ admin: 'Administrator', user: 'User' }),
  submit: f.submit()
}).toRef()
</script>
```

This results in:
```javascript
{
  model: { name: '', age: 25, role: '' },
  schema: {
    fields: [
      { type: 'input', inputType: 'text', name: 'name', model: 'name', label: 'Name', placeholder: 'Enter your name', required: true },
      { type: 'input', inputType: 'number', name: 'age', model: 'age', label: 'Age', min: 0, max: 120 },
      { type: 'select', name: 'role', model: 'role', label: 'Role', options: [ /* ... */ ] },
      { type: 'submit', name: 'submit', buttonText: 'Submit' }
    ]
  }
}
```

`toRef()` returns the result wrapped in a `ref`. Use `build()` to get a plain object instead. Every call returns a new
object, so building the same schema twice never shares a model.

## Named exports
Every builder of `f` is also exported under the same name, so you can import only what you use:
```typescript
import { schema, text, number, switch as switchField } from '@kevinkosterr/vue3-form-generator'

const form = schema({
  name: text().label('Name'),
  age: number().label('Age'),
  active: switchField().label('Active')
}).toRef()
```
`switch` is a reserved word in JavaScript, so it has to be renamed when you import it.

## Fields
Every builder takes an optional `name`, the HTML `name` attribute of the field. Inside a schema it defaults to the
key of the field.

| Builder            | Field                                                    | Model value                   |
|--------------------|----------------------------------------------------------|-------------------------------|
| `f.text()`         | [FieldText](/guide/fields/FieldText)                     | `string`                      |
| `f.password()`     | [FieldPassword](/guide/fields/FieldPassword)             | `string`                      |
| `f.number()`       | [FieldNumber](/guide/fields/FieldNumber)                 | `number`                      |
| `f.color()`        | [FieldColor](/guide/fields/FieldColor)                   | `string`                      |
| `f.textarea()`     | [FieldTextarea](/guide/fields/FieldTextarea)             | `string`                      |
| `f.mask()`         | [FieldMask](/guide/fields/FieldMask)                     | `string`                      |
| `f.checkbox()`     | [FieldCheckbox](/guide/fields/FieldCheckbox)             | `boolean`                     |
| `f.switch()`       | [FieldSwitch](/guide/fields/FieldSwitch)                 | `boolean`                     |
| `f.radio()`        | [FieldRadio](/guide/fields/FieldRadio)                   | option value                  |
| `f.select()`       | [FieldSelect](/guide/fields/FieldSelect)                 | option value, or array of them |
| `f.selectNative()` | [FieldSelectNative](/guide/fields/FieldSelectNative)     | option value, or array of them |
| `f.checklist()`    | [FieldChecklist](/guide/fields/FieldChecklist)           | array of option values        |
| `f.object()`       | [FieldObject](/guide/fields/FieldObject)                 | nested model                  |
| `f.button()`       | [FieldButton](/guide/fields/FieldButton)                 | -                             |
| `f.submit()`       | [FieldSubmit](/guide/fields/FieldSubmit)                 | -                             |
| `f.reset()`        | [FieldReset](/guide/fields/FieldReset)                   | -                             |

Buttons don't have a value, so they are left out of the model.

### Shared methods
| Method                       | Description                                                                 |
|------------------------------|-----------------------------------------------------------------------------|
| `label(text)`                | Sets the label.                                                             |
| `labelIcon(icon, position?)` | Sets the label icon, optionally with a position (`'left'` or `'right'`).    |
| `noLabel(value = true)`      | Hides the label.                                                            |
| `hint(text \| fn)`           | Sets a hint shown under the field.                                          |
| `default(value)`             | Sets the initial value in the model.                                        |
| `id(id)`                     | Sets the `id` of the field.                                                 |
| `visible(value = true \| fn)` | Sets whether the field is visible.                                          |
| `hidden()`                   | Shorthand for `visible(false)`.                                             |
| `disabled(value = true \| fn)` | Sets whether the field is disabled.                                       |
| `required(value = true \| fn)` | Sets whether the field is required.                                       |
| `readonly(value = true \| fn)` | Sets whether the field is read-only.                                      |
| `validator(...fns)`          | Adds one or more validators. Calling it again adds more.                    |
| `validateOn(trigger)`        | Sets when to validate: `'onBlur'` (default) or `'onChanged'`.               |
| `onValidated(fn)`            | Sets a callback that runs after validation.                                 |
| `extend(properties)`         | Adds any other properties, e.g. for [custom components](/guide/customization/custom-components). |

Field specific methods, such as `placeholder()`, `min()` or `mask()`, are listed on the page of each field.

## Options
`radio`, `select`, `selectNative` and `checklist` accept options in multiple ways:
```typescript
f.select().option('Administrator', 'admin').option('User', 'user')
f.select().options([ { name: 'Administrator', value: 'admin' }, { name: 'User', value: 'user' } ])
f.select().options({ admin: 'Administrator', user: 'User' }) // value: name
f.select().options([ 'admin', 'user' ])                      // value is used as name
```

When the options are known up front, the model type is narrowed to the option values:
```typescript
const schema = f.schema({
  role: f.select().options({ admin: 'Administrator', user: 'User' }),
  roles: f.select().options({ admin: 'Administrator', user: 'User' }).multiple()
})
// role: 'admin' | 'user' | ''
// roles: ('admin' | 'user')[]
```

## Defaults
Set defaults on the fields with `default()`, or for the whole schema with the second argument of `f.schema()`. Schema
defaults take precedence.
```typescript
f.schema({
  name: f.text().default('John'),
  age: f.number()
}, { age: 30 })
// model: { name: 'John', age: 30 }
```

## Groups
Chain `group()` to add a group of fields, optionally with a legend. Fields in a group share the model with the rest of
the schema, so every key must be unique.
```typescript
f.schema({
  name: f.text()
}).group('Address', {
  street: f.text(),
  city: f.text()
}).group({
  newsletter: f.checkbox()
})
// model: { name: '', street: '', city: '', newsletter: false }
```

## Nested objects
`f.object()` renders a nested form whose model is an object inside the parent model.
```typescript
f.schema({
  address: f.object({
    street: f.text(),
    city: f.text()
  })
})
// model: { address: { street: '', city: '' } }
```

## Typed forms
Use `InferModel` to get the model type of a schema:
```typescript
import { f, type InferModel } from '@kevinkosterr/vue3-form-generator'

const schema = f.schema({ name: f.text(), age: f.number() })
type Model = InferModel<typeof schema> // { name: string, age: number }
```

If you already have a model type, use `f.typed<Model>()`. Callbacks such as `visible()`, `required()` and
`validator()` then receive the typed model, and the schema checks its keys and value types against the model:
```typescript
type User = { name: string, age: number }
const t = f.typed<User>()

const schema = t.schema({
  age: t.number(),
  name: t.text().visible(model => model.age >= 18), // model: User
  nickname: t.text() // ❌ "nickname" is not a key of the model
})
```

::: info
Fields inside `f.object()` are checked against the default model type. Use another `f.typed<Nested>()` for the fields
of a nested object.
:::

## Errors
Mistakes found while building throw a `BuilderError`. The error names the path of the field and tells you how to fix it:
```
BuilderError: Field "address.date": Failed to build mask field, missing required "mask" (call .mask(pattern)).
```
The error has a `path` property (`'address.date'`) and a `reason` property with the message without the path.

## Without a schema
Builders can be used on their own, for example to add a single field to a hand-written schema. Without a schema there
is no key, so you set the name and model yourself:
```typescript
const field = f.text('username').model('username').label('Username').build()
```
Inside a schema the key is always used as model. Setting a different model there throws an error.
