import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { genareteToken } from "@/utils/token";
import bcrypt from "bcrypt";

interface Credentials {
  email: string;
  password: string;
}

async function loginUser({ email, password }: Credentials) {
  await dbConnect();

  const user = await User.findOne({ email });
  if (!user) {
    return null;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return null;
  }
  const token = genareteToken({ user_id: user._id, username: user.email });

  return {
    status: true,
    authentication: isPasswordValid,
    user_id: user._id,
    username: null,
    email,
    token,
  };
  // Return user details (excluding password) for the response
  // const { password: userPassword, ...userWithoutPassword } = user.toObject();

  // return userWithoutPassword;
}

export default loginUser;
