---
outline: [2,3]
---
# abstractField <Badge type="warning" text="deprecated"/> <Badge type="tip" text="<2.0.0"/>
The `abstractField` mixin is used as a base for every field component. An thus is recommended to use when 
[building custom components](/guide/customization/custom-components#options-api-mixin). This guide aims to give an insight to the internal
workings of the mixin. As with every mixin, any method or computation can easily be overridden or extended inside any component.

::: details Overriding a method or computed property
```vue {7-10,13-16}
<script>
  import { abstractField } from "@kevinkosterr/vue3-form-generator";

  export default {
    mixins: [ abstractField ],
    methods: { 
      onBlur () {
        console.log('I have been blurred...')
        abstractField.methods.onBlur.call(this)
      }
    },
    computed: {
        formFieldId () {
          const id = abstractField.computed.formFieldId.call(this)
          return 'tested' + id
        }
    }
  }
</script>
```
:::

## Methods

### `determineDynamicAttribute`
Helper function used in computed properties to determine the value a field's attribute must be. Whenever a method 
is passed inside the schema the property will be determined by calling that method like so:
```javascript
this.field[attribute].call(this, this.model, this.field, this)
```
::: details Values
- `attribute`: the attribute/property to compute the value for
- `this.model`: the current model in the form schema
- `this.field`: the current field
- `this`: the current field component
:::

##### Returns
`string|boolean` - HTML attribute, like `required`, `disabled` or other field attribute such as `hint`.

##### Arguments
| Argument       | Default | Required | Description                                            |
|----------------|---------|----------|--------------------------------------------------------|
| `attribute`    | -       | `true`   | attribute to determine its value for                   |
| `defaultValue` | `false` | `false`   | default value if attribute is irrelevant to this field |
<hr>


### `formatFieldValue`
Formats the field's current value to one that should be in the form generator model.

##### Returns
`any` - a formatted version of the field's value, to be passed on to the model.

##### Arguments
| Argument       | Default | Required | Description   |
|----------------|---------|----------|---------------|
| `target` | -       | `true`    |  Event target |

<hr>

### `onFieldValueChanged`
Used as a handler for HTML input element events.

##### Returns
_This method doesn't return any value_

##### Arguments
| Argument | Default | Required | Description                                 |
|---------|---------|---------|---------------------------------------------|
| `event` | -       | `true`   | The event emitted by the HTML input element |

##### Emits
| Event     | Args                  |
|-----------|-----------------------|
| `onInput` | `formattedFieldValue` |

<hr>

### `onBlur`
Handles the `@blur` event. Calls the [`validate`](#validate) method by default for a "validate on blur" behaviour.

<hr>

### `validate`
Validates the field's value based on validators specified in its schema.

##### Returns
`Array<string>` - an array of error messages, if there are any.

##### Emits
| Event       | Args                         |
|-------------|------------------------------|
| `validated` | `isValid`, `errors`, `field` |

## Computed

### `currentModelValue`
Current value that is present in the model.
##### Returns
`any`, determined by the initial value in the model.

<hr>

### `defaultValidators`
Validators that should be present by default, based on the field's conditions.
##### Returns
`Array<function>` - array of validator functions

<hr>

### `formFieldId`
HTML `id` attribute to give the field.

##### Returns
`string` - id attribute string

<hr>

### `hint`
Hint to display underneath the field, uses [`determineDynamicAttribute`](#determinedynamicattribute).

#### Returns
`string` - hint to display

<hr>

### `isVisible`
Determine if field should be visible or not, uses [`determineDynamicAttribute`](#determinedynamicattribute).

##### Returns
`boolean`

<hr>

### `isDisabled`
Determine if field is disabled or not, uses [`determineDynamicAttribute`](#determinedynamicattribute).

##### Returns
`boolean`

<hr>

### `isReadOnly`
Determine if the field is read only or not, uses [`determineDynamicAttribute`](#determinedynamicattribute).

##### Returns
`boolean`

<hr>

### `isRequired`
Determine whether the field is required, uses [`determineDynamicAttribute`](#determinedynamicattribute).

##### Returns
`boolean`

## Events

### `onInput`
Emitted when the value of the field component has been changed.

This event is emitted like this internally:
```javascript
this.$emit('onInput', this.formatFieldValue(target))
```

<hr>

### `validated`
Emitted when the field component has been validated.

This event is emitted like this internally:
```javascript
this.$emit('validated', isValid, this.errors, this.field)
```
The event passes the following arguments:
- `isValid` - is `true` when field is valid, `false` if invalid.
- `this.errors` - Array of errors found during the validation of this field, empty if field is valid.
- `this.field` - the field object as specified in the form schema.
