// api/send.js
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { nombre, apellido, email, mensaje } = req.body;

  if (!nombre || !apellido || !email || !mensaje) {
    return res.status(400).json({ message: "Todos los campos son obligatorios." });
  }

  // Configuración del transporte de Gmail
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "proyectosecundario33@gmail.com",     
      pass: "rluk xrud pwnx xvuq",          
    },
  });

  const mailOptions = {
    from: email,
    to: "davidresca9@gmail.com",         
    subject: "Nuevo mensaje desde el formulario",
    html: `
      <strong>Nombre:</strong> ${nombre}<br>
      <strong>Apellido:</strong> ${apellido}<br>
      <strong>Email:</strong> ${email}<br>
      <strong>Mensaje:</strong> ${mensaje}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "✅ Mensaje enviado correctamente." });
  } catch (error) {
    res.status(500).json({ message: "❌ Error al enviar el mensaje.", error });
  }
}
