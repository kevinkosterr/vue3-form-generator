<template>
  <label :for="props.fieldId">
    <template v-if="props.labelIcon && props.labelIconPosition === 'left'">
      <i v-if="typeof props.labelIcon === 'string'" class="label-icon" :class="props.labelIcon" />
      <component :is="props.labelIcon" v-else class="label-icon" />
    </template>
    <span class="label-text">{{ props.label }}</span>
    <template v-if="props.labelIcon && props.labelIconPosition === 'right'">
      <i v-if="typeof props.labelIcon === 'string'" class="label-icon" :class="props.labelIcon" />
      <component :is="props.labelIcon" v-else class="label-icon" />
    </template>
  </label>
</template>

<script setup lang="ts">
import { ComponentPublicInstance } from 'vue'
import { LabelIconDefinition } from '@/resources/types/field/base'

const props = defineProps<{
  labelIcon: string | ComponentPublicInstance | null,
  labelIconPosition?: LabelIconDefinition['position'] | null,
  label?: string,
  fieldId: string
}>()
</script>