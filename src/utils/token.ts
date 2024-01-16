import { sign, verify } from "jsonwebtoken";

// Secret key for JWT
const secretKey = "your-secret-key"; // Replace with a strong secret key, and keep it secret

// Function to validate a JWT token
export function validateToken(token: string): { valid: boolean; data?: any } {
  try {
    // console.log("-------- jwt token : ", token);
    // const parsedToken = token ? JSON.parse(token) : null;
    const decoded = verify(token, secretKey);
    return { valid: true, data: decoded };
  } catch (error) {
    console.error("Error validating token:", error);
    return { valid: false };
  }
}

export function genareteToken({ user_id, username }: tokenParams) {
  try {
    const token = sign({ user_id, username }, secretKey);
    return token;
  } catch (error) {
    console.log("---------genarate error", error);

    return null;
  }
}
// // {
//   expiresIn: "30h", // Token expiration time (optional)
// }
