import { it, describe, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { f } from '@/builders'
import FormGenerator from '@/FormGenerator.vue'
import FormGeneratorFields from '@/fields'

describe('f', () => {

  it('Should render a form built with every builder', async () => {
    const { schema, model } = f.schema({
      name: f.text('name').label('Name'),
      password: f.password('password'),
      age: f.number('age').default(25),
      color: f.color('color'),
      bio: f.textarea('bio'),
      date: f.mask('date').mask('##-##-####').placeholder('dd-mm-yyyy'),
      accept: f.checkbox('accept'),
      active: f.switch('active'),
      tags: f.checklist('tags').option('A', 'a').option('B', 'b'),
      gender: f.radio('gender').option('Male', 'm').option('Female', 'f'),
      role: f.select('role').option('Admin', 'admin'),
      roles: f.selectNative('roles').option('Admin', 'admin').multiple(),
      address: f.object('address', { street: f.text('street') }),
      hello: f.button('hello').buttonText('Hello').onClick(() => {}),
      submit: f.submit('submit'),
      reset: f.reset('reset')
    }).group('Extra', {
      note: f.text('note')
    }).build()

    const wrapper = mount(FormGenerator, {
      props: { schema, model },
      global: { plugins: [ [ FormGeneratorFields, {} ] ] }
    })

    const components = [
      'FieldText', 'FieldPassword', 'FieldNumber', 'FieldColor', 'FieldTextarea', 'FieldMask', 'FieldCheckbox',
      'FieldSwitch', 'FieldChecklist', 'FieldRadio', 'FieldSelect', 'FieldSelectNative', 'FieldObject', 'FieldButton',
      'FieldSubmit', 'FieldReset'
    ]
    for (const name of components) {
      expect(wrapper.findComponent({ name }).exists(), `${name} should render`).toBe(true)
    }
    // Text fields: name, address.street and note (in group).
    expect(wrapper.findAllComponents({ name: 'FieldText' })).toHaveLength(3)
    expect(wrapper.find('legend').text()).toBe('Extra')

    expect(model).toStrictEqual({
      name: '', password: '', age: 25, color: '#000000', bio: '', date: '', accept: false, active: false,
      tags: [], gender: '', role: '', roles: [], address: { street: '' }, note: ''
    })
  })

})
