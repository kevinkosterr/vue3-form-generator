/**
 * Error thrown when a schema or field builder is used incorrectly, e.g. when a required property is missing.
 * @extends Error
 */
export class BuilderError extends Error {
  /** Description of what went wrong, without the field path. */
  readonly reason: string
  /** Path of the field that caused the error, e.g. `address.street`. */
  readonly path?: string

  constructor(reason: string, path?: string) {
    super(path ? `Field "${path}": ${reason}` : reason)
    this.name = 'BuilderError'
    this.reason = reason
    this.path = path
  }

  /**
   * Wrap any error thrown while handling the field at `key`, prepending `key` to its path.
   * @param error - The caught error.
   * @param key - Key of the field that was being handled.
   */
  static wrap (error: unknown, key: string): BuilderError {
    if (error instanceof BuilderError) {
      return new BuilderError(error.reason, error.path ? `${key}.${error.path}` : key)
    }
    return new BuilderError(error instanceof Error ? error.message : String(error), key)
  }

}
