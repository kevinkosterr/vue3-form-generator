import { it, describe, expect } from 'vitest'
import { markRaw } from 'vue'
import validators from '@/validators'
import TextFieldBuilder from '@/builders/fields/TextFieldBuilder'

const builder = () => new TextFieldBuilder('n').model('m')

describe('BaseFieldBuilder', () => {

  it('Should return the builder instance from every setter', () => {
    const b = builder()
    for (const result of [
      b.label('l'), b.labelIcon('icon'), b.noLabel(), b.hint('h'), b.required(), b.readonly(),
      b.validator(validators.string), b.validateOn('onChanged'), b.onValidated(() => {})
    ]) {
      expect(result).toBe(b)
    }
  })

  it('Should set label, hint and validateOn', () => {
    const field = builder().label('Label').hint('Hint').validateOn('onChanged').build()
    expect(field).toMatchObject({ label: 'Label', hint: 'Hint', validate: 'onChanged' })
  })

  it('Should accept a function as hint', () => {
    const hint = () => 'Dynamic'
    expect(builder().hint(hint).build().hint).toBe(hint)
  })

  describe('labelIcon()', () => {

    it('Should set a string or component', () => {
      const component = markRaw({ template: '<i></i>' })
      expect(builder().labelIcon('fa fa-user').build().labelIcon).toBe('fa fa-user')
      expect(builder().labelIcon(component).build().labelIcon).toBe(component)
    })

    it('Should accept a LabelIconDefinition', () => {
      const icon = { icon: 'fa fa-user', position: 'right' } as const
      expect(builder().labelIcon(icon).build().labelIcon).toStrictEqual(icon)
    })

    it('Should build a LabelIconDefinition when a position is given', () => {
      expect(builder().labelIcon('fa fa-user', 'right').build().labelIcon)
        .toStrictEqual({ icon: 'fa fa-user', position: 'right' })
    })

  })

  describe('boolean setters', () => {

    it('Should default to true when called without argument', () => {
      expect(builder().noLabel().required().readonly().build())
        .toMatchObject({ noLabel: true, required: true, readonly: true })
    })

    it('Should accept explicit values', () => {
      expect(builder().noLabel(false).required(false).readonly(false).build())
        .toMatchObject({ noLabel: false, required: false, readonly: false })
    })

  })

  describe('validator()', () => {

    it('Should store a single validator as a function', () => {
      expect(builder().validator(validators.email).build().validator).toBe(validators.email)
    })

    it('Should store multiple validators as an array', () => {
      expect(builder().validator(validators.required, validators.email).build().validator)
        .toStrictEqual([ validators.required, validators.email ])
    })

    it('Should append validators when called multiple times', () => {
      expect(builder().validator(validators.required).validator(validators.email).build().validator)
        .toStrictEqual([ validators.required, validators.email ])
    })

  })


  it('Should accept functions for required and readonly', () => {
    const isRequired = () => true
    const isReadonly = () => false
    expect(builder().required(isRequired).readonly(isReadonly).build())
      .toMatchObject({ required: isRequired, readonly: isReadonly })
  })

  it('Should set onValidated', () => {
    const onValidated = () => {}
    expect(builder().onValidated(onValidated).build().onValidated).toBe(onValidated)
  })

  it('Should ignore the position for a LabelIconDefinition', () => {
    const icon = { icon: 'fa fa-user', position: 'left' } as const
    expect(builder().labelIcon(icon, 'right').build().labelIcon).toStrictEqual(icon)
  })

  it('Should build a LabelIconDefinition for a component with a position', () => {
    const component = markRaw({ template: '<i></i>' })
    expect(builder().labelIcon(component, 'left').build().labelIcon).toStrictEqual({ icon: component, position: 'left' })
  })

  it('Should keep appending validators to an existing array', () => {
    expect(builder().validator(validators.required, validators.email).validator(validators.string).build().validator)
      .toStrictEqual([ validators.required, validators.email, validators.string ])
  })

  it('Should append to a validator set through extend()', () => {
    expect(builder().extend({ validator: validators.required }).validator(validators.email).build().validator)
      .toStrictEqual([ validators.required, validators.email ])
  })

})
