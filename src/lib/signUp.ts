import { connect } from "@planetscale/database";
import { config } from "@/db/config";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { users } from "@/db/schema";
import { hashPassword } from "@/utils/password"; // You need to implement a password hashing function

export default async function signUpUser(userData: inputUser) {
  const conn = connect(config);
  const db = drizzle(conn);

  try {
    // Hash the user's password before storing it in the database
    const hashedPassword = await hashPassword(userData.password);

    // Insert the new user into the 'users' table
    const result = await db
      .insert(users)
      .values({
        ...userData,
        passwordHash: hashedPassword,
      })
      .execute();

    return result || null;
  } catch (error) {
    console.error("Error signing up user:", error);
    throw error;
  }
}
