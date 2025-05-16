# FieldSelectNative
`FieldSelectNative` is a select field that renders a native HTML `select` element.

### type `selectNative`

## Basic example
::: details Code
```javascript
{
  name: 'cityExample',
  label: 'Which city is cool?', 
  model: 'city', 
  type: 'selectNative', 
  options: [
    { name: 'San Francisco', value: 'SF' },
    { name: 'Amsterdam', value: 'AMS' },
    { name: 'New York', value: 'NYC' },
  ]
}
```
:::
<script setup>
import FieldSelectNativeExample from '/components/FieldSelectNativeExample.vue'
</script>

<FieldSelectNativeExample />

## Properties
::: details Shared properties
<!--@include: @/parts/shared-field-properties.md-->
:::

| Property | Default | Type       | Description                                  |
|----------|---------|------------|----------------------------------------------|
| options  | -       | `Option[]` | Selectable options                           |
