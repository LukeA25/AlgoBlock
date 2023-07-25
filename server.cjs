require("dotenv").config();

var serviceAccount = require("./algoblock-4a1c4-firebase-adminsdk-a6ks2-3cc84921c6.json");
var admin = require("firebase-admin");
const fastify = require("fastify")({ logger: true });
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const nodemailer = require("nodemailer");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://algoblock-4a1c4-default-rtdb.firebaseio.com"
});

var db = admin.database();

const emailServiceConfig = {
  service: "Gmail",
  auth: {
    user: "luke1chip@gmail.com",
    pass: process.env.GMAIL_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(emailServiceConfig);

fastify.post("/send-email", async (request, reply) => {
  try {
    const { name, email, message } = request.body;

    const mailOptions = {
      from: email,
      to: "info@algoblock.net",
      subject: "Contact Form Submission",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    await transporter.sendMail(mailOptions);
    reply.send({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    reply.code(500).send({ success: false, message: "Failed to send email." });
  }
});

fastify.post("/purchaseStrategy", (request, reply) => {
  db.ref(`/userData/${request.body.uid}/strategies/${request.body.strategyKey}/purchased`).set(true).then(() => {
    reply.send({ success: true, message: "hyyype" });
  })
  .catch((error) => {
    reply.send({ success: false, message: "not hype" });
  });
});

fastify.get("/publishable-key", () => {
  return { publishable_key: process.env.STRIPE_PUBLISHABLE_KEY };
});

fastify.post("/create-payment-intent", async () => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 999,
    currency: "usd",
    payment_method_types: ["card"],
  });

  return { client_secret: paymentIntent.client_secret };
});

const start = async () => {
  try {
    await fastify.listen(5252);
    console.log("Server listening ... ");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
