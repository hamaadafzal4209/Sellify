import ejs from "ejs";
import nodemailer from "nodemailer";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Define __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sendMail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const { email, subject, template, data } = options;
  const templatePath = path.join(__dirname, "../mails", template);
  const html = await ejs.renderFile(templatePath, data);

  await transporter.sendMail({
    from: process.env.SMTP_MAIL,
    to: email,
    subject,
    html,
  });
};

export default sendMail;