---
outline: [2,3]
---
# FormLabel <Badge type="tip" text=">=2.7.0"/>
> A label component that automatically handles the labelIcon property and position.

## Usage
:::code-group
```vue [template]
<template>
  <FormLabel 
      :label-icon="labelIcon" 
      :label-icon-position="labelIconPosition" 
      :label="field.label" 
      :field-id="props.id"
  />
</template>
```
```vue [script setup]
<script setup>
import { toRefs } from 'vue'
import { FormLabel, useLabelIcon, useFieldProps } from '@kevinkosterr/vue3-form-generator'

const props = defineProps(useFieldProps())

const { field, model } = toRefs(props)
const { labelIcon, labelIconPosition } = useLabelIcon(field.value.labelIcon)
</script>
```
:::

## Props
### `labelIcon` <Badge type="info" text="string | ComponentPublicInstance | null" />
Either a string webfont class, a component or `LabelIconDefinition`.

### `labelIconPosition` <Badge type="info" text="'left' | 'right' | null" />
Either `'left'`, `'right'` or `null`

### `label` <Badge type="info" text="string" />
Label as set by the field schema.

### `fieldId` <Badge type="info" text="string" />
Computed field id, taken from props.
