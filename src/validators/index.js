import { isNotEmpty } from "@/helpers/index.js";

export default {

  required (value, field, model, fieldComponent) {
    return !!(fieldComponent.isRequired && isNotEmpty(value));
  },

  string (value, _field, _model, _fieldComponent) {
    return typeof value === "string";
  },


}
