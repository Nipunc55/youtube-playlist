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
    <div className="flex flex-col items-center justify-center h-screen p-2 pt-16 ">
      <div className=" w-full h-full  ">
        <div className="grid grid-cols-1 h-full sm:grid-cols-2 gap-4">
          <div className="h-full col-span-1 bg-green-100 rounded shadow-md">
            <div className="p-4   ">
              <p>Column 1</p>
            </div>
          </div>
          <div className="h-full col-span-1 bg-green-600 rounded shadow-md">
            <div className="p-4 ">
              <p>Column 2</p>
            </div>
          </div>

          <div className="col-span-2 bg-yellow-100 h-full rounded shadow-md ">
            <div className="p-4 ">
              <p>Column 3</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
