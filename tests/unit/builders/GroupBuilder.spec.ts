import { it, describe, expect } from 'vitest'
import GroupBuilder from '@/builders/group'
import { BuilderError } from '@/exceptions'
import { f } from '@/builders'

const group = (legend?: string) => new GroupBuilder(new Map<string, any>([
  [ 'street', f.text().bindTo('street') ],
  [ 'city', f.text().bindTo('city') ]
]), legend)

describe('GroupBuilder', () => {

  it('Should return its fields in order', () => {
    expect(group().getFields().map(field => field.build().model)).toStrictEqual([ 'street', 'city' ])
  })

  it('Should build the fields with the legend', () => {
    const built = group('Address').build()
    expect(built.legend).toBe('Address')
    expect(built.fields.map(field => field.name)).toStrictEqual([ 'street', 'city' ])
  })

  it('Should leave out an empty legend', () => {
    expect(group().build()).not.toHaveProperty('legend')
    expect(group('').build()).not.toHaveProperty('legend')
  })

  it('Should throw a BuilderError with the key of a failing field', () => {
    const failing = new GroupBuilder(new Map<string, any>([ [ 'date', f.mask().bindTo('date') ] ]))
    expect(() => failing.build()).toThrowError(BuilderError)
    expect(() => failing.build()).toThrowError(/^Field "date":/)
  })

})
