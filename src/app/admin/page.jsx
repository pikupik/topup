"use client";

import React, { useState } from "react";
import {
  BarChart2,
  DollarSign,
  Diamond,
  Upload,
  TrendingUp,
  Users,
  Package,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";

// Dummy data for sales and diamonds
const salesData = [
  { month: "Jan", revenue: 45000, diamonds: 2500 },
  { month: "Feb", revenue: 52000, diamonds: 3000 },
  { month: "Mar", revenue: 62000, diamonds: 3600 },
  { month: "Apr", revenue: 58000, diamonds: 3200 },
  { month: "May", revenue: 70000, diamonds: 4100 },
];

const diamondPackages = [
  { id: 1, diamonds: 60, price: 15000 },
  { id: 2, diamonds: 140, price: 30000 },
  { id: 3, diamonds: 330, price: 70000 },
  { id: 4, diamonds: 670, price: 140000 },
  { id: 5, diamonds: 1260, price: 250000 },
];

export default function MobileAdminDashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [newPackage, setNewPackage] = useState({
    diamonds: "",
    price: "",
  });

  const totalRevenue = salesData.reduce((sum, item) => sum + item.revenue, 0);
  const totalDiamondsSold = salesData.reduce(
    (sum, item) => sum + item.diamonds,
    0
  );

  const handlePackageUpload = (e) => {
    e.preventDefault();
    if (newPackage.diamonds && newPackage.price) {
      diamondPackages.push({
        id: diamondPackages.length + 1,
        diamonds: parseInt(newPackage.diamonds),
        price: parseInt(newPackage.price),
      });
      setNewPackage({ diamonds: "", price: "" });
      alert("Paket diamond berhasil ditambahkan!");
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <div className="space-y-4">
            {/* Revenue Card */}
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-gray-400 mb-2">Total Revenue</h3>
                  <p className="text-2xl font-bold text-green-500">
                    Rp {totalRevenue.toLocaleString()}
                  </p>
                </div>
                <DollarSign className="text-green-500" size={40} />
              </div>
              <div className="mt-4 flex items-center text-green-400">
                <TrendingUp className="mr-2" size={20} />
                <span>15.3% dari bulan lalu</span>
              </div>
            </div>

            {/* Diamonds Sold Card */}
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-gray-400 mb-2">Total Diamond</h3>
                  <p className="text-2xl font-bold text-blue-500">
                    {totalDiamondsSold.toLocaleString()}
                  </p>
                </div>
                <Diamond className="text-blue-500" size={40} />
              </div>
              <div className="mt-4 flex items-center text-blue-400">
                <Package className="mr-2" size={20} />
                <span>5 Paket Tersedia</span>
              </div>
            </div>
          </div>
        );

      case "packages":
        return (
          <div className="space-y-4">
            {/* New Package Upload Card */}
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
              <h3 className="text-gray-400 mb-4">Tambah Paket Diamond</h3>
              <form onSubmit={handlePackageUpload} className="space-y-3">
                <input
                  type="number"
                  placeholder="Jumlah Diamond"
                  value={newPackage.diamonds}
                  onChange={(e) =>
                    setNewPackage({
                      ...newPackage,
                      diamonds: e.target.value,
                    })
                  }
                  className="w-full p-2 bg-gray-700 rounded"
                />
                <input
                  type="number"
                  placeholder="Harga (Rp)"
                  value={newPackage.price}
                  onChange={(e) =>
                    setNewPackage({
                      ...newPackage,
                      price: e.target.value,
                    })
                  }
                  className="w-full p-2 bg-gray-700 rounded"
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 p-2 rounded hover:bg-blue-700 flex items-center justify-center"
                >
                  <Upload className="mr-2" /> Unggah Paket
                </button>
              </form>
            </div>

            {/* Diamond Packages List */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h2 className="text-xl font-bold mb-4">Paket Diamond</h2>
              {diamondPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="bg-gray-700 rounded-lg p-3 mb-3 flex justify-between items-center"
                >
                  <div>
                    <p className="font-bold">{pkg.diamonds} Diamond</p>
                    <p className="text-gray-400">
                      Rp {pkg.price.toLocaleString()}
                    </p>
                  </div>
                  <button className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700">
                    Edit
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Mobile Header */}
      <header className="bg-gray-800 p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <button
          onClick={() => setIsMenuOpen(true)}
          className="p-2 hover:bg-gray-700 rounded"
        >
          <Menu />
        </button>
      </header>

      {/* Main Content */}
      <div className="p-4">
        {/* Section Navigation */}
        <div className="flex mb-4 space-x-3 overflow-x-auto">
          {[
            { id: "dashboard", icon: BarChart2, label: "Dashboard" },
            { id: "packages", icon: Diamond, label: "Paket Diamond" },
            { id: "users", icon: Users, label: "Pengguna" },
          ].map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`
                flex items-center px-4 py-2 rounded-full 
                ${
                  activeSection === section.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-800 text-gray-400"
                }
              `}
            >
              <section.icon className="mr-2" size={20} />
              {section.label}
            </button>
          ))}
        </div>

        {/* Render Active Section */}
        {renderSection()}
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="bg-gray-800 w-3/4 h-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Menu</h2>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 hover:bg-gray-700 rounded"
              >
                <X />
              </button>
            </div>
            <nav>
              {[
                { icon: BarChart2, label: "Dashboard", id: "dashboard" },
                { icon: Diamond, label: "Paket Diamond", id: "packages" },
                { icon: Users, label: "Pengguna", id: "users" },
              ].map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setIsMenuOpen(false);
                  }}
                  className="flex justify-between items-center p-4 hover:bg-gray-700 rounded-lg cursor-pointer"
                >
                  <div className="flex items-center">
                    <item.icon className="mr-4" />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight />
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
