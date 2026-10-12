# FieldText
FieldText is an input field of type `text`

### type `input`
### inputType `text`

<script setup>
import FieldTextExample from '/components/examples/fields/FieldTextExample.vue'
</script>

## Basic example
::: details Code
```javascript
{
  name: 'inputExample',
  label: 'Name',
  model: 'name',
  type: 'input',
  inputType: 'text'
}
```
:::
<FieldTextExample />

## Using the schema builder
See [Schema builder](/guide/introduction/schema-builder) for more information.
```typescript
f.schema({
  username: f.text().label('Username').placeholder('Enter your username').autoComplete()
})
```

## Properties
::: details Shared properties
<!--@include: @/parts/shared-field-properties.md-->
:::
