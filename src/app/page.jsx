"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ShoppingCart, User, Mail } from "lucide-react";
import axios from "axios";

export default function MobileLegendsTopUp() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    playerId: "",
    contact: "",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:3000/api/products/get"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedOption && formData.playerId && formData.contact) {
      alert(`Top-up ${selectedOption.amount} diamonds to ${formData.playerId}`);
    }
  };

  const isFormValid = () => {
    return selectedOption && formData.playerId && formData.contact;
  };

  // Skeleton loader for products
  const ProductSkeleton = () => (
    <div className="bg-gray-800 rounded-lg p-3 shadow-md animate-pulse">
      <div className="flex justify-between items-center">
        <div className="w-full">
          <div className="h-5 bg-gray-700 rounded w-24 mb-2"></div>
          <div className="h-4 bg-gray-700 rounded w-32"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col">
      {/* Header */}
      <header className="bg-blue-700 text-white p-4 flex items-center justify-between shadow-md">
        <div className="flex items-center">
          <Image
            src="/logo.png"
            alt="Vck Store"
            width={40}
            height={40}
            className="mr-3 rounded-full"
          />
          <h1 className="text-xl font-bold">Vck Store</h1>
        </div>
      </header>

      {/* Mobile Legends Banner */}
      <div className="bg-gray-800 p-4 flex items-center justify-center">
        <div className="relative w-full h-60 lg:h-96 bg-gray-800">
          {isLoading ? (
            <div className="w-full h-full bg-gray-700 animate-pulse"></div>
          ) : (
            <Image
              src="/btrx.jpeg"
              alt="Mobile Legends"
              fill
              className="object-cover items-center"
            />
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-4 space-y-4">
        {/* Loading State or Diamond Options */}
        <div className="grid grid-cols-2 gap-3">
          {isLoading
            ? // Show 6 skeleton loaders while loading
              [...Array(6)].map((_, index) => <ProductSkeleton key={index} />)
            : // Show actual products when loaded
              products.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleOptionSelect(product)}
                  className={`bg-gray-800 rounded-lg p-3 shadow-md cursor-pointer 
                  transition-all duration-200 ease-in-out
                  ${
                    selectedOption?.id === product.id
                      ? "ring-2 ring-blue-600 scale-105"
                      : "hover:bg-gray-700"
                  }
                  relative`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold text-blue-400">
                        {product.amount} Diamonds
                      </p>
                      <p className="text-gray-300 text-sm">
                        Rp {product.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
        </div>

        {/* Combined Input Section */}
        <div className="bg-gray-800 rounded-lg shadow-md p-4 space-y-4">
          <div className="relative">
            <label className="text-white font-semibold block mb-2">
              Player ID
            </label>
            <div className="flex items-center">
              <User className="absolute left-3 text-gray-400" size={20} />
              <input
                type="text"
                name="playerId"
                placeholder="Contoh: 12345678 (1234)"
                value={formData.playerId}
                onChange={handleInputChange}
                className="w-full p-3 pl-10 border border-gray-700 rounded-md bg-gray-700 text-white 
                  focus:ring-2 focus:ring-blue-600 focus:border-transparent
                  transition-all duration-200"
              />
            </div>
          </div>

          <div className="relative">
            <label className="text-white font-semibold block mb-2">No HP</label>
            <div className="flex items-center">
              <Mail className="absolute left-3 text-gray-400" size={20} />
              <input
                type="text"
                name="contact"
                placeholder="Nomor HP: ex 08123456789"
                value={formData.contact}
                onChange={handleInputChange}
                className="w-full p-3 pl-10 border border-gray-700 rounded-md bg-gray-700 text-white 
                  focus:ring-2 focus:ring-blue-600 focus:border-transparent
                  transition-all duration-200"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Payment Button */}
      <div className="p-4 bg-gray-800 shadow-md">
        <button
          onClick={handleSubmit}
          disabled={!isFormValid() || isLoading}
          className="w-full bg-blue-600 text-white p-3 rounded-lg 
            flex items-center justify-center
            hover:bg-blue-700 transition-colors duration-200
            disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          <ShoppingCart className="mr-2" />
          {isLoading ? "Loading..." : "Lanjutkan Pembayaran"}
        </button>
      </div>
    </div>
  );
}
