import React from "react";
import { Trash2, ChevronRight, X, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CartSidebar = ({
  setIsCartOpen,
  cartItems,
  updateQuantity,
  removeFromCart,
}) => {
  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Overlay with smooth animation */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Cart container with slide-in animation */}
      <div className="relative w-full max-w-sm h-full bg-white flex flex-col shadow-xl transform transition-transform">
        {/* Header with gradient background */}
        <div className="flex items-center justify-between p-5 bg-purple-600 to-indigo-600 text-white">
          <div className="flex items-center gap-3">
            <ShoppingBag size={24} />
            <h2 className="text-xl font-bold">
              Keranjang ({cartItems.length}{" "}
              {cartItems.length === 1 ? "item" : "items"})
            </h2>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1 rounded-full hover:bg-white hover:bg-opacity-20 transition-all"
            aria-label="Close cart"
          >
            <X size={24} />
          </button>
        </div>

        {/* Cart content */}
        <div className="flex-grow overflow-y-auto">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-6">
              <ShoppingBag size={48} className="text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg mb-6">
                Keranjang belanja Anda kosong
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full hover:opacity-90 transition-all shadow-md"
              >
                Lanjutkan Belanja
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {cartItems.map((item, index) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="flex p-4 hover:bg-gray-50 transition-colors"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                  />
                  <div className="flex-1 ml-4 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-gray-900 truncate">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Size: {item.size}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(index)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <div className="flex justify-between items-center mt-3">
                      <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
                        <button
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                          onClick={() =>
                            updateQuantity(index, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="px-2 text-center w-8">
                          {item.quantity}
                        </span>
                        <button
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                          onClick={() =>
                            updateQuantity(index, item.quantity + 1)
                          }
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <p className="text-sm font-bold text-gray-800">
                        {formatCurrency(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-200 p-5 bg-white sticky bottom-0 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <p className="font-semibold text-gray-700">Subtotal</p>
              <p className="text-lg font-bold text-purple-600">
                {formatCurrency(subtotal)}
              </p>
            </div>
            <button
              className="w-full flex items-center justify-between bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-4 px-6 rounded-full transition-all shadow-lg"
              onClick={() => {
                setIsCartOpen(false);
                navigate("/checkout", { state: { cartItems } });
              }}
              aria-label="Proceed to checkout"
            >
              <span className="font-medium">Lanjut ke Pembayaran</span>
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;
