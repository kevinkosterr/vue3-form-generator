import FormGenerator from "@/FormGenerator.vue";
import { setFieldComponent } from "@/helpers/fieldComponents.js";

const VueFormGenerator = {
  install (app, options) {
    app.component('VueFormGenerator', FormGenerator)

    for (const component of options.components) {
      setFieldComponent(component.type, component.component);
    }
  }
}

export default VueFormGenerator;
