# FieldPassword
FieldPassword is a password field that renders an input element of type `password`

### type `input`
### inputType `password`

<script setup>
import FieldPasswordExample from '/components/FieldPasswordExample.vue'
</script>

## Basic example
::: details Code
```javascript
{
  name: 'passwordExample', 
  model: 'password',
  type: 'input',
  inputType: 'password'
}
```
:::
<FieldPasswordExample />

## Strength indicator
You can show a strength indicator by setting `indicator: true`. The strength indication is taken from
[PrimeVue's Password component](https://github.com/primefaces/primevue/blob/master/packages/primevue/src/password/Password.vue) 
::: details Code
```javascript
{
  name: 'passwordExample', 
  model: 'password',
  type: 'input',
  indicator: true, // [!code focus]
  inputType: 'password'
}
```
:::
<FieldPasswordExample has-indicator />

## Properties
::: details Shared properties
<!--@include: @/parts/shared-field-properties.md-->
:::

| Property  | Default | Type       | Description              |
|-----------|---------|------------|--------------------------|
| indicator | `false`   | `boolean`  | Show strength indication |