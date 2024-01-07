import { connect } from "@planetscale/database";
import { config } from "@/db/config";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { users } from "@/db/schema";
import { comparePassword } from "@/utils/password"; // You need to implement a password comparison function
import { eq } from "drizzle-orm";

export default async function loginUser(credentials: any) {
  const conn = connect(config);
  const db = drizzle(conn);

  try {
    // Find the user based on the provided email
    const user: user[] = await db
      .select({
        username: users.username,
        email: users.email,
        passwordHash: users.passwordHash,
        // Add other user properties as needed
      })

      .from(users)
      .where(eq(users.email, credentials.email))
      .limit(1);
    //   .findFirst();

    if (user.length > 0) {
      const { username, email } = user[0];
      const authentication = await comparePassword(
        credentials.password,
        user[0].passwordHash
      );

      if (authentication) return { authentication, username, email };
      return { status: false, message: "invalid credentials" };
    } else {
      return { status: false, message: "invalid credentials" }; // Invalid credentials
    }
  } catch (error) {
    console.error("Error logging in user:", error);
    return { status: false, message: "server error" };
  }
}
