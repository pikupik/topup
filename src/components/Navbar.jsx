"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const router = useRouter();

  // Fetch user data from backend

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  //handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <header className="bg-gray-500 text-white p-4 shadow-md relative">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-xl md:text-2xl font-bold">Vckgamingstore</div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden z-50 relative"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/admin"
            className="hover:text-yellow-400 transition-colors"
          >
            Dasboard Admin
          </Link>
          <Link href="/" className="hover:text-yellow-400 transition-colors">
            Dashboard Awal
          </Link>
          <Link
            href="/create"
            className="hover:text-yellow-400 transition-colors"
          >
            Buat Produk
          </Link>
          <button
            onClick={handleLogout}
            className="hover:text-yellow-400 transition-colors flex items-center"
          >
            <LogOut className="mr-1" size={16} /> Logout
          </button>
        </nav>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden fixed top-0 right-0 w-64 h-full bg-blue-900 shadow-lg transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          } z-40`}
        >
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center p-4 border-b border-blue-700">
              <div className="text-sm font-bold">Halo admin@gmail.com</div>
              <button onClick={toggleMenu} aria-label="Close menu">
                <X size={24} />
              </button>
            </div>
            <nav className="flex flex-col flex-grow p-4 space-y-4">
              <Link
                href="/admin"
                className="text-lg hover:text-yellow-400 transition-colors"
                onClick={toggleMenu}
              >
                Dashboard Admin
              </Link>
              <Link
                href="/"
                className="text-lg hover:text-yellow-400 transition-colors"
                onClick={toggleMenu}
              >
                Dashboard Awal
              </Link>
              <Link
                href="/create"
                className="text-lg hover:text-yellow-400 transition-colors"
                onClick={toggleMenu}
              >
                Buat Produk
              </Link>
              <button
                onClick={handleLogout}
                className="text-lg hover:text-yellow-400 transition-colors flex items-center"
              >
                <LogOut className="mr-2" size={20} /> Logout
              </button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
