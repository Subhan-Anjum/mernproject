const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "bjg4dkgtblad1loyizdg-mysql.services.clever-cloud.com",
  user: "uou0y2m0339dq3pm",
  password: "JI3o9Qxi3xi2bbpfbjgV",
  database: "bjg4dkgtblad1loyizdg",
  port: "3306",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Database Connected!");
});

module.exports = {connection};