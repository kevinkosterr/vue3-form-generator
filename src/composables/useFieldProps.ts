export function useFieldProps () {

  return {
    id: String,
    formOptions: Object,
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