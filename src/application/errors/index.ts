export class PasswordDoesNotMatchError extends Error {
  constructor() {
    super("Passwords do not match");
  }
}

export class EmailAlreadyInUseError extends Error {
  constructor() {
    super("Email already in use");
  }
}

export class FailedToCreateUserError extends Error {
  constructor() {
    super("Failed to create user");
  }
}
