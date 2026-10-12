/* eslint-disable @typescript-eslint/no-unused-vars -- Values are declared only to infer their types. */
import { describe, it, expectTypeOf } from 'vitest'
import { f } from '@/builders'
import type { InferModel, InferField } from '@/builders/schema'
import type { TextField, ButtonField } from '@/resources/types/field/fields'
import validators from '@/validators'

describe('Builder types', () => {

  it('Should infer the model of a schema', () => {
    const schema = f.schema({
      name: f.text(),
      age: f.number(),
      accept: f.checkbox(),
      address: f.object({ street: f.text() }),
      save: f.submit()
    })
    expectTypeOf<InferModel<typeof schema>>()
      .toEqualTypeOf<{ name: string, age: number, accept: boolean, address: { street: string } }>()
    expectTypeOf(schema.build().model).toEqualTypeOf<InferModel<typeof schema>>()
  })

  it('Should include group fields in the model', () => {
    const schema = f.schema({ name: f.text() }).group('Group', { age: f.number() })
    expectTypeOf<InferModel<typeof schema>>().toEqualTypeOf<{ name: string, age: number }>()
  })

  it('Should infer the field union', () => {
    const schema = f.schema({ name: f.text(), save: f.button().buttonText('Save') })
    expectTypeOf<InferField<typeof schema>>().toEqualTypeOf<TextField | ButtonField>()
  })

  it('Should infer literal option values', () => {
    const schema = f.schema({
      role: f.select().option('Admin', 'admin').option('User', 'user'),
      roles: f.select().options([ 'admin', 'user' ]).multiple(),
      gender: f.radio().options({ m: 'Male', f: 'Female' }),
      tags: f.checklist().options([ { name: 'A', value: 'a' } ]),
      free: f.selectNative()
    })
    expectTypeOf<InferModel<typeof schema>>().toEqualTypeOf<{
      role: 'admin' | 'user' | ''
      roles: ('admin' | 'user')[]
      gender: 'm' | 'f' | ''
      tags: 'a'[]
      free: string
    }>()
  })

  it('Should fall back to string for dynamic options', () => {
    const values: string[] = [ 'a', 'b' ]
    const schema = f.schema({ dynamic: f.radio().options(values) })
    expectTypeOf<InferModel<typeof schema>['dynamic']>().toEqualTypeOf<string>()
  })

  it('Should switch between single and multiple values', () => {
    const schema = f.schema({ role: f.select().option('A', 'a').multiple().multiple(false) })
    expectTypeOf<InferModel<typeof schema>['role']>().toEqualTypeOf<'a' | ''>()
  })

  it('Should type-check default values', () => {
    f.number().default(1)
    f.select().option('A', 'a').default('a')
    // @ts-expect-error - Not an option value.
    f.select().option('A', 'a').default('b')
    // @ts-expect-error - Number field takes a number.
    f.number().default('1')
    // @ts-expect-error - Schema default must match the field value.
    f.schema({ age: f.number() }, { age: 'old' })
  })

  it('Should pass the field type to callbacks', () => {
    f.text().visible((model, field) => {
      expectTypeOf(field).toEqualTypeOf<TextField>()
      expectTypeOf(model).toEqualTypeOf<Record<string, any>>()
      return true
    })
    f.text().validator((value) => {
      expectTypeOf(value).toEqualTypeOf<string>()
      return true
    })
  })

  it('Should accept the built-in validators', () => {
    f.text().validator(validators.required, validators.email)
    f.typed<{ name: string }>().text().validator(validators.required)
  })

  it('Should pass the model type to callbacks of a typed factory', () => {
    type User = { name: string, age: number }
    const t = f.typed<User>()
    t.schema({
      age: t.number().validator((value, _field, model) => {
        expectTypeOf(value).toEqualTypeOf<number>()
        expectTypeOf(model).toEqualTypeOf<User>()
        return true
      }),
      name: t.text().visible(model => model.age >= 18).required(model => {
        expectTypeOf(model).toEqualTypeOf<User>()
        return true
      }),
      save: t.button().buttonText('Save').onClick(model => {
        expectTypeOf(model).toEqualTypeOf<User>()
      })
    })
  })

  it('Should check the keys and values of a typed schema', () => {
    const t = f.typed<{ name: string, age: number }>()
    // @ts-expect-error - Unknown key.
    t.schema({ unknown: t.text() })
    // @ts-expect-error - Value type doesn't match.
    t.schema({ age: t.text() })
    // @ts-expect-error - Unknown key inside a group.
    t.schema({ name: t.text() }).group({ unknown: t.text() })
    // Buttons are always allowed.
    t.schema({ name: t.text(), save: t.submit() })
  })

})

describe('Named builder exports', () => {

  it('Should have the same types as the builders of f', async () => {
    const lib = await import('@/index')
    expectTypeOf(lib.text).toEqualTypeOf(f.text)
    expectTypeOf(lib.switch).toEqualTypeOf(f.switch)
    expectTypeOf(lib.select).toEqualTypeOf(f.select)
    expectTypeOf(lib.schema).toEqualTypeOf(f.schema)
    expectTypeOf(lib.typed).toEqualTypeOf(f.typed)
  })

})
