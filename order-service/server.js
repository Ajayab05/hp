const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🔗 MySQL Connection (LOCAL)
const db = mysql.createConnection({
  host: "admin.cjyuw6i464pl.ap-south-1.rds.amazonaws.com",
  user: "admin",
  password: "admin123",
  database: "mysql"
});

// Test DB connection
db.connect(err => {
  if (err) {
    console.error("DB connection failed:", err);
  } else {
    console.log("✅ MySQL Connected");
  }
});

// ✅ Create Order API
app.post("/create-order", (req, res) => {
  const { products, total } = req.body;

  const query = `
    INSERT INTO orders (products, total, status)
    VALUES (?, ?, ?)
  `;

  db.query(query, [JSON.stringify(products), total, "paid"], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("DB Error");
    }

    res.json({
      message: "Order saved successfully",
      orderId: result.insertId
    });
  });
});

// ✅ Get Orders API
app.get("/orders", (req, res) => {
  db.query("SELECT * FROM orders", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Start server
app.listen(6000, () => {
  console.log("🚀 Order service running on port 6000");
});