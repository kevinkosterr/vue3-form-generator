# FieldSubmit
FieldSubmit is a field that renders an input of type `submit`.

### type `submit`

<script setup>
import FieldSubmitExample from '/components/examples/fields/FieldSubmitExample.vue'
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

## Using the schema builder
See [Schema builder](/guide/introduction/schema-builder) for more information.
```typescript
f.schema({
  submit: f.submit().buttonText('Send')
})
```

## Properties
| Property      | Default | Type     | Description                   |
|---------------|---------|----------|-------------------------------|
| buttonText    | `Reset` | `String` | Text to show in the button    |
| buttonClasses | ``      | `String` | Classes to pass to the button |