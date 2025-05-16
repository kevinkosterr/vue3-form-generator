---
outline: [2,3]
---
# useFormModel <Badge type="tip" text="2.0.0+"/>
> Used to access a field's model value 

## Usage
```vue
<script setup>
import { toRefs } from 'vue'
import { useFormModel, useFieldProps } from '@kevinkosterr/vue3-form-generator'

const props = defineProps(useFieldProps())

const { field, model } = toRefs(props)
  
const { currentModelValue } = useFormModel(model.value, field.value)
</script>
```

## Returns

### `currentModelValue` <Badge type="info" text="any"/>
A computed property that holds the current value for this field, stored in the form model.