export class UserError extends Error {
  errors: string[] = [];

  constructor(errors?: string[]) {
    super("USER_ENTITY_ERROR");
    this.name = "UserError";

    if (errors && errors.length !== 0) {
      this.errors.push(...errors);
    }
  }
}
