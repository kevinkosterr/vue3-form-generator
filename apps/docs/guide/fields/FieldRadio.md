# FieldRadio

### type `input`
### inputType `radio`

<script setup>
import FieldRadioExample from '/components/FieldRadioExample.vue'
</script>

## Basic example
::: details Code
```javascript
{
  name: 'radioExample',
  type: 'input',
  inputType: 'radio',
  label: 'Select an option',
  options: [
    { name: 'Example 1', value: 'ex_1' },
    { name: 'Example 2', value: 'ex_2' },
    { name: 'Example 3', value: 'ex_3' }
  ]
}
```
:::
<FieldRadioExample />

## Properties
::: details Shared properties
<!--@include: @/parts/shared-field-properties.md-->
:::

| Property | Default | Type       | Description                                  |
|----------|---------|------------|----------------------------------------------|
| options  | -       | `Option[]` | Selectable options                           |

