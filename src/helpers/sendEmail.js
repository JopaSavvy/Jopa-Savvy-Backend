const nodemailer = require("nodemailer");
const {EMAIL, EMAIL_PASSWORD} = require("../utils/secrets")
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL,
    pass: EMAIL_PASSWORD,
  },
});

const sendWelcomeMail = (name, email, callback) => {
  let mailOptions = {
    from: EMAIL,
    to: email,
    subject: "JOPA SAVVY",
    text: `Welcome to our site, ${name}. Let me know how you get along with the app`,
  };

  transporter.sendMail(mailOptions);
};

const sendGoodbyeMail = (name, email) => {
  let mailOptions = {
    from: EMAIL,
    to: email,
    subject: "JOPA SAVVY",
    text: `Goodbye, ${name}. I hope to see you sometime soon.`,
  };

  transporter.sendMail(mailOptions);
};

module.exports = {
  sendWelcomeMail,
  sendGoodbyeMail,
};
