import { mount } from '@vue/test-utils'

import FormGenerator from '@/FormGenerator.vue'

export function mountFormGenerator (schema, model) {
  return mount(FormGenerator, { props: { schema, model } })
}
