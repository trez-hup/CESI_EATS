const express = require("express");
const cors = require("cors");
require("dotenv").config();
const paymentRoutes = require("./routes/payment.routes");

const app = express();

// Stripe webhook requires raw body
app.use("/api/payments/webhook", paymentRoutes); // use raw
app.use(cors());
app.use(express.json());
app.use("/api/payments", paymentRoutes); // use JSON

const PORT = process.env.PORT || 3006;
app.listen(PORT, () => console.log(`✅ Payment service running on port ${PORT}`));
