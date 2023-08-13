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

router.post('/', upload.single('roomImage'), (req, res, next) => {
  const name = req.body.roomNo;
  const roomType = req.body.roomType;
  const servantName = req.body.servantName;
  const servantContact = req.body.servantContact;
  const roomPrice = req.body.roomPrice;
  const roomImage = req.file.filename;
  const roomDescription = req.body.roomDescription;
  const availabilityStatus = req.body.availabilityStatus;

  const data = {
    RoomNo: name,
    RoomType: roomType,
    RoomServantName: servantName,
    ServantContact: servantContact,
    RoomPrice: roomPrice,
    RoomImage: roomImage,
    RoomDescription: roomDescription,
    AvailabilityStatus: availabilityStatus,
  };

  connection.query('INSERT INTO Rooms SET ?', data, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to add room.' });
    } else {
      console.log('Data inserted');
      res.redirect("http://localhost:3000/")
    }
  });
});

module.exports = router;
