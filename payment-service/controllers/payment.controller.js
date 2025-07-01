const stripe = require("../config/stripe");

exports.createCheckoutSession = async (req, res) => {
  const { items, orderId } = req.body;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: items.map(item => ({
      price_data: {
        currency: "eur",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    })),
    mode: "payment",
    success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    metadata: { orderId },
  });

  res.json({ url: session.url });
};

// Webhook Stripe
exports.handleWebhook = async (req, res) => {
  const event = req.body;

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const orderId = session.metadata.orderId;

    console.log(`✅ Paiement validé pour la commande ${orderId}`);
    // TODO: notifier le Order Service via HTTP ou Event Bus
  }

  res.sendStatus(200);
};
