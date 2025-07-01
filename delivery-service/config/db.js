const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connecté - Delivery Service");
  } catch (err) {
    console.error("❌ Erreur Mongo:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
