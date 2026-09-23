import bcrypt from "bcryptjs";
import {
  EmailAlreadyInUseError,
  FailedToCreateUserError,
  PasswordDoesNotMatchError,
} from "./errors/index.js";
import { UserDAO } from "../resources/UserDAO.js";

interface InputDto {
  name: string;
  age: number;
  email: string;
  password: string;
  passwordConfirmation: string;
}

interface OutputDto {
  id: string;
  name: string;
  email: string;
  age: number;
}

export class CreateUser {
  async execute(input: InputDto): Promise<OutputDto> {
    const { name, age, email, password, passwordConfirmation } = input;

    if (password !== passwordConfirmation) {
      throw new PasswordDoesNotMatchError();
    }

    const userDAO = new UserDAO();
    const existingUser = await userDAO.findByEmail(email);
    if (existingUser) {
      throw new EmailAlreadyInUseError();
    }
    const user = await userDAO.create({
      id: crypto.randomUUID(),
      name,
      age,
      email,
      password: await bcrypt.hash(password, 10),
    });
    if (!user) {
      throw new FailedToCreateUserError();
    }
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      age: user.age,
    };
  }
}
