const nodemailer = require('nodemailer');

function transporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD }
  });
}

async function sendMail({ to, subject, text, html }) {
  const t = transporter();
  return t.sendMail({
    from: process.env.SMTP_USER,
    to,
    subject,
    text,
    html
  });
}

module.exports = { sendMail };
