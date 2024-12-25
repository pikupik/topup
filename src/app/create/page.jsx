"use client";

import React, { useState } from "react";
import axios from "axios";
import { User, CreditCard, Package, DollarSign } from "lucide-react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function LoginPage() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Convert amount and price to numbers
    const numAmount = Number(amount);
    const numPrice = Number(price);

    // Validate the data
    if (isNaN(numAmount) || isNaN(numPrice)) {
      setError("Amount and price must be valid numbers");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post("/api/products/create", {
        name: name.trim(),
        type: type.trim(),
        amount: parseInt(amount, 10), // Convert to integer
        price: parseInt(price, 10), // Convert to integer
      });

      if (response.data.error) {
        setError(response.data.error);
      } else {
        // Clear form on success
        setName("");
        setType("");
        setAmount("");
        setPrice("");
        // You could add a success message here
      }
    } catch (error) {
      console.error("Error details:", error.response?.data || error.message);
      setError(
        error.response?.data?.error ||
          "Failed to create product. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-gray-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-8">
            <div className="flex flex-col items-center mb-6">
              <div className="bg-blue-600 rounded-full p-4 mb-4">
                <Package className="text-white" size={40} />
              </div>
              <h2 className="text-3xl font-bold text-white">Input Product</h2>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded-lg text-red-500">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="ex: Mobile Legends"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 pl-10 bg-gray-700 text-white rounded-lg border border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition duration-300"
                  required
                />
              </div>

              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="ex: Diamonds"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full p-3 pl-10 bg-gray-700 text-white rounded-lg border border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition duration-300"
                  required
                />
              </div>

              <div className="relative">
                <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  placeholder="ex: 366"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full p-3 pl-10 bg-gray-700 text-white rounded-lg border border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition duration-300"
                  required
                  min="0"
                />
              </div>

              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  placeholder="ex: 160000"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full p-3 pl-10 bg-gray-700 text-white rounded-lg border border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition duration-300"
                  required
                  min="0"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:hover:scale-100"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Buat Produk"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
