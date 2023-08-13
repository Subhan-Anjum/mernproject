const express = require('express');
const router = express.Router();
const { transporter } = require('../nodemailer/nodemailer');
const { connection } = require('../database/sql');

router.delete('/', async (req, res) => {
    try {
        const BookingID = req.query.BookingID;
        const BookingEmail = req.query.Email;

        const mailOption = {
            from: `Javson Hotel's Manager <subhananjum001@gmail.com>`,
            to: BookingEmail,
            subject: "Javson Hotel's Room Booking Status",
            html: `<h3>Unfortunately Your booking has been cancelled by Manager Operations due to some reasons</h3>`
        };

        const deleteQuery = `DELETE FROM Bookings WHERE BookingID = ?`;
        const deleteParams = [BookingID];

        connection.query(deleteQuery, deleteParams, (error, results) => {
            if (error) {
                console.error('Failed to execute the query:', error);
                res.status(500).json({ error: 'Failed to delete booking' });
                return;
            }

            transporter.sendMail(mailOption, (err, info) => {
                if (err) {
                    console.log('Email sending failed:', err);
                } else {
                    console.log('Email sent:', info.response);
                }
            });

            res.json({ msg: 'Booking deleted successfully' });
            console.log('Deleted');
        });
    } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

module.exports = router;
