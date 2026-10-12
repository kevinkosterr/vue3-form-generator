import type { Field, FieldValue } from '@/resources/types/field/fields'
import { FormModel } from '@/resources/types/fieldAttributes'

export type TDynamicAttributeBooleanFunction<M = FormModel, F = Field> = (model: M, field: F) => boolean
export type TDynamicAttributeStringFunction<M = FormModel, F = Field> = (model: M, field: F) => string

export type TValidatorFunction<V = FieldValue, F = Field, M = FormModel> = (value: V, field: F, model: M) => boolean
export type TOnValidatedFunction<M = FormModel, F = Field> = (model: M, errors: string[], field: F) => void
