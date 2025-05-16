<template>
  permissions: <code>{{ form.model.permissions }}</code>
  <vue-form-generator :schema="form.schema" :model="form.model" />
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  model: {
    permissions: []
  },
  schema: {
    fields: [
      {
        name: 'activePermissions',
        label: 'Active permissions',
        model: 'permissions',
        type: 'checklist',
        options: [
          { name: 'Manage warehouse', value: 'manageWarehouse' },
          { name: 'Create orders', value: 'createOrders' },
          { name: 'Manage orders', value: 'manageOrders' }
        ]
      }
    ]
  }
})
</script>