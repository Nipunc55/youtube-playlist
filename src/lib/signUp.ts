import { connect } from "@planetscale/database";
import { config } from "@/db/config";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { users } from "@/db/schema";
import { hashPassword } from "@/utils/password"; // You need to implement a password hashing function
import { genareteToken } from "@/utils/token";
import loginUser from "./login";
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

    if (result) {
      const login = await loginUser({
        email: userData.email,
        password: userData.password,
      });

      return { ...login, message: "successfully registered!" };
    }
    return { status: false, message: "user already exits!" };
  } catch (error) {
    // console.error("Error signing up user:", error);
    return { status: false, message: "user already exits!" };
  }
}
