const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

const SECRET_KEY = "secretkey"; // ⚠️ Gunakan dotenv untuk menyimpan key ini di produksi!

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
}

// Koneksi ke MySQL
const db = mysql.createConnection({
  host: "sql211.infinityfree.com", // host dari InfinityFree
  user: "if0_39007094", // user dari InfinityFree
  password: "1302210053", // masukkan password akun vPanel kamu
  database: "if0_39007094_ecommerce", // nama database kamu di hosting
});

// Cek koneksi database
db.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }
  console.log("✅ Connected to MySQL database.");
});

// ✅ API untuk Register User
app.post("/register", async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // Cek jika email sudah digunakan
    const checkUserQuery = "SELECT * FROM users WHERE email = ?";
    db.query(checkUserQuery, [email], async (err, results) => {
      if (results.length > 0) {
        return res.status(400).json({ message: "Email already registered" });
      }

      // Hash password sebelum menyimpan ke database
      const hashedPassword = await bcrypt.hash(password, 10);
      const query =
        "INSERT INTO users (name, email, phone, password_hash) VALUES (?, ?, ?, ?)";
      db.query(query, [name, email, phone, hashedPassword], (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Registration failed" });
        }
        res.status(201).json({ message: "User registered successfully" });
      });
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ API untuk Login User
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error" });
    }
    if (results.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = results[0];

    // Bandingkan password yang dimasukkan dengan yang ada di database
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Buat token JWT dengan durasi 1 jam
    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: "1h" });

    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  });
});

// ✅ API untuk Verifikasi Token (Autentikasi)
app.get("/verify-token", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  console.log("Received token:", token); // 🔍 Cek apakah token dikirim dengan benar

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      console.error("JWT Error:", err); // 🔍 Log detail error JWT
      return res.status(401).json({ message: "Invalid token" });
    }
    res.json({ valid: true, userId: decoded.id });
  });
});

// ✅ API untuk Mengambil Semua Produk dari Database
app.get("/products", (req, res) => {
  const query = "SELECT * FROM products"; // Ambil semua data produk
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error retrieving products:", err);
      return res.status(500).json({ message: "Failed to retrieve products" });
    }
    res.json(results);
  });
});

// ✅ API untuk Mengambil Produk berdasarkan ID
app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM products WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error retrieving product:", err);
      return res.status(500).json({ message: "Failed to retrieve product" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(results[0]);
  });
});

// ✅ Jalankan server di port 5000
app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});

// ✅ API untuk Menyimpan Pesanan
app.post("/checkout", authenticateToken, (req, res) => {
  const {
    name,
    email,
    address,
    city,
    postalCode,
    phone,
    paymentMethod,
    cartItems,
    totalAmount,
  } = req.body;

  const userId = req.user.id; // Ambil ID user dari token JWT

  // Validasi dasar
  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    return res.status(400).json({ message: "Cart is empty." });
  }

  const orderQuery = `
    INSERT INTO list_order (user_id, name, email, address, city, postal_code, phone, payment_method, total_amount, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`; // Tambahkan NOW() untuk timestamp

  db.query(
    orderQuery,
    [
      userId,
      name,
      email,
      address,
      city,
      postalCode,
      phone,
      paymentMethod,
      totalAmount,
      // created_at diisi otomatis oleh NOW()
    ],
    (err, result) => {
      if (err) {
        console.error("Gagal menyimpan pesanan:", err.message);
        return res.status(500).json({ message: "Gagal menyimpan pesanan." });
      }

      const orderId = result.insertId;

      const orderItemsQuery = `
        INSERT INTO order_items (order_id, product_id, product_name, quantity, price)
        VALUES ?`;

      const orderItemsData = cartItems.map((item) => [
        orderId,
        item.id,
        item.name,
        item.quantity,
        item.price,
      ]);

      db.query(orderItemsQuery, [orderItemsData], (err) => {
        if (err) {
          console.error("Gagal menyimpan item pesanan:", err.message);
          return res
            .status(500)
            .json({ message: "Gagal menyimpan item pesanan." });
        }

        res.status(200).json({
          message: "Pesanan berhasil disimpan.",
          orderId: orderId, // Kirim kembali orderId ke frontend
        });
      });
    }
  );
});
