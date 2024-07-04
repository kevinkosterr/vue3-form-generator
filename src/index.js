import FormGenerator from "@/FormGenerator.vue";
import FormGeneratorFields from "@/fields"

const VueFormGenerator = {
  install (app, options) {
    if (!options) options = {}

    app.use(FormGeneratorFields)
    app.component('VueFormGenerator', FormGenerator)
  }
}

export default VueFormGenerator;
