import { generatePropsSingleField, mountFormGenerator } from '@test/_resources/utils.js'
import { expect, it, describe, beforeAll } from 'vitest'
import { config, mount } from '@vue/test-utils'

import FieldObject from '@/fields/core/FieldObject.vue'
import FieldNumber from '@/fields/core/FieldNumber.vue'
import FieldText from '@/fields/core/FieldText.vue'
import FormGenerator from '@/FormGenerator.vue'

beforeAll(() => {
  config.global.components = { FieldObject, FieldNumber, FieldText }
})

const shouldBeOverEighteen = (value) => value && value >= 18

const form = {
  model: {
    person: {
      name: '',
      age: null
    }
  },
  schema: {
    fields: [
      {
        type: 'object',
        model: 'person',
        schema: {
          fields: [
            {
              type: 'text',
              name: 'name',
              model: 'name',
              label: 'Full name'
            },
            {
              type: 'number',
              name: 'age',
              model: 'age',
              label: 'Age',
              validator: [ shouldBeOverEighteen ]
            }
          ]
        }
      }
    ]
  }
}

const props = generatePropsSingleField(form)

describe('FieldObject', () => {

  // For rendering, we'll only need to test if the components are actually present within the Field or FormGenerator.
  // This is because each Field will have their own individual tests for checking if it renders correctly.
  it('Should render properly', async () => {
    const wrapper = mount(FieldObject, { props })
    // Since the FieldObject basically renders a form inside the form, this component should be there
    expect(wrapper.findComponent(FormGenerator)).toBeTruthy()
    expect(wrapper.findComponent(FieldNumber)).toBeTruthy()
    expect(wrapper.findComponent(FieldText)).toBeTruthy()
  })

  it('Should render properly inside form generator', async () => {
    const wrapper = mountFormGenerator(form.schema, form.model)
    // Since the FieldObject basically renders a form inside the form, this component should be there
    expect(wrapper.findComponent(FormGenerator)).toBeTruthy()
    expect(wrapper.findComponent(FieldNumber)).toBeTruthy()
    expect(wrapper.findComponent(FieldText)).toBeTruthy()
  })

  it('Should properly update model value', async () => {
    const wrapper = mountFormGenerator(form.schema, form.model)
    expect(typeof wrapper.vm.model.person).toBe('object')

    const fieldWrapper = wrapper.findComponent(FieldObject)
    fieldWrapper.find('input[type=number]').setValue(21)
    // Both values should match.
    expect(fieldWrapper.vm.model.person.age).toBe(21)
    expect(wrapper.vm.model.person.age).toBe(21)

    fieldWrapper.find('input[type=text]').setValue('Test subject')
    // Both values should match.
    expect(fieldWrapper.vm.model.person.name).toBe('Test subject')
    expect(wrapper.vm.model.person.name).toBe('Test subject')
  })

  it('Should properly pass errors to parent form', async () => {
    const wrapper = mountFormGenerator(form.schema, form.model)
    const fieldWrapper = wrapper.findComponent(FieldObject)

    const ageInput = fieldWrapper.find('input[type=number]')
    ageInput.setValue(15)
    await ageInput.trigger('blur')
    expect(fieldWrapper.emitted()).toHaveProperty('validated')
    // Default models shouldn't show up in the main form, as the model is an object.
    expect(wrapper.vm.formErrors).not.toHaveProperty('age')
    expect(wrapper.vm.formErrors).not.toHaveProperty('person')
    // The only correct way
    expect(wrapper.vm.formErrors).toHaveProperty('person.age')
    expect(wrapper.vm.formErrors['person.age']).toHaveLength(1)
    expect(wrapper.vm.formErrors['person.age'][0]).toBe('Field is invalid')
  })

  it('Should remove old errors', async () => {
    const wrapper = mountFormGenerator(form.schema, form.model)
    const fieldWrapper = wrapper.findComponent(FieldObject)

    const ageInput = fieldWrapper.find('input[type=number]')
    await ageInput.setValue(15)
    await ageInput.trigger('blur')
    expect(wrapper.vm.formErrors).toHaveProperty('person.age')

    await ageInput.setValue(18)
    await ageInput.trigger('blur')
    expect(wrapper.vm.formErrors).not.toHaveProperty('person.age')
  })

})
