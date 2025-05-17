import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const cartItems = location.state?.cartItems || [];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Nama lengkap harus diisi";
    if (!formData.email.trim()) newErrors.email = "Email harus diisi";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Email tidak valid";
    if (!formData.address.trim()) newErrors.address = "Alamat harus diisi";
    if (!formData.city.trim()) newErrors.city = "Kota harus diisi";
    if (!formData.postalCode.trim())
      newErrors.postalCode = "Kode pos harus diisi";
    if (!formData.phone.trim()) newErrors.phone = "Nomor telepon harus diisi";
    if (cartItems.length === 0) newErrors.cart = "Keranjang belanja kosong";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheckout = async () => {
    if (!validateForm()) return;

    setIsProcessing(true);

    try {
      // Simulasi proses pembayaran
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Tampilkan popup sukses
      setShowSuccessPopup(true);

      // Setelah 3 detik, kembali ke dashboard
      setTimeout(() => {
        navigate("/dashboard"); // Kembali ke dashboard
      }, 3000);
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Tombol Kembali ke Dashboard */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-50">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center px-4 py-2 bg-white text-purple-600 border border-purple-600 rounded-full shadow-md hover:bg-purple-600 hover:text-white transition-colors duration-300"
        >
          <svg
            className="h-5 w-5 mr-2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Kembali
        </button>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Checkout
          </h1>
          <p className="mt-3 text-xl text-gray-500">
            Lengkapi informasi pengiriman dan pembayaran
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b border-gray-200">
              Informasi Pengiriman
            </h2>

            <div className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-purple-600 focus:border-transparent`}
                  placeholder="Nama penerima"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-purple-600 focus:border-transparent`}
                  placeholder="email@contoh.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Alamat Lengkap
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.address ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-purple-600 focus:border-transparent`}
                  placeholder="Jalan, No. Rumah, Apartemen, dll"
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Kota
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.city ? "border-red-500" : "border-gray-300"
                    } focus:ring-2 focus:ring-purple-600 focus:border-transparent`}
                    placeholder="Kota"
                  />
                  {errors.city && (
                    <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="postalCode"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Kode Pos
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.postalCode ? "border-red-500" : "border-gray-300"
                    } focus:ring-2 focus:ring-purple-600 focus:border-transparent`}
                    placeholder="12345"
                  />
                  {errors.postalCode && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.postalCode}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Nomor Telepon
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-purple-600 focus:border-transparent`}
                  placeholder="081234567890"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Metode Pembayaran
              </h2>

              <div className="space-y-3">
                <button
                  onClick={() => handlePaymentMethodChange("creditCard")}
                  className={`w-full p-4 rounded-xl border-2 flex items-center ${
                    paymentMethod === "creditCard"
                      ? "border-purple-600 bg-purple-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 mr-4 ${
                      paymentMethod === "creditCard"
                        ? "border-purple-600 bg-purple-600"
                        : "border-gray-300"
                    }`}
                  ></div>
                  <div className="flex-1 text-left">
                    <h3 className="font-medium text-gray-900">
                      Kartu Kredit/Debit
                    </h3>
                    <p className="text-sm text-gray-500">
                      Visa, MasterCard, JCB, dll
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
                      className="h-6"
                      alt="Visa"
                    />
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                      className="h-6"
                      alt="Mastercard"
                    />
                  </div>
                </button>

                <button
                  onClick={() => handlePaymentMethodChange("paypal")}
                  className={`w-full p-4 rounded-xl border-2 flex items-center ${
                    paymentMethod === "paypal"
                      ? "border-purple-600 bg-purple-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 mr-4 ${
                      paymentMethod === "paypal"
                        ? "border-purple-600 bg-purple-600"
                        : "border-gray-300"
                    }`}
                  ></div>
                  <div className="flex-1 text-left">
                    <h3 className="font-medium text-gray-900">PayPal</h3>
                    <p className="text-sm text-gray-500">
                      Bayar dengan akun PayPal Anda
                    </p>
                  </div>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                    className="h-6"
                    alt="PayPal"
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg h-fit sticky top-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b border-gray-200">
              Ringkasan Pesanan
            </h2>

            {cartItems.length === 0 ? (
              <div className="text-center py-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mx-auto text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <p className="mt-3 text-lg font-medium text-gray-900">
                  Keranjang belanja kosong
                </p>
                <p className="mt-1 text-gray-500">
                  Tambahkan produk untuk melanjutkan
                </p>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {cartItems.map((item, index) => (
                    <div key={index} className="flex items-start">
                      <div className="relative">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="font-medium text-gray-900">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Ukuran: {item.size}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">
                          Rp {(item.price * item.quantity).toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-500">
                          Rp {item.price.toLocaleString()} x {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">
                      Rp {subtotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Pengiriman</span>
                    <span className="font-medium">Gratis</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold mt-4 pt-4 border-t border-gray-200">
                    <span>Total</span>
                    <span className="text-purple-600">
                      Rp {subtotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isProcessing || cartItems.length === 0}
                  className={`w-full mt-6 py-3 px-4 rounded-xl font-medium text-white ${
                    isProcessing || cartItems.length === 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-purple-600 hover:bg-purple-700"
                  } transition-colors duration-300 flex items-center justify-center`}
                >
                  {isProcessing ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Memproses...
                    </>
                  ) : (
                    "Selesaikan Pembayaran"
                  )}
                </button>

                <div className="mt-4 flex items-center text-sm text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <span>Pembayaran aman dan terenkripsi</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <AnimatePresence>
        {showSuccessPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-xl"
            >
              <div className="p-8 text-center">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                  <svg
                    className="h-10 w-10 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Pembayaran Berhasil!
                </h3>
                <p className="text-gray-600 mb-6">
                  Pesanan Anda telah berhasil diproses. Anda akan kembali ke
                  dashboard.
                </p>
                <div className="bg-purple-50 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-600">
                    No. Pesanan:{" "}
                    <span className="font-medium text-purple-600">
                      ORD-{Math.floor(Math.random() * 1000000)}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Total Pembayaran:{" "}
                    <span className="font-medium text-purple-600">
                      Rp {subtotal.toLocaleString()}
                    </span>
                  </p>
                </div>
                <div className="flex justify-center">
                  <div className="w-12 h-1.5 bg-gray-200 rounded-full animate-pulse"></div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CheckoutPage;
