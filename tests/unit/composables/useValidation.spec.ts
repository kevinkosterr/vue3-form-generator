import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useValidation } from '@/composables/useValidation'
import { ref, nextTick } from 'vue'

const createBaseField = (overrides = {}) => ({
  name: 'testField',
  model: 'test',
  type: 'text',
  validate: 'onBlur',
  ...overrides
})

const model = {
  test: ''
}
const emits = vi.fn()

describe('useValidation', () => {

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should initialize with empty errors', () => {
    const field = createBaseField()
    const value = ref('')

    const { errors } = useValidation(
      model,
      field,
      value,
      {},
      emits,
      false,
      false,
      false
    )

    expect(errors.value).toEqual([])
  })

  it('Should validate on blur when validate is set to onBlur', async () => {
    const field = createBaseField({
      validate: 'onBlur',
      validator: [ (value) => value.length > 0 ]
    })
    const value = ref('')

    const { onBlur } = useValidation(
      model,
      field,
      value,
      {},
      emits,
      false,
      true,
      false
    )

    await onBlur()

    expect(emits).toHaveBeenCalled()
  })

  it('Should validate on change when validate is set to onChanged', async () => {
    const field = createBaseField({
      validate: 'onChanged',
      validator: [ (value) => value.length > 0 ]
    })
    const value = ref('')

    const { onChanged } = useValidation(
      model,
      field,
      value,
      {},
      emits,
      false,
      true,
      false
    )

    await onChanged()

    expect(emits).toHaveBeenCalled()
  })

  it('Should handle multiple validators', async () => {
    const field = createBaseField({
      validator: [
        (value) => value.length >= 3,
        (value) => value.length <= 10
      ]
    })
    const value = ref('a')

    const { onBlur, errors } = useValidation(
      model,
      field,
      value,
      {},
      emits,
      false,
      true,
      false
    )

    await onBlur()
    await nextTick()

    expect(errors.value).toContain('Field is invalid')
  })

  it('Should clear errors when validation passes', async () => {
    const field = createBaseField({
      validator: [ (value) => value.length > 0 ]
    })
    const value = ref('')

    const { onBlur, errors } = useValidation(
      model,
      field,
      value,
      {},
      emits,
      false,
      true,
      false
    )

    await onBlur()
    expect(errors.value.length).toBeGreaterThan(0)

    value.value = 'valid value'
    await onBlur()
    expect(errors.value).toEqual([])
  })
})