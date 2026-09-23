import bcrypt from "bcryptjs";
import {
  EmailAlreadyInUseError,
  FailedToCreateUserError,
  PasswordDoesNotMatchError,
} from "./errors/index.js";
import type { UserRepository } from "../resources/UserRepository.js";
import { NotifierStrategyFactory } from "./factories/NotifierStrategy.js";

interface InputDto {
  name: string;
  age: number;
  email: string;
  password: string;
  passwordConfirmation: string;
  allowedMarketingChannel: string;
}

interface OutputDto {
  id: string;
  name: string;
  email: string;
  age: number;
}

export class CreateUser {
  constructor(private userRepository: UserRepository) {}
  async execute(input: InputDto): Promise<OutputDto> {
    const {
      name,
      age,
      email,
      password,
      passwordConfirmation,
      allowedMarketingChannel,
    } = input;
    if (password !== passwordConfirmation) {
      throw new PasswordDoesNotMatchError();
    }

    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new EmailAlreadyInUseError();
    }

    const user = await this.userRepository.create({
      id: crypto.randomUUID(),
      name,
      age,
      email,
      password: await bcrypt.hash(password, 10),
      allowedMarketingChannel,
    });
    if (!user) {
      throw new FailedToCreateUserError();
    }

    await NotifierStrategyFactory.create(allowedMarketingChannel).notify(user);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      age: user.age,
    };
  }
}
