import { it, describe, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { f } from '@/builders'
import FormGenerator from '@/FormGenerator.vue'
import FormGeneratorFields from '@/fields'

describe('f', () => {

  it('Should render a form built with every builder', async () => {
    const { schema, model } = f.schema({
      name: f.text().label('Name'),
      password: f.password(),
      age: f.number().default(25),
      color: f.color(),
      bio: f.textarea(),
      date: f.mask().mask('##-##-####').placeholder('dd-mm-yyyy'),
      accept: f.checkbox(),
      active: f.switch(),
      tags: f.checklist().option('A', 'a').option('B', 'b'),
      gender: f.radio().options({ m: 'Male', f: 'Female' }),
      role: f.select().option('Admin', 'admin'),
      roles: f.selectNative().options([ 'admin' ]).multiple(),
      address: f.object({ street: f.text() }),
      hello: f.button().buttonText('Hello').onClick(() => {}),
      submit: f.submit(),
      reset: f.reset()
    }).group('Extra', {
      note: f.text()
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

  it('Should return the same builders from f.typed()', () => {
    const t = f.typed<{ name: string, age: number }>()
    const { model, schema } = t.schema({
      name: t.text().visible(model => model.age >= 18),
      age: t.number()
    }).build()
    expect(model).toStrictEqual({ name: '', age: 0 })
    expect(typeof schema.fields![0].visible).toBe('function')
  })

})
