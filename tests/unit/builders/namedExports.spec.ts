import { it, describe, expect } from 'vitest'
import * as lib from '@/index'
import { f, schema, text, switch as switchField, typed } from '@/index'

describe('Named builder exports', () => {

  it.each(Object.keys(f))('Should export f.%s under the same name', key => {
    expect(lib[key as keyof typeof lib]).toBe(f[key as keyof typeof f])
  })

  it('Should export exactly the builders of f, besides f itself', () => {
    const exported = Object.keys(f).filter(key => key in lib)
    expect(exported).toStrictEqual(Object.keys(f))
  })

  it('Should build the same schema as f', () => {
    const named = schema({ name: text().label('Name'), active: switchField() }).build()
    const viaF = f.schema({ name: f.text().label('Name'), active: f.switch() }).build()
    expect(named).toStrictEqual(viaF)
  })

  it('Should export typed()', () => {
    const t = typed<{ name: string }>()
    expect(t.schema({ name: t.text() }).build().model).toStrictEqual({ name: '' })
  })

})
