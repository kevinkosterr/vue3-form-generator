export default {
  form: {
    model: {
      name: '',
      surname: '',
      terms: false,
    },
    schema: {
      fields: [
        {
          name: 'name',
          label: 'Name',
          type: 'text',
          model: 'name',
          placeholder: "Write name...",
          readonly: false,
          required: true,
        },
        {
          name: 'surname',
          label: 'Surname',
          type: 'text',
          model: 'surname',
          placeholder: "Write surname...",
          readonly: false,
          required: true,
        },
        {
          name: 'terms',
          label: 'Accept terms and conditions',
          type: 'checkbox',
          model: 'terms',
        }
      ]
    }
  }
}