const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const deliveryRoutes = require("./routes/delivery.routes");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();
app.use("/api/deliveries", deliveryRoutes);

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => console.log(`✅ Delivery service running on port ${PORT}`));
