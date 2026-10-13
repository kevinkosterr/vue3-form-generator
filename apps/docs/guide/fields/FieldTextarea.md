# FieldTextarea

### type `textarea`

<script setup>
import FieldTextAreaExample from '/components/examples/fields/FieldTextareaExample.vue'
</script>

## Basic example
::: details Code
```javascript
{
  name: 'textAreaExample',
  label: 'Description',
  model: 'description',
  type: 'textarea'
}
```
:::
<FieldTextAreaExample />

## Resizable
To make your textarea fields resizable, simply add `resizable: true` to the field schema object. 
::: details Code
```javascript
{
  name: 'textAreaExample',
  label: 'Description',
  model: 'description',
  type: 'textarea',
  resizable: true
}
```
:::
<FieldTextAreaExample resizable/>

## Using the schema builder
See [Schema builder](/guide/introduction/schema-builder) for more information.
```typescript
f.schema({
  bio: f.textarea().label('Bio').maxLength(200).resizable()
})
```

## Properties
::: details Shared properties
<!--@include: @/parts/shared-field-properties.md-->
:::

| Property  | Default | Type       | Description                       |
|-----------|---------|------------|-----------------------------------|
| resizable | `false`   | `boolean`  | Whether the textarea is resizable |
