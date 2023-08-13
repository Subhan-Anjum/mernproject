//code to get all bookings
const express = require('express');
const router = express.Router();
const {connection}=require('../database/sql');

router.get('/',(req,res,next)=>{
    var query = `
    SELECT
      R.RoomNo,
      B.PersonEmail,
      B.PersonName,
      R.RoomType,
      B.PersonContact,
      B.ArrivalDate,
      B.DepartureDate,
      B.BookingStatus,
      B.BookingID
    FROM
      Bookings B
    JOIN
      Rooms R ON B.RoomID = R.RoomID
    WHERE
      B.BookingStatus = 'Pending'
  `;
connection.query(query, (error, results, fields) => {
    if (error) {
      console.error('Failed to execute the query:', error);
      return;
    }
    console.log(results);
    res.send(results);
  });
})
module.exports = router;