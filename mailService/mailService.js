"use strict";

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD
  }
});

/* Return's true if the email sent succesfully and false otherwise */
async function sendEmail (recipient, subject, text, html) {
  const message = {
    from: process.env.EMAIL_ADDRESS,
    to: recipient,
    subject: subject,
    text: text,
    html: html
  };
  try {
    await transporter.sendMail(message);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
 }

const text = (
    "We appreciate that you accept our newsletter!\n\n" + 
    `Use this link to create an account: ${process.env.URL}/register`
);
  
const html = (
    "<h1 style=\"margin-bottom: 1rem;\">We appreciate that you accept our newsletter!</h1>" +
    "<p>" +
      `Click <a href="${process.env.URL}/register">here</a> to create an account!` +
    "</p>"
);

async function sendNewsLetter (to) {
    const emailSent = await sendEmail(to, "Welcome to Our Newsletter", text, html);
    if (emailSent) {
        console.log("Email was sent successfully");
    } else {
        console.log("Failed sending email...");
    }
}
  
module.exports = {
    sendNewsLetter
}