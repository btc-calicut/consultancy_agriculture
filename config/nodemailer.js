import nodemailer from "nodemailer";

const email = process.env.EMAIL;

// for mailing through Outlook

/* export const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com", // hostname
  secureConnection: false, // TLS requires secureConnection to be false
  port: 587, // port for secure SMTP
  tls: {
    ciphers: "SSLv3",
  },
  auth: {
    user: "mymail@outlook.com",
    pass: "myPassword",
  },
}); */

// for mailing through gmail
export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: email,
    pass: process.env.EMAIL_PASS,
  },
});

// template of mail to client
export const clientMailMessage = {
  from: email,
  to: "mymail@gmail.com",
};

// template of mail to BTC
export const companyMailMessage = {
  from: email,
  to: email,
};
