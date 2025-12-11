import { f } from '@/index.ts'

export default f.schema(
  {
    name: '',
    surname: '',
    terms: false
  },
  f.text('Name', 'name').label('Name').placeholder('Write name....').readonly(false).required(),
  f.text('Surname', 'surname').label('Surname').placeholder('Write surname....').required(),
  f.checkbox('Terms', 'terms').label('I accept terms and conditions')
).toRef()