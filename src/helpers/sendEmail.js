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
    subject: "Thanks for joining in!",
    text: `Welcome to our Task management app, ${name}. Let me know how you get along with the app`,
  };

  transporter.sendMail(mailOptions);
};

const sendGoodbyeMail = (name, email) => {
  let mailOptions = {
    from: EMAIL,
    to: email,
    subject: "Sorry to see you go!",
    text: `Goodbye, ${name}. I hope to see you sometime soon.`,
  };

  transporter.sendMail(mailOptions);
};

module.exports = {
  sendWelcomeMail,
  sendGoodbyeMail,
};
