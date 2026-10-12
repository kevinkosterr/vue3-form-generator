import { it, describe, expect } from 'vitest'
import { BuilderError } from '@/exceptions'

describe('BuilderError', () => {

  it('Should be an Error with name, reason and path', () => {
    const error = new BuilderError('Something is wrong.', 'address.street')
    expect(error).toBeInstanceOf(Error)
    expect(error.name).toBe('BuilderError')
    expect(error.reason).toBe('Something is wrong.')
    expect(error.path).toBe('address.street')
    expect(error.message).toBe('Field "address.street": Something is wrong.')
  })

  it('Should leave the path out of the message when there is none', () => {
    const error = new BuilderError('Something is wrong.')
    expect(error.path).toBeUndefined()
    expect(error.message).toBe('Something is wrong.')
  })

  describe('wrap()', () => {

    it('Should set the key as path of a BuilderError without path', () => {
      const error = BuilderError.wrap(new BuilderError('Wrong.'), 'street')
      expect(error.path).toBe('street')
      expect(error.reason).toBe('Wrong.')
    })

    it('Should prepend the key to the path of a BuilderError', () => {
      const error = BuilderError.wrap(BuilderError.wrap(new BuilderError('Wrong.'), 'street'), 'address')
      expect(error.path).toBe('address.street')
      expect(error.message).toBe('Field "address.street": Wrong.')
    })

    it('Should convert other errors to a BuilderError', () => {
      const error = BuilderError.wrap(new TypeError('Not a function.'), 'name')
      expect(error).toBeInstanceOf(BuilderError)
      expect(error.reason).toBe('Not a function.')
      expect(error.path).toBe('name')
    })

    it('Should convert thrown non-errors to a BuilderError', () => {
      const error = BuilderError.wrap('Oops', 'name')
      expect(error.reason).toBe('Oops')
      expect(error.path).toBe('name')
    })

  })

})
