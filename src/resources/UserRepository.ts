import { eq } from "drizzle-orm";
import { usersTable } from "../api.js";
import { db } from "../db/client.js";
import type { User } from "../application/entities/User.js";

export interface UserRepository {
  create(input: User): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
}

export class DrizzleUserRepository implements UserRepository {
  async create(input: User): Promise<User | null> {
    const [user] = await db.insert(usersTable).values(input).returning();
    if (!user) {
      return null;
    }
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));
    if (!user) {
      return null;
    }
    return user;
  }
}
