import { Field, FieldValue } from '@/resources/types/fields'

export type TDynamicAttributeBooleanFunction = (model: Record<string, never>, field: Field) => boolean
export type TDynamicAttributeStringFunction = (model: Record<string, never>, field: Field) => string

export type TValidatorFunction = (value: FieldValue, field: Field, model: Record<string, never>) => boolean
export type TOnValidatedFunction = (model: Record<string, never>, errors: string[], field: Field) => void
