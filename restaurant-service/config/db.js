const mongoose = require('mongoose');
require('dotenv').config();

module.exports = async function connectDB() {
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('✅ MongoDB – Restaurant Service');
};
