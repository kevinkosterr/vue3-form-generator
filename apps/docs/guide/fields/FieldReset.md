# FieldReset
FieldReset is a field that renders an input of type `reset`. 

### type `reset`

<script setup>
import FieldResetExample from '/components/FieldResetExample.vue'
</script>

## Basic example
::: details Code
```javascript
{
  type: 'reset',
  buttonText: 'Be gone'
}
```
:::
<FieldResetExample />

## In action
<FieldResetExample in-action />



## Properties
| Property      | Default | Type     | Description                   |
|---------------|---------|----------|-------------------------------|
| buttonText    | `Reset` | `String` | Text to show in the button    |
| buttonClasses | ``      | `String` | Classes to pass to the button |