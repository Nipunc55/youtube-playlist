/** @format */
"use client";
import React from "react";
import Link from "next/link";
import { useStore } from "@/store/store";
import { useRouter } from "next/navigation";
const Navbar = () => {
  // const [isAuthenticated, setAuthenticated] = React.useState(false);
  const { isAuthenticated } = useStore();
  const router = useRouter();
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    localStorage.setItem("test", "token");
    const test = localStorage.getItem("test");
    alert(test);

    if (token)
      useStore.setState((prev) => ({ ...prev, isAuthenticated: true }));
  }, []);

  const handleLogin = () => {
    // Implement your login logic here
    // setAuthenticated(true);
    router.push("/login");
  };

  const handleSignup = () => {
    // Implement your signup logic here
    // setAuthenticated(true);
    router.push("/signup");
  };

  const handleLogout = () => {
    console.log("handleLogout");

    // Implement your logout logic here
    // setAuthenticated(false);
    localStorage.removeItem("token");
    useStore.setState((prev) => ({ ...prev, isAuthenticated: false }));
    router.push("/login");
  };
  return (
    <nav
      className="fixed top-0 w-full bg-gray-900 bg-opacity-95 p-4 "
      style={{ zIndex: "100" }}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="text-white font-bold text-lg">
            <a href="/">Youtube Library</a>
          </div>

          <div className="flex space-x-4">
            {isAuthenticated ? (
              <button className="text-white" onClick={() => handleLogout()}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
              </button>
            ) : (
              <button className="text-white" onClick={handleLogin}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
