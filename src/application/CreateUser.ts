import bcrypt from "bcryptjs";
import { usersTable } from "../api.js";
import { db } from "../db/client.js";
import { eq } from "drizzle-orm";
import {
  EmailAlreadyInUseError,
  FailedToCreateUserError,
  PasswordDoesNotMatchError,
} from "./errors/index.js";

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

    const [existing] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));
    if (existing) {
      throw new EmailAlreadyInUseError();
    }
    const [user] = await db
      .insert(usersTable)
      .values({
        name,
        age,
        email,
        password: await bcrypt.hash(password, 10),
      })
      .returning();

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
