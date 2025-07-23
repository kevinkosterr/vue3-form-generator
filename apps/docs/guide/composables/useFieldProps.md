---
outline: [2,3]
---
# useFieldProps <Badge type="tip" text="2.0.0+" />
> Returns the props used by all field components

## Usage
```vue
<script setup>
import { toRefs } from 'vue'
import { useFieldProps } from '@kevinkosterr/vue3-form-generator'
  
const props = defineProps(useFieldProps())
  
const { field, model } = toRefs(props)
</script>
```

## TypeScript alternative
```vue
<script setup lang="ts">
import { toRefs } from 'vue'
import type { FieldProps, FieldBase, FieldPropRefs } from '@kevinkosterr/vue3-form-generator'

type CustomField = FieldBase & {}

const props = defineProps<FieldProps<CustomField>>()
  
const { field, model }: FieldPropRefs<CustomField> = toRefs(props)
</script>
```

## Props

### `id` <Badge type="info" text="String"/>
Id of the field, computed based on the `idPrefix` set within the FormGenerator component and `name` property of the 
field. 

### `formOptions` <Badge type="info" text="Object"/>
An object of global options for the current form.

### `field` <Badge type="info" text="Object"/> <Badge type="danger" text="required"/>
Field object as set in the schema.

### `model` <Badge type="info" text="Object"/> <Badge type="danger" text="required"/>
Model object as set in the schema, contains all current values.