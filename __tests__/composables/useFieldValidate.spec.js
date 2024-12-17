import { it, describe, expect } from 'vitest'
import { useFieldValidate, useFormModel } from '@/composables'
import { generateSchemaSingleField } from '@test/_resources/utils.js'
import validators from '@/validators'

const schema = generateSchemaSingleField(
  'testField',
  'testFieldModel',
  'input',
  'text',
  'Test label',
  '',
  {
    validator: [ validators.required, validators.string ]
  }
)

describe('useFieldValidate', () => {

  it('Should return error message', async () => {
    let errors

    const { currentModelValue } = useFormModel(schema.model, schema.schema.fields[0])
    const { validate } = useFieldValidate(schema.model, schema.schema.fields[0])

    errors = await validate(currentModelValue.value)
    expect(errors.length).toBe(1)
    expect(errors[0]).toBe('Field is required')

    schema.model.testFieldModel = 'abc'
    errors = await validate(currentModelValue.value)
    expect(errors.length).toBe(0)
  })

  it('Shouldn\'t return error message', async () => {
    const { currentModelValue } = useFormModel(schema.model, schema.schema.fields[0])
    const { validate } = useFieldValidate(schema.model, schema.schema.fields[0])
    const errors = await validate(currentModelValue.value)
    expect(errors.length).toBe(0)
  })

})
