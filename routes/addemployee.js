const express = require('express');
const router = express.Router();
const { connection } = require('../database/sql');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post('/', upload.single('empimage'), (req, res, next) => {
  const name = req.body.employeeName;
  const img = req.file.filename;
  const cnic = req.body.cnic;
  const contact = req.body.contact;
  const email = req.body.email;
  const salary = req.body.salary;

  const data = {
    EmployeeName: name,
    Image: img,
    CNIC: cnic,
    Contact: contact,
    Email: email,
    Salary: salary,
  };

  connection.query('INSERT INTO Employees SET ?', data, (err, result) => {
    if (err) {
      console.error(err);
      res.sendStatus(500); // Send a server error status back to the frontend
    } else {
      console.log('Data inserted');
      res.sendStatus(200); // Send a success status back to the frontend
    }
  });
});

module.exports = router;
