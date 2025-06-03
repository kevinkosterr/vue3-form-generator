import type { Field, FieldValue } from '@/resources/types/field/fields'
import { FormModel } from '@/resources/types/fieldAttributes'

export type TDynamicAttributeBooleanFunction = (model: FormModel, field: Field) => boolean
export type TDynamicAttributeStringFunction = (model: FormModel, field: Field) => string

export type TValidatorFunction = (value: FieldValue, field: Field, model: FormModel) => boolean
export type TOnValidatedFunction = (model: FormModel, errors: string[], field: Field) => void
