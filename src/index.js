import FormGenerator from "@/FormGenerator.vue";
import FieldsCore from "@/fields/core"

const VueFormGenerator = {
  install (app, options) {
    if (!options) options = {}

    app.use(FieldsCore)
    app.component('VueFormGenerator', FormGenerator)
  }
}

export default VueFormGenerator;
