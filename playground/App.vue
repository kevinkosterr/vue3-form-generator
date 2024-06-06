<script>
import FormGenerator from "@/FormGenerator.vue";
import schema from './schema.js'

export default {
  name: 'App',
  components: {FormGenerator},
  data () {
    return {
        ...schema
    }
  }
}
</script>

<template>
  <div id="main-container" class="container">
    <div class="title-wrapper d-flex justify-content-center flex-wrap mt-4">
      <h1 id="main-title" class="text-center fw-bolder">Vue3 Form Generator</h1>
      <p class="w-100 text-center text-uppercase" style="font-weight: 900">A form generator playground</p>
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
