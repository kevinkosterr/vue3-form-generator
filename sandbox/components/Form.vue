<script>
import FormGenerator from "@/FormGenerator.vue";

export default {
 name: 'Form',
 components: {FormGenerator},
 data () {
   return {
     form: {
       schema: {
         fields: [
           {
             name: 'name',
             label: 'Name',
             type: 'text',
             model: 'name',
             placeholder: "Write name...",
             readonly: false,
             required: true,
           },
           {
             name: 'surname',
             label: 'Surname',
             type: 'text',
             model: 'surname',
             placeholder: "Write surname...",
             readonly: false,
             required: true,
           }
         ]
       }
     }
   }
 },
}
</script>

<template>
  <FormGenerator :schema="form.schema"/>
</template>
