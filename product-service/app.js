require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const connect = require('./config/db');

connect();
const app = express();
app.use(cors({origin:true,credentials:true}));
app.use(express.json());

app.use('/api/products', require('./routes/product.routes'));

const PORT = process.env.PORT || 3003;
app.listen(PORT,'0.0.0.0',()=>console.log(`🏪 product-service on ${PORT}`));
