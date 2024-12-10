import { Field, FieldValue } from '@/resources/types/fields'

export type TDynamicAttributeBooleanFunction = (model: Record<string, any>, field: Field) => boolean
export type TDynamicAttributeStringFunction = (model: Record<string, any>, field: Field) => string

export type TValidatorFunction = (value: FieldValue, field: Field, model: Record<string, any>) => boolean
export type TOnValidatedFunction = (model: Record<string, any>, errors: string[], field: Field) => void
