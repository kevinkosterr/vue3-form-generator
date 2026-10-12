# FieldSwitch

### type `switch`

<script setup>
import FieldSwitchExample from '/components/examples/fields/FieldSwitchExample.vue'
</script>

## Basic example
::: details Code 
```javascript
{
    name: 'switchExample',
    label: 'Enable test?',
    model: 'switchModel',
    type: 'switch'
}
```
:::
<FieldSwitchExample />

## Programmatic toggle
::: details Code
```javascript
{
  model: {
    switchModel: false
  },
  schema: {
    fields: [
      {
        name: 'switchExample',
        label: 'Enable test?',
        model: 'switchModel',
        type: 'switch'
      },
      {
        type: 'button',
        buttonText: 'Toggle switch',
        onClick: (model) => {
          model.switchModel = !model.switchModel
        }
      }
    ]
  }
}
```
:::
<FieldSwitchExample include-button/>

## Using the schema builder
See [Schema builder](/guide/introduction/schema-builder) for more information.
```typescript
f.schema({
  active: f.switch().label('Active')
})
```

## Properties
::: details Shared properties
<!--@include: @/parts/shared-field-properties.md-->
:::
