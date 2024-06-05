<script>
import FormGenerator from "@/FormGenerator.vue";

export default {
  name: 'App',
  components: {FormGenerator},
  data () {
    return {
      formData: null,
      form: {
        model: {
          name: '',
          surname: '',
          terms: false,
        },
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
            },
            {
              name: 'terms',
              label: 'Accept terms and conditions',
              type: 'checkbox',
              model: 'terms',
            }
          ]
        }
      }
    }
  }
}
</script>

<template>
  <div id="main-container" class="container">
    <div class="title-wrapper d-flex justify-content-center flex-wrap">
      <h1 id="main-title" class="text-center fw-bolder">Vue3 Form Generator Sandbox</h1>
      <h5 class="w-100 text-center fw-bold">A playground to test out the form generator</h5>
    </div>
    <div class="card mt-4">
        <div class="card-side">
          <FormGenerator :schema="form.schema" :model="form.model"/>
        </div>
        <div class="card-side">
          <JsonViewer :value="form.model" copyable boxed sort theme="jv-dark"/>
        </div>
    </div>
  </div>
</template>
