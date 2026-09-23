import { eq } from "drizzle-orm";
import { usersTable } from "../api.js";
import { db } from "../db/client.js";

// Data Access Object
export class UserDAO {
  async create(dto: {
    id: string;
    name: string;
    age: number;
    email: string;
    password: string;
  }) {
    const [user] = await db.insert(usersTable).values(dto).returning();
    if (!user) {
      return null;
    }
    return user;
  }

  async findByEmail(email: string) {
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
