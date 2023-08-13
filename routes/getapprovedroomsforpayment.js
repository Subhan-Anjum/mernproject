// Backend code to get approved rooms for payment based on the UserID
const express = require('express');
const router = express.Router();
const { connection } = require('../database/sql');

router.get('/', (req, res, next) => {
    const UserID = req.query.UserID; // Get UserID from the query parameter

    var query = `
        SELECT B.BookingID, R.RoomNo, R.RoomType, R.RoomPrice, B.ArrivalDate, B.DepartureDate, B.PersonName, B.PersonEmail, B.PersonContact, B.BookingStatus
        FROM Bookings B
        JOIN Rooms R ON B.RoomID = R.RoomID
        WHERE B.BookingStatus = 'Approved' AND B.UserID = ?`;

    connection.query(query, [UserID], (error, results) => {
        if (error) {
            console.error('Failed to execute the query:', error);
            console.log(UserID);
            return;
        }
        console.log('Query results:', results);
        res.send(results);
    });
});


module.exports = router;
