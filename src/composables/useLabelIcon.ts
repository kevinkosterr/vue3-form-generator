import { type ComputedRef, computed, type ComponentPublicInstance } from 'vue'
import type { LabelIconDefinition } from '@/resources/types/field/base'

/**
 * Simple composable that determines which icon to display and where. If there's no definition for an icon
 * @param iconDefinition - field schema icon definition.
 */
export function useLabelIcon(iconDefinition: string | LabelIconDefinition | ComponentPublicInstance | undefined) {

  /**
   * The icon that should be displayed with a label.
   * If no icon is defined, return null.
   */
  const labelIcon: ComputedRef<string | ComponentPublicInstance | null> = computed(() => {
    if (!iconDefinition) return null

    if (iconDefinition.hasOwnProperty('icon')) {
      return (iconDefinition as LabelIconDefinition).icon
    }

    return (iconDefinition as ComponentPublicInstance | string)
  })

  /**
   * The position an icon should be in, defaults to left.
   */
  const labelIconPosition: ComputedRef<LabelIconDefinition['position'] | null> = computed(() => {
    if (!iconDefinition) return null

    if (iconDefinition.hasOwnProperty('icon')) {
      return (iconDefinition as LabelIconDefinition).position
    }
    return 'left'
  })

  return {
    labelIcon,
    labelIconPosition
  }

}