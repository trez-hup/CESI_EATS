const transporter = require("../config/mail");

exports.sendEmail = async ({ to, subject, text }) => {
  const mailOptions = {
    from: `"Uber Eats Clone" <${process.env.SMTP_USER}>`,
    to,
    subject,
    text
  };

  await transporter.sendMail(mailOptions);
};
