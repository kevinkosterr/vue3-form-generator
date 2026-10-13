/* eslint-disable @typescript-eslint/no-unused-vars -- Values are declared only to check that they compile. */
import { describe, it, expectTypeOf } from 'vitest'
import { f, type InferModel } from '@/index'

/**
 * Samples from apps/docs/guide/introduction/schema-builder.md, to make sure they keep compiling.
 */
describe('Schema builder docs', () => {

  it('Quick start', () => {
    const form = f.schema({
      name: f.text().label('Name').placeholder('Enter your name').required(),
      age: f.number().label('Age').min(0).max(120).default(25),
      role: f.select().label('Role').options({ admin: 'Administrator', user: 'User' }),
      submit: f.submit()
    }).toRef()
    expectTypeOf(form.value.model).toEqualTypeOf<{ name: string, age: number, role: 'admin' | 'user' | '' }>()
  })

  it('Options', () => {
    f.select().option('Administrator', 'admin').option('User', 'user')
    f.select().options([ { name: 'Administrator', value: 'admin' }, { name: 'User', value: 'user' } ])
    f.select().options({ admin: 'Administrator', user: 'User' })
    f.select().options([ 'admin', 'user' ])
  })

  it('Defaults, groups and objects', () => {
    f.schema({ name: f.text().default('John'), age: f.number() }, { age: 30 })
    f.schema({ name: f.text() })
      .group('Address', { street: f.text(), city: f.text() })
      .group({ newsletter: f.checkbox() })
    f.schema({ address: f.object({ street: f.text(), city: f.text() }) })
  })

  it('Typed forms', () => {
    const schema = f.schema({ name: f.text(), age: f.number() })
    expectTypeOf<InferModel<typeof schema>>().toEqualTypeOf<{ name: string, age: number }>()

    type User = { name: string, age: number }
    const t = f.typed<User>()
    t.schema({
      age: t.number(),
      name: t.text().visible(model => model.age >= 18),
      // @ts-expect-error - "nickname" is not a key of the model.
      nickname: t.text()
    })
  })

  it('Without a schema', () => {
    f.text('username').model('username').label('Username').build()
  })

})

describe('Schema builder docs: named exports', () => {

  it('Named exports', async () => {
    const { schema, text, number, switch: switchField } = await import('@/index')
    const form = schema({
      name: text().label('Name'),
      age: number().label('Age'),
      active: switchField().label('Active')
    }).toRef()
    expectTypeOf(form.value.model).toEqualTypeOf<{ name: string, age: number, active: boolean }>()
  })

})
