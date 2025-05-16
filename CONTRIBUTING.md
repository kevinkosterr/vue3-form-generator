# Contributing
Please read the following before contributing to this repository.

## Commit guidelines
Commits should follow the basic guidelines as specified by [Angular](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit).
The `scope` is applicable to `docs`, `feat`, `refactor`, `fix`, `test` or `perf`. Typically, the `scope` would be the
field component that the change is made to/made for. For example: if you fix a bug in the `FieldCheckbox` component
the commit should start with `fix(FieldCheckbox)`.

Commits must follow the guidelines as specified above in order for `semantic-release` to create proper release notes.
Commits are also evaluated against the [default release rules](https://github.com/semantic-release/commit-analyzer/blob/master/lib/default-release-rules.js).
E.g. `feat:` will create a `minor` release and `fix:` will create a `patch` release.

Should your commits close any issues, please mention them in the footer of the commit message.