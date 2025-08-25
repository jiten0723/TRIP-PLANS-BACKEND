import dotenv from "dotenv";
import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";

dotenv.config();

export const sendMail = async (email, subject, data) => {
  const templatePath = path.join(
    process.cwd(),
    "src",
    "templates",
    "acceptInvitation.html"
  );
  let html = fs.readFileSync(templatePath, "utf8");

  html = html
    .replace("{{link}}", data.link)
    .replace("{{title}}", data.title)
    .replace("{{startDate}}", data.startDate)
    .replace("{{endDate}}", data.endDate)
    .replace("{{userName}}", data.userName);

  // const transporter = nodemailer.createTransport({
  //   host: process.env.MAIL_HOST,
  //   port: process.env.MAIL_PORT,
  //   auth: {
  //     user: process.env.MAIL_USER,
  //     pass: process.env.MAIL_PASS,
  //   },
  // });
  const transporter = nodemailer.createTransport({
    host: process.env.GOOGLE_HOST,
    // service : "gmail",
    auth: {
      user: process.env.GOOGLE_USER, // generated ethereal user
      pass: process.env.GOOGLE_PASS, // generated ethereal password
    },
  });

  const mailOptions = {
    from: process.env.MAIL_FROM,
    to: email.join(","),
    subject,
    html,
  };
  await transporter.sendMail(mailOptions);
};
