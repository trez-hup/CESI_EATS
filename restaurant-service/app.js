require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const connect = require('./config/db');

connect();
const app = express();
app.use(cors({origin:true,credentials:true}));
app.use(express.json());

app.use('/api/restaurants', require('./routes/restaurant.routes'));

const PORT = process.env.PORT || 3003;
app.listen(PORT,'0.0.0.0',()=>console.log(`🏪 Restaurant-service on ${PORT}`));
