const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const reviewRoutes = require("./routes/review.routes");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();
app.use("/api/reviews", reviewRoutes);

const PORT = process.env.PORT || 3008;
app.listen(PORT, () => console.log(`✅ Review service running on port ${PORT}`));
