import { it, describe, expect } from 'vitest'
import ChecklistFieldBuilder from '@/builders/fields/ChecklistFieldBuilder'

describe('ChecklistFieldBuilder', () => {

  describe('constructor', () => {

    it('Should instantiate with the right type', () => {
      const builder = new ChecklistFieldBuilder('testField', 'testModel')
      expect(builder.__data__().type).toBe('checklist')
    })

  })

})

