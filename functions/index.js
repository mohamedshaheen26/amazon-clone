const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const express = require("express");
const cors = require("cors");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));

app.use(express.json());

app.post("/payments/create", async (req, res) => {
  const total = req.body.total;

  console.log("Payment Request Received! Amount >>>", total);

  if (!total) {
    return res.status(400).send({ error: "Missing total amount" });
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });

  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

exports.api = onRequest(app);
