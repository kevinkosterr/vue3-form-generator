import { describe, it, expect } from 'vitest'
import { ref } from 'vue'
import { useModel } from '@/composables/useModel'

describe('Test useModel', () => {

  it('Should return initial model value', () => {
    const model = ref({
      test: 123
    })

    const field = {
      model: 'test',
      name: 'testName',
      type: 'number'
    }

    const { currentModelValue } = useModel(model.value, field)
    expect(currentModelValue.value).toEqual(123)
  })

  it('Should return different value after update', () => {
    const model = ref({
      test: 123
    })

    const field = ref({
      model: 'test',
      name: 'testName',
      type: 'number'
    })

    const { currentModelValue } = useModel(model.value, field.value)
    expect(currentModelValue.value).toEqual(123)

    model.value.test = 456
    expect(currentModelValue.value).toEqual(456)
  })

})