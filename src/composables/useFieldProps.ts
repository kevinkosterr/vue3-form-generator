export function useFieldProps () {

  return {
    id: String,
    formGenerator: Object,
    field: {
      type: Object,
      required: true
    },
    model: {
      type: Object,
      required: true
    }
  }

}