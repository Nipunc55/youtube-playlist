import { connect } from "@planetscale/database";
import { config } from "@/db/config";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { users } from "@/db/schema";
import { comparePassword } from "@/utils/password"; // You need to implement a password comparison function
import { eq, findFirst } from "drizzle-orm";
export default async function loginUser(credentials: any) {
  const conn = connect(config);
  const db = drizzle(conn);

  try {
    // Find the user based on the provided email
    const user: user | null = await db
      .select({
        username: users.username,
        email: users.email,
        passwordHash: users.passwordHash,
        // Add other user properties as needed
      })

      .from(users)
      .where(eq(users.email, credentials.email))
      .findFirst();
    //   .findFirst();

    // Check if the user exists and if the password matches
    if (
      user &&
      (await comparePassword(credentials.password, user.passwordHash))
    ) {
      return user;
    } else {
      return null; // Invalid credentials
    }
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
}
