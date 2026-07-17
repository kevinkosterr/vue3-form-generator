import { describe, it, expect } from 'vitest'
import { useFieldProps } from '@/composables/useFieldProps'

describe('useFieldProps', () => {

  it('Returns the right props', () => {
    const props = useFieldProps()
    expect(props.id).toBeTruthy()
    expect(props.field).toBeTruthy()
    expect(props.formOptions).toBeTruthy()
    expect(props.model).toBeTruthy()

    // Test for a random value
    expect(props.validator).toBeFalsy()
  })

})