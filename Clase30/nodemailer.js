import express from "express";
import nodemailer from "nodemailer";
import twilio from "twilio";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json());
const transport = nodemailer.createTransport({
  // service: 'gmail',
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    // user: 'micorreo@gmail.com',
    // pass: 'contrasenaapp'
    user: "ransom.jast45@ethereal.email",
    pass: "hvJM7j6eDw3Hp2T8PV",
  },
});
app.get("/mail", async (req, res) => {
  const email = await transport.sendMail({
    from: "Coder <ransom.jast45@ethereal.email>",
    to: "ransom.jast45@ethereal.email",
    subject: "Hola soy un titulo!",
    html: `<h1>Bienvenido a nuestro sistema!</h1><div><p>Bienvenido</p></div>`,
    text: "esto es un fallback!",
    // attachments: []
  });
  console.log(email);
  res.send("correo enviado!");
});

app.post("/sms", async (req, res) => {
  //TWILIO_SECRET,TWILIO_SID, PHONE
  try {
    const { orderId, nombre } = req.body;
    const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_SECRET);
    const sms = await client.messages.create({
      from: "whatsapp:+18507897760",
      to: process.env.PHONE,
      body: `¡Hola ${nombre}! Tu orden #${orderId} se encuentra confirmada. Hemos enviado tu factura al correo`,
    });
    console.log(sms);
    res.send({ ok: true });
  } catch (e) {
    res.send({ err: e.message });
  }
});

app.listen(8081, () => console.log("conectados"));
