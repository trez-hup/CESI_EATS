require('dotenv').config();
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

/* -------------------------------------------------
   Helper pour créer un proxy rapidement
------------------------------------------------- */
const proxy = (route, target, extra = {}) =>
  app.use(route, createProxyMiddleware({ target, changeOrigin: true, ...extra }));

/* -------------------------------------------------
   Routes proxy
------------------------------------------------- */
proxy('/auth',        process.env.AUTH_SERVICE_URL, {
  pathRewrite: { '^/auth': '/api/auth' }        // /auth/* → /api/auth/*
});

proxy('/users',       process.env.USER_SERVICE_URL);
proxy('/restaurants', process.env.RESTAURANT_SERVICE_URL);
proxy('/menus',       process.env.MENU_SERVICE_URL);
proxy('/products',    process.env.PRODUCT_SERVICE_URL);
proxy('/orders',      process.env.ORDER_SERVICE_URL);
proxy('/delivery',    process.env.DELIVERY_SERVICE_URL);
proxy('/payments',    process.env.PAYMENT_SERVICE_URL);
proxy('/notifications', process.env.NOTIFICATION_SERVICE_URL);
proxy('/reviews',     process.env.REVIEW_SERVICE_URL);

/* -------------------------------------------------
   Démarrage
------------------------------------------------- */
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () =>
  console.log(`🔀 API Gateway running on port ${PORT}`)
);
