# FieldCheckbox
FieldCheckbox is a checkbox field that renders an input element of type `checkbox`

### type `input`
### inputType `checkbox`

## Basic example
<script setup>
import FieldCheckboxExample from '/components/examples/fields/FieldCheckboxExample.vue'
</script>

<FieldCheckboxExample />

## Using the schema builder
See [Schema builder](/guide/introduction/schema-builder) for more information.
```typescript
f.schema({
  accept: f.checkbox().label('I accept the terms')
})
```

## Properties
<!--@include: @/parts/shared-field-properties.md-->
