import React, { useState } from "react";
import {
  FiGrid,
  FiStar,
  FiClock,
  FiTv,
  FiHeadphones,
  FiSmartphone,
  FiWatch,
  FiTablet,
  FiSpeaker,
} from "react-icons/fi";

const Sidebar = ({ isMobileMenuOpen }) => {
  const [activeCategory, setActiveCategory] = useState("All Products");

  const categories = [
    { icon: <FiStar />, name: "All Products" },
    { icon: <FiStar />, name: "Best Sellers" },
    { icon: <FiGrid />, name: "Computers" },
    { icon: <FiClock />, name: "Drones & Cameras" },
    { icon: <FiHeadphones />, name: "Headphones" },
    { icon: <FiTv />, name: "TV & Home Cinema" },
    { icon: <FiSmartphone />, name: "Mobile" },
    { icon: <FiWatch />, name: "Wearable Tech" },
    { icon: <FiTablet />, name: "Tablets" },
    { icon: <FiSpeaker />, name: "Speakers" },
  ];

  const handleCategoryClick = (categoryName) => {
    setActiveCategory(categoryName);
    // Tambahkan logika untuk menangani navigasi atau filter berdasarkan kategori
    console.log(`Kategori yang dipilih: ${categoryName}`);
  };

  return (
    <aside
      className={`fixed lg:static inset-y-0 left-0 w-64 bg-white shadow-lg lg:shadow-none z-40 transform transition-transform duration-300 ease-in-out ${
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0`}
    >
      <div className="h-full overflow-y-auto p-6">
        <h3 className="text-lg font-bold mb-6 text-gray-800 flex items-center">
          <FiGrid className="mr-2" /> Categories
        </h3>
        <ul className="space-y-2">
          {categories.map(({ icon, name }, idx) => (
            <li
              key={idx}
              onClick={() => handleCategoryClick(name)}
              className={`flex items-center px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                activeCategory === name
                  ? "bg-indigo-50 text-purple-600 font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span className="mr-3">{icon}</span>
              {name}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
