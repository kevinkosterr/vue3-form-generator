// Copy this file to schema.js to use it in the playground.
import { f } from '@/index.ts'

export default f.schema({
  name: f.text().label('Name').placeholder('Enter your name').required(),
  password: f.password().label('Password').min(8).indicator(),
  age: f.number().label('Age').min(0).max(120).default(25),
  color: f.color().label('Favorite color').withInput(),
  bio: f.textarea().label('Bio').maxLength(200).resizable(),
  date: f.mask().label('Date').mask('##-##-####').placeholder('dd-mm-yyyy'),
  accept: f.checkbox().label('I accept the terms'),
  active: f.switch().label('Active'),
  roles: f.checklist().label('Roles').options({ admin: 'Administrator', user: 'User' }),
  gender: f.radio().label('Gender').options({ m: 'Male', f: 'Female' }),
  city: f.select().label('City').options({ AMS: 'Amsterdam', NYC: 'New York' }),
  cities: f.selectNative().label('Cities').options({ AMS: 'Amsterdam', NYC: 'New York' }).multiple(),
  address: f.object({
    street: f.text().label('Street'),
    city: f.text().label('City')
  }).label('Address'),
  hello: f.button().buttonText('Log model').onClick(model => console.log(model)),
  submit: f.submit(),
  reset: f.reset()
}).group('Extra', {
  newsletter: f.checkbox().label('Subscribe to the newsletter').visible(model => model.accept)
}).build()
