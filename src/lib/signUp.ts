import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcrypt";

export interface inputUser {
  email: string;
  password: string;
}

async function signUp(userData: inputUser) {
  await dbConnect();

  const { email, password } = userData;

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  // Hash the password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    email,
    password: hashedPassword,
  });

  const savedUser = await newUser.save();

  return savedUser;
}

export default signUp;
