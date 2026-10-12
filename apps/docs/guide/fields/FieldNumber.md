# FieldNumber
FieldNumber is a number field that renders an input element of type `number`

### type `input`
### inputType `number`

## Basic example
<script setup>
import FieldNumberExample from '/components/examples/fields/FieldNumberExample.vue'
</script>

<FieldNumberExample/>

## Using the schema builder
See [Schema builder](/guide/introduction/schema-builder) for more information.
```typescript
f.schema({
  age: f.number().label('Age').min(0).max(120).step(1).placeholder('Your age')
})
```

## Properties
::: details Shared properties
<!--@include: @/parts/shared-field-properties.md-->
:::

| Property | Default     | Type     | Description                                                   |
|----------|-------------|----------|---------------------------------------------------------------|
| step     | `1`         | `Number` | Amount to increase or decrease the number by (using controls) |
| min      | `undefined` | `Number` | Minimum amount this number should be                          |
| max      | `undefined` | `Number` | Maximum amount this number should be                          |