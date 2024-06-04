<script setup>
const props = defineProps({
  field: Object,
});
</script>

<template>
  <input type="text" :name="props.field.name" :required="props.field.required" :placeholder="props.field.placeholder"
         :autocomplete="props.field.autocomplete"/>
</template>