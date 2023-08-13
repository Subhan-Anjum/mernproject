const express = require('express');
const router = express.Router();
const { transporter } = require('../nodemailer/nodemailer');
const { connection } = require('../database/sql');

router.post('/', (req, res, next) => {
  const name = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const role = req.body.role;
  const mailOption = {
    from: `Javson Hotel's <subhananjum001@gmail.com>`,
    to: email,
    subject: "Javson Hotel's Signup",
    html: `<h1>Signup Successful. You have been registered. Don't share your credentials with others.</h1>
    <p>Your username is ${name}</p>
    <p>Your email is ${email}</p>
    <p>Your password is ${password}</p>
    <p>Your role is ${role}</p>`,
  };
  const data = {
    Username: name,
    Email: email,
    Password: password,
    Role: role,
  };
  connection.query('INSERT INTO Users SET ?', data, (err, result) => {
    if (err) throw err;
    else {
      console.log("Data inserted");
      res.redirect("http://localhost:3000"); // Redirect to the home page after successful signup
    }
  });
  transporter.sendMail(mailOption, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent");
    }
  });
});

module.exports = router;
