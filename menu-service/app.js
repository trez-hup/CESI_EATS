const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();
const port = process.env.PORT || 3008;
const app = express();
app.use(cors());
app.use(express.json());

const menuRoutes = require('./routes/menu.routes');
app.use('/api/menus', menuRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Menu Service running on port ${process.env.PORT}`);
});
