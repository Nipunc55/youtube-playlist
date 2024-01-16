import { connect } from "@planetscale/database";
import { config } from "@/db/config";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { users } from "@/db/schema";
import { comparePassword } from "@/utils/password"; // You need to implement a password comparison function
import { eq } from "drizzle-orm";
import { genareteToken } from "@/utils/token";

export default async function loginUser(credentials: any) {
  const conn = connect(config);
  const db = drizzle(conn);

  try {
    // Find the user based on the provided email
    const user: user[] = await db
      .select({
        user_id: users.userId,
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
      const { user_id, username, email } = user[0];
      const authentication = await comparePassword(
        credentials.password,
        user[0].passwordHash
      );

      if (authentication) {
        const token = genareteToken({ user_id, username });
        return { authentication, user_id, username, email, token };
      }
      return { status: false, message: "invalid credentials" };
    } else {
      return { status: false, message: "invalid credentials" }; // Invalid credentials
    }
  } catch (error) {
    console.error("Error logging in user:", error);
    return { status: false, message: "server error" };
  }
}
