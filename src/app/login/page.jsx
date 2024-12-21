"use client";

import React, { useState } from "react";
import { User, Lock, Mail, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add login logic here
    console.log("Login attempt:", { email, password });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-8">
          {/* Logo and Title */}
          <div className="flex flex-col items-center mb-6">
            <div className="bg-blue-600 rounded-full p-4 mb-4">
              <User className="text-white" size={40} />
            </div>
            <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
            <p className="text-gray-400 mt-2">Sign in to continue</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 pl-10 bg-gray-700 text-white 
                  rounded-lg border border-transparent 
                  focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50
                  transition duration-300"
                required
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 pl-10 pr-12 bg-gray-700 text-white 
                  rounded-lg border border-transparent 
                  focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50
                  transition duration-300"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 
                  text-gray-400 hover:text-white transition duration-300"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <a
                href="#"
                className="text-blue-400 hover:text-blue-300 
                  text-sm transition duration-300"
              >
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg 
                hover:bg-blue-700 transition duration-300 
                transform hover:scale-105 active:scale-95
                flex items-center justify-center space-x-2"
            >
              <span>Sign In</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
