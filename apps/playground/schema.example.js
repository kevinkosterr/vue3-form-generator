import { f } from '@/index.ts'

export default f.schema(
  {
    name: f.text('Name').label('Name').placeholder('Write name....').readonly(false).required(),
    surname: f.text('Surname').label('Surname').placeholder('Write surname....').required(),
    terms: f.checkbox('Terms').label('I accept terms and conditions')
  }
).toRef()