import { describe, it, expect } from 'vitest'
import { useFieldEmits } from '@/composables/useFieldEmits'

describe('useFieldEmits', () => {

  it('Should return proper emits', () => {
    const emits = useFieldEmits()
    expect(emits.includes('onInput')).toBe(true)
    expect(emits.includes('validated')).toBe(true)
  })

})