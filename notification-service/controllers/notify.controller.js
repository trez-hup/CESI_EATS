const { sendEmail } = require("../services/mailer");

exports.sendNotification = async (req, res) => {
  const { to, subject, text } = req.body;

  try {
    await sendEmail({ to, subject, text });
    res.status(200).json({ message: "Email envoyé !" });
  } catch (error) {
    console.error("❌ Erreur envoi email:", error);
    res.status(500).json({ error: "Échec de l'envoi" });
  }
};
