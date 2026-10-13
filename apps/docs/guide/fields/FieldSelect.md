# FieldSelect
`FieldSelect` is a fully custom select field

### type `select`

## Basic example
::: details Code
```javascript
{
  name: 'cityExample',
  label: 'Which city is cool?', 
  model: 'city', 
  type: 'select', 
  options: [
    { name: 'San Francisco', value: 'SF' },
    { name: 'Amsterdam', value: 'AMS' },
    { name: 'New York', value: 'NYC' },
  ]
}
```
:::
<script setup>
import FieldSelectExample from '/components/examples/fields/FieldSelectExample.vue'
</script>

<FieldSelectExample />

## Multiple values
To allow for multiple values to be selected, simply add `multiple: true` to your field schema object.
::: details Code
```javascript
{
  name: 'cityExample',
  label: 'Which city is cool?', 
  model: 'city', 
  type: 'select',
  multiple: true, // [!code focus]
  options: [
    { name: 'San Francisco', value: 'SF' },
    { name: 'Amsterdam', value: 'AMS' },
    { name: 'New York', value: 'NYC' },
  ]
}
```
:::
<FieldSelectExample multiple />

::: info TIP 
You can hold CTRL key (or COMMAND key on Mac) when selecting a value to prevent the options dropdown from closing
:::

## Using the schema builder
See [Schema builder](/guide/introduction/schema-builder) for more information.
```typescript
f.schema({
  city: f.select().label('Which city is cool?').options({ SF: 'San Francisco', AMS: 'Amsterdam', NYC: 'New York' })
  // Add .multiple() to allow multiple values
})
```

## Properties
::: details Shared properties
<!--@include: @/parts/shared-field-properties.md-->
:::

| Property | Default | Type       | Description                                  |
|----------|---------|------------|----------------------------------------------|
| multiple | `false`   | `boolean`  | Determine if user can select multiple values |
| options  | -       | `Option[]` | Selectable options                           |
