---
outline: [2,3]
---
# useValidation <Badge type="tip" text=">=2.7.0"/>
> Used to validate a field against validators defined in a field's schema

## Usage
::: code-group
```Vue [Vue]
<script setup>
import { toRefs } from 'vue'
import { 
  useValidation, 
  useFieldProps,
  useFormModel,
  useFieldEmits,
  useFieldAttributes
} from '@kevinkosterr/vue3-form-generator'

const props = defineProps(useFieldProps())
const emits = defineEmits(useFieldEmits())

const { field, model } = toRefs(props)
const { isRequired, isDisabled, isReadonly } = useFieldAttributes(model.value, field.value)
const { currentModelValue } = useFormModel(model.value, field.value)
  
const { validate, errors, onChanged, onBlur } = useValidation(
    model.value,
    field.value,
    currentModelValue,
    props.formOptions,
    emits,
    isDisabled.value,
    isRequired.value,
    isReadonly.value
)
</script>
```
```Vue [Vue TS]
<script setup lang="ts">
import { toRefs } from 'vue'
import { 
  type FieldEmits, 
  type FieldProps, 
  type FieldBase,
  type FieldPropRefs,
  useValidation,
  useFieldAttributes,
  useFormModel
} from '@kevinkosterr/vue3-form-generator'

type CustomField = FieldBase & {
  customAttr: string
}

const props = defineProps<FieldProps<CustomField>>()
const emits = defineEmits<FieldEmits>()
  
const { field, model }: FieldPropRefs<CustomField> = toRefs(props)
const { isRequired, isDisabled, isReadonly } = useFieldAttributes(model.value, field.value)
const { currentModelValue } = useFormModel(model.value, field.value)

const { validate, errors, onChanged, onBlur } = useValidation(
    model.value,
    field.value,
    currentModelValue,
    props.formOptions,
    emits,
    isDisabled.value,
    isRequired.value,
    isReadonly.value
)
</script>
```
:::

## Arguments

### `model` <Badge type="info" text="Object"/>
Model object, as returned by the props

### `field` <Badge type="info" text="Object"/>
Field schema object, as returned by the props

### `currentModelValue` <Badge type="info" text="Ref<any>"/>
`Ref` of the current value from the field. Returned by [`useFormModel`](/guide/composables/useFormModel).

### `formOptions` <Badge type="info" text="Object"/>
Form options object, as returned by the props.

### `emits` <Badge type="info" text="EmitFn<FieldEmits>"/>
Emit function as returned by `defineEmits()`

### `isDisabled` <Badge type="info" text="Boolean"/>
Whether the field is disabled, can be obtained from [`useFieldAttributes()`](/guide/composables/useFieldAttributes)

### `isRequired` <Badge type="info" text="Boolean"/>
Whether the field is required, can be obtained from [`useFieldAttributes()`](/guide/composables/useFieldAttributes)

### `isReadonly` <Badge type="info" text="Boolean"/>
Whether the field is readonly, can be obtained from [`useFieldAttributes()`](/guide/composables/useFieldAttributes)

## Returns

### `errors` <Badge type="info" text="string[]"/>
An array of errors for the current field. Will be auto-updated on every validation cycle. Must be cleared
manually when the value of a field has changed.

### `validate` <Badge type="info" text="Function"/>
A validation function, meant to be called when a validation has to take place. Used when a field is always validated
at the same moment and isn't affected by validation triggers, such as `'onChanged'` or `'onBlur'`.

### `onChanged` <Badge type="info" text="Function"/>
A wrapped validation function, only validates when `'onChanged'` validation is enabled. Should always be called if the value is changed, unless the field is unaffected by
validation triggers.

### `onBlur` <Badge type="info" text="Function"/>
A wrapped validation function, only validates when `'onBlur'` validation is enabled (which is the default behavior). Should always be called if the value is changed, unless the field is unaffected by
validation triggers.
