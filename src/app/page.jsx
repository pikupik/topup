"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ShoppingCart, User, Mail, Smartphone } from "lucide-react";
import axios from "axios";

const dummyTopupOptions = [
  { id: 1, diamonds: 60, price: 15000, bonus: false },
  { id: 2, diamonds: 140, price: 30000, bonus: false },
  { id: 3, diamonds: 330, price: 70000, bonus: true },
  { id: 4, diamonds: 670, price: 140000, bonus: true },
  { id: 5, diamonds: 1260, price: 250000, bonus: true },
  { id: 6, diamonds: 2730, price: 540000, bonus: true },
];

export default function MobileLegendsTopUp() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    playerId: "",
    contact: "",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/products/get"
        );
        setProducts(response.data); // Assuming the API returns an array of products
      } catch (error) {
        console.error("Error fetching products:", error);
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
      alert(
        `Top-up ${selectedOption.diamonds} diamonds to ${formData.playerId}`
      );
    }
  };

  const isFormValid = () => {
    return selectedOption && formData.playerId && formData.contact;
  };

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
        <Image
          src="/ml.jpeg"
          alt="Mobile Legends"
          width={1000}
          height={100}
          className="mb-4 rounded-lg shadow-lg"
        />
      </div>

      {/* Main Content */}
      <div className="flex-grow p-4 space-y-4">
        {/* Diamond Options */}
        <div className="grid grid-cols-2 gap-3">
          {products.map((product) => (
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
          disabled={!isFormValid()}
          className="w-full bg-blue-600 text-white p-3 rounded-lg 
            flex items-center justify-center
            hover:bg-blue-700 transition-colors duration-200
            disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          <ShoppingCart className="mr-2" />
          Lanjutkan Pembayaran
        </button>
      </div>
    </div>
  );
}
