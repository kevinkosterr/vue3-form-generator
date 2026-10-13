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
import FieldSelectNativeExample from '/components/examples/fields/FieldSelectNativeExample.vue'
</script>

<FieldSelectNativeExample />

## Using the schema builder
See [Schema builder](/guide/introduction/schema-builder) for more information.
```typescript
f.schema({
  city: f.selectNative().label('Which city is cool?').options({ SF: 'San Francisco', AMS: 'Amsterdam' })
})
```

## Properties
::: details Shared properties
<!--@include: @/parts/shared-field-properties.md-->
:::

| Property | Default | Type       | Description                                  |
|----------|---------|------------|----------------------------------------------|
| options  | -       | `Option[]` | Selectable options                           |
