---
outline: [2,3]
---
# useFieldValidate <Badge type="tip" text="2.0.0+"/> <Badge type="warning" text="deprecated"/>
> Used to validate a field against validators defined in a field's schema
::: warning
This composable is deprecated, please use [`useValidation`](/guide/composables/useValidation) instead
:::

## Usage
```vue
<script setup>
import { toRefs } from 'vue'
import { useFieldValidate, useFieldProps } from '@kevinkosterr/vue3-form-generator'

const props = defineProps(useFieldProps())

const { field, model } = toRefs(props)
  
const { validate } = useFieldValidate(model.value, field.value)
</script>
```

## Arguments

### `model` <Badge type="info" text="Object"/>
Model object, as returned by the props

### `field` <Badge type="info" text="Object"/>
Field schema object, as returned by the props

## Returns

### `validate` <Badge type="info" text="Function"/>
> Validates the field, existing fields typically use this in an `onBlur()`
- Arguments: 
  - `currentModelValue: any` - the current value of the field.
- Returns: `Promise<string[]>` - an array of error messages, or empty array if no errors have been found.
```javascript
validate(currentModelValue.value).then((validationErrors) => {
  //... 
}) 
```

### `errors` <Badge type="info" text="string[]" />
> An array of errors that have been found when validating the current value against all validators
 
::: warning
If you want your component to work properly with validation, you'll have to expose this value.
:::
