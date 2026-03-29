const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🔑 Replace with your real keys
const razorpay = new Razorpay({
  key_id: "rzp_test_xxxxx",
  key_secret: "your_secret_here"
});

// ✅ Create Order API
app.post("/create-order", async (req, res) => {
  const { amount } = req.body;

  try {
    const order = await razorpay.orders.create({
      amount: amount * 100, // paise
      currency: "INR"
    });

    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating order");
  }
});

app.listen(5000, () => {
  console.log("🚀 Payment service running on port 5000");
}); 

app.post("/pay", (req, res) => {
  res.json({
    status: "success",
    transactionId: "TXN123456"
  });
});