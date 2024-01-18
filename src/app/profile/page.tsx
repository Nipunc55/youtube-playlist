// components/LoginForm.js

import signUpUser from "@/lib/signUp";
import { redirect } from "next/navigation";

export default async function RegisterForm() {
  async function handleClick(formData: FormData) {
    "use server";

    // Filter the array to include only 'email' and 'password' entries
    const credentials: inputUser = {
      username: formData.get("username")?.toString() || "",
      email: formData.get("email")?.toString() || "",
      password: formData.get("password")?.toString() || "",
    };
    const register = await signUpUser(credentials);
    if (register) {
      console.log(register);

      redirect("/");
    } else {
      console.log(register);
    }
  }
  return (
    <div className="flex flex-col items-center justify-center px-6 py-20 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Sign up a new your account
          </h1>
        </div>
      </div>
    </div>
  );
}
