<script setup>
import Form from "./components/Form.vue";
</script>

<template>
  <div id="main-container" class="container">
    <div class="title-wrapper d-flex justify-content-center flex-wrap">
      <h1 id="main-title" class="text-center fw-bolder">Vue3 Form Generator Sandbox</h1>
      <h5 class="w-100 text-center fw-bold">A playground to test out the form generator</h5>
    </div>
    <div class="card mt-4">
        <div class="card-side">
          <h4 class="w-100 text-center fw-bold">Form</h4>
          <Form/>
        </div>
        <div class="card-side">
          <h4 class="w-100 text-center fw-bold">Data</h4>
        </div>
    </div>
  </div>
</template>
