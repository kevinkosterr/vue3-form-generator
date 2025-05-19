These are events emitted by the `vue-form-generator` component.

## `field-validated`
Emitted when a field inside the form has been validated.

### Event arguments
- `validations` - an object with the field's errors and the field schema
  - `fieldErrors` - an array of error messages that have been thrown during validations;
  - `field` - the field as defined in the schema

An example from the [`FieldObject`](/guide/fields/FieldObject) component:
```vue [FieldObject.vue]
<script setup>
  const onFieldValidated = (validation) => {
    const key = `${field.value.model}.${validation.field.model}`
    emits(
        'validated',
        validation.fieldErrors.length === 0,
        validation.fieldErrors,
        { ...field.value, model: key }
    )
  }
</script>
```

## `submit`
Emitted when all fields have been validated and no errors occurred during said validations.
