# FieldSubmit
FieldSubmit is a field that renders an input of type `submit`.

### type `submit`

<script setup>
import FieldSubmitExample from '/components/FieldSubmitExample.vue'
</script>

## Basic example
::: details Code
```javascript
{
  type: 'submit',
  buttonText: 'Submitting!'
}
```
:::
<FieldSubmitExample />

## Properties
| Property      | Default | Type     | Description                   |
|---------------|---------|----------|-------------------------------|
| buttonText    | `Reset` | `String` | Text to show in the button    |
| buttonClasses | ``      | `String` | Classes to pass to the button |