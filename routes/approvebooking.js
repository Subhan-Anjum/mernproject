const express = require('express');
const router = express.Router();
const { transporter } = require('../nodemailer/nodemailer');
const { connection } = require('../database/sql');

router.put('/', async (req, res) => {
    try {
        const BookingID = req.query.BookingID;
        const BookingEmail = req.query.Email;
        const updateQuery = `UPDATE Bookings SET BookingStatus = 'Approved' WHERE BookingID = ?`;
        const updateParams = [BookingID];

        const mailOption = {
            from: `Javson Hotel's Manager <subhananjum001@gmail.com>`,
            to: BookingEmail,
            subject: "Javson Hotel's Room Booking Status",
            html: `<h3>Congratulations Your booking has been approved by Manager Operations. Kindly do your payment to get booked😊. Thanks in Advance</h3>`
        };


        connection.query(updateQuery, updateParams, (error, results) => {
            if (error) {
                console.error('Failed to update booking status:', error);
                res.status(500).json({ error: 'Failed to update booking status' });
                return;
            }

            res.json({ msg: 'Booking approved successfully' });
            console.log('Booking Approved');
        });
        // send email here
        transporter.sendMail(mailOption, (err, info) => {
            if (err) {
                console.log('Email sending failed:', err);
            } else {
                console.log('Email sent:', info.response);
            }
        });
    } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

module.exports = router;
