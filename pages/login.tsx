import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import Image from "next/image";

const LoginPage = () => {
  const [usernameOrEmail, setusernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = `${baseURL}/auth/login?usernameOrEmail=${encodeURIComponent(usernameOrEmail)}&password=${encodeURIComponent(password)}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Logged in successfully");
        localStorage.setItem("user_id", data.user_id);

        setusernameOrEmail("");
        setPassword("");
        window.location.reload();
      } else {
        setError(data.error || "Login failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("An error occurred during login");
    }
  };

  return (
    <div className="gradient-wrapper flex flex-col justify-center items-center h-screen bg-gradient-to-br from-blue-400 to-purple-600">
      <div className="bg-white/90 p-10 rounded-xl shadow-2xl text-gray-800">
        <h2 className="text-center text-4xl font-bold mb-8">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center bg-gray-100 p-4 rounded-md shadow-sm">
            <FaUser className="text-gray-500 mr-3" />
            <input
              type="text"
              placeholder="Username or Email"
              value={usernameOrEmail}
              onChange={(e) => setusernameOrEmail(e.target.value)}
              className="input flex-1 bg-transparent border-none outline-none text-lg"
            />
          </div>
          <div className="flex items-center bg-gray-100 p-4 rounded-md shadow-sm">
            <MdLockOutline className="text-gray-500 mr-3" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input flex-1 bg-transparent border-none outline-none text-lg"
            />
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:bg-gradient-to-l text-white py-3 rounded-md font-bold text-lg shadow-lg transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
