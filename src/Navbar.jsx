import React, { useState } from "react";
import { FiSearch, FiShoppingCart, FiMenu, FiX, FiHome } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const Navbar = ({
  cartItems,
  setIsCartOpen,
  cartIconRef,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    const isConfirmed = window.confirm("Apakah Anda yakin ingin keluar?");
    if (isConfirmed) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Mobile menu button */}
        <button
          className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {/* Logo / Brand */}
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <FiHome className="text-purple-600 mr-2" size={20} />
          <span className="text-xl font-bold text-gray-800">UTech</span>
        </div>

        {/* Search Bar - Hidden on Mobile */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 mx-8">
          <div className="relative w-full max-w-xl">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <FiSearch className="absolute right-3 top-2.5 text-gray-400" />
          </div>
        </form>

        {/* Right Menu: Cart and Logout */}
        <div className="flex items-center space-x-4">
          {/* Cart Button */}
          <div className="relative">
            <button
              ref={cartIconRef}
              className="p-2 rounded-full hover:bg-gray-100 relative"
              onClick={() => setIsCartOpen(true)}
            >
              <FiShoppingCart size={20} className="text-gray-700" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </button>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className=" text-purple-600 hover:text-red-600 hover:bg-white active:text-purple-600 active:bg-white active:scale-95 px-2 py-1 rounded-md transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
