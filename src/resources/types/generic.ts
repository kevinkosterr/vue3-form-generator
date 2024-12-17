import { TValidatorFunction } from '@/resources/types/functions'
import { Component } from 'vue'

export type ValidatorMap = Record<string, TValidatorFunction>

export interface PluginComponentOption {
  name: string;
  component: Component
}

export interface PluginOptions {
  aliases?: Record<string, string>,
  messages?: Record<string, string>,
  components?: PluginComponentOption[]
}

/** We're extending the HTMLElement interface to avoid TypeScript errors in directives  */
declare global {
  interface HTMLElement {
    clickOutsideEvent?: (event: Event) => void;
  }
}