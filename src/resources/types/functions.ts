import { Component } from 'vue'
import { Field } from '@/resources/types/fields'

export type TDynamicAttributeBooleanFunction = (model: Record<string, never>, field: Field) => boolean
export type TDynamicAttributeStringFunction = (model: Record<string, never>, field: Field) => string

export type TValidatorFunction = (value: never, field: object, _model: object, _fieldComponent: Component) => boolean
export type TOnValidatedFunction = (model: Record<string, never>, errors: string[], field: Field) => void
