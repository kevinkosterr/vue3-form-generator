/**
 * Custom error class representing a situation where a field is expected to have no value.
 * @extends Error
 */
export class NoValueError extends Error {

  constructor() {
    super('Field does not emit value(s).')
  }

}