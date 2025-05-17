import React, { useRef, useState } from "react";

const ProductCard = ({ product, addToCart }) => {
  const { id, image, name, price, badge } = product;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const imageRef = useRef(null);

  const parsedPrice = parseFloat(price);

  return (
    <>
      <div className="relative p-4 flex flex-col gap-y-3 overflow-hidden group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-purple-100">
        {/* Badge */}
        {badge && badge.text && (
          <span
            className={`absolute top-4 left-4 z-10 bg-${badge.color}-500 text-white text-xs px-2 py-1 rounded-full shadow-sm`}
          >
            {badge.text}
          </span>
        )}

        {/* Product Image */}
        <div className="w-full aspect-square overflow-hidden rounded-lg group-hover:scale-[1.02] transition-transform duration-300">
          <img
            ref={imageRef}
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 ease-out transform group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Product Info */}
        <div className="mt-3">
          <p className="font-semibold text-gray-900 line-clamp-2 text-sm sm:text-base">
            {name}
          </p>
          <p className="text-gray-700 font-medium text-sm sm:text-base mt-1">
            Rp {parsedPrice.toLocaleString("id-ID")}
          </p>
        </div>

        {/* Add to Cart Button (Hover & Touch Active) */}
        <div className="absolute inset-0 flex flex-col justify-center items-center gap-2 transition-all duration-300 ease-out opacity-0 group-hover:opacity-100 group-active:opacity-100 bg-gradient-to-t from-black/30 to-transparent rounded-lg">
          <button
            className="bg-purple-600 text-white hover:text-purple-600 hover:bg-white active:text-purple-600 active:bg-white active:scale-95 px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 shadow-md border border-transparent hover:border-purple-600 active:border-purple-600"
            onClick={() => setIsOpen(true)}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 backdrop-blur-sm p-4">
          <div className="bg-white p-0 rounded-2xl shadow-2xl w-full max-w-md md:max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col md:flex-row relative animate-fadeIn">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 bg-white rounded-full p-1 shadow-md z-10 transition-colors"
              onClick={() => setIsOpen(false)}
              aria-label="Close modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Left: Image */}
            <div className="w-full md:w-1/2 bg-gray-50 p-4 sm:p-6 flex items-center justify-center">
              <img
                src={image}
                alt={name}
                className="w-full h-48 sm:h-64 md:h-80 object-contain rounded-lg"
                loading="lazy"
              />
            </div>

            {/* Right: Product Details */}
            <div className="w-full md:w-1/2 p-4 sm:p-6 md:p-8 flex flex-col">
              <div className="flex-grow">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                  {name}
                </h2>
                <p className="text-base sm:text-lg font-semibold text-purple-600 mt-1 sm:mt-2">
                  Rp {parsedPrice.toLocaleString("id-ID")}
                </p>

                {/* Size Selection */}
                <div className="mt-4 sm:mt-6">
                  <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                    Select Size:
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {["S", "M", "L", "XL"].map((size) => (
                      <button
                        key={size}
                        className={`py-2 px-3 sm:px-4 rounded-md border transition-all text-xs sm:text-sm font-medium ${
                          selectedSize === size
                            ? "bg-purple-600 text-white border-purple-600 shadow-inner"
                            : "bg-white text-gray-700 border-gray-300 hover:border-purple-400 hover:text-purple-600"
                        }`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="mt-6 sm:mt-8">
                  <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                    Quantity:
                  </label>
                  <div className="flex items-center w-fit">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-l-md bg-gray-100 text-gray-600 hover:bg-gray-200 flex items-center justify-center transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 sm:h-5 sm:w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20 12H4"
                        />
                      </svg>
                    </button>
                    <div className="w-12 sm:w-16 h-8 sm:h-10 bg-gray-50 flex items-center justify-center border-t border-b border-gray-200 font-medium text-sm sm:text-base">
                      {quantity}
                    </div>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-r-md bg-gray-100 text-gray-600 hover:bg-gray-200 flex items-center justify-center transition-colors"
                      aria-label="Increase quantity"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 sm:h-5 sm:w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Modal Add to Cart Button */}
              <button
                className="bg-purple-600 hover:bg-purple-700 active:scale-95 text-white w-full py-2 sm:py-3 px-4 rounded-lg mt-6 sm:mt-8 font-medium transition duration-300 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg text-sm sm:text-base"
                onClick={() => {
                  addToCart(
                    {
                      id,
                      image,
                      name,
                      price: parsedPrice,
                      size: selectedSize,
                      quantity,
                    },
                    imageRef
                  );
                  setIsOpen(false);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 sm:h-5 sm:w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
