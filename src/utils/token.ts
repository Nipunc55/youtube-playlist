import { sign, verify } from "jsonwebtoken";

// Secret key for JWT
const secretKey = "your-secret-key"; // Replace with a strong secret key, and keep it secret

// Function to validate a JWT token
export function validateToken(token: string): { valid: boolean; data?: any } {
  try {
    console.log("-------- jwt token : ", token);

    const decoded = verify(token, secretKey);
    return { valid: true, data: decoded };
  } catch (error) {
    console.error("Error validating token:", error);
    return { valid: false };
  }
}

export function genareteToken({ user_id, username }: tokenParams) {
  const token = sign({ user_id, username }, secretKey);
  return token;
}
// // {
//   expiresIn: "30h", // Token expiration time (optional)
// }
