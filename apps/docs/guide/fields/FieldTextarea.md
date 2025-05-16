# FieldTextarea

### type `textarea`

<script setup>
import FieldTextAreaExample from '/components/FieldTextareaExample.vue'
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

## Properties
::: details Shared properties
<!--@include: @/parts/shared-field-properties.md-->
:::

| Property  | Default | Type       | Description                       |
|-----------|---------|------------|-----------------------------------|
| resizable | `false`   | `boolean`  | Whether the textarea is resizable |
