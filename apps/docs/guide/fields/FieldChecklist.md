# FieldChecklist
> `FieldChecklist` is a field composed of multiple checkboxes where each checkbox has their own label and value

### type `checklist`

<script setup>
import FieldChecklistExample from '/components/examples/fields/FieldChecklistExample.vue'
</script>

## Basic example
::: details Code
```js
{
    name: 'activePermissions',
    label: 'Active permissions',
    model: 'permissions',
    type: 'checklist',
    options: [
        { name: 'Manage warehouse', value: 'manageWarehouse' },
        { name: 'Create orders', value: 'createOrders' },
        { name: 'Manage orders', value: 'manageOrders' }
    ]
}
```
:::
<FieldChecklistExample />

## Properties
::: details Shared properties
<!--@include: @/parts/shared-field-properties.md-->
:::
| Property | Default | Type       | Description        |
|----------|---------|------------|--------------------|
| options  | `[]`    | `Option[]` | Selectable options |