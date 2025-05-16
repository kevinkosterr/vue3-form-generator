# FieldMask
FieldMask is a field that renders an input element that forces its value to be of a certain format.

### type `mask`
### inputType `text | search | URL | password | tel `

FieldMask depends on an external library called [`maska`](https://beholdr.github.io/maska/v3/#/). This means it has the
same features (and limitations) `maska` has. 

## Masked example
The value inside the model will reflect the masked value by default.

<script setup>
import FieldMaskExample from '/components/FieldMaskExample.vue'
</script>

::: details Code
```js
{
    name: 'creditCardExample',
    label: 'Credit card',
    model: 'creditCard',
    type: 'mask',
    mask: '#### #### #### ####',
    maskOptions: {
      eager: true
    }
}
```
:::
<FieldMaskExample/>

## Unmasked example
By passing `unmasked: true` to the `maskOptions` inside the field, the model value will reflect the raw value instead
of the masked value.

::: details Code
```js
{
    name: 'creditCardExample',
    label: 'Credit card',
    model: 'creditCard',
    type: 'mask',
    mask: '#### #### #### ####',
    maskOptions: {
      eager: true,
      unmasked: true // [!code focus]
    }
}
```
:::
<FieldMaskExample unmasked/>

## Masks, other options and validators
::: warning
Please keep in mind that the model value will be used inside validators. This means if you use the `unmasked` option, the
value that will be validated is unmasked and vice versa.
:::
For more information on masks and options, please refer to [maska's documentation](https://beholdr.github.io/maska/v3/#/).
