const express = require('express');
const router = express.Router();
const { transporter } = require('../nodemailer/nodemailer');
const { connection } = require('../database/sql');

router.post('/', (req, res, next) => {
    const UserID = req.body.UserID;
    const RoomID = req.body.RoomID;
    const ArrivalDate = req.body.ArrivalDate;
    const ArrivalTime = req.body.ArrivalTime;
    const DepartureDate = req.body.DepartureDate;
    const DepartureTime = req.body.DepartureTime;
    const NumChildren = req.body.NumChildren;
    const NumAdults = req.body.NumAdults;
    const PersonName = req.body.PersonName;
    const PersonEmail = req.body.PersonEmail;
    const PersonContact = req.body.PersonContact;

    const mailOption = {
        from: `Javson Hotel's Manager <subhananjum001@gmail.com>`,
        to: PersonEmail,
        subject: "Javson Hotel's room booked status Pending",
        html: `<h1>Congratulations You have successfully applied for Room wait for Manager Operations to proceed your request.</h1>
    <p>Your UserID is ${UserID}</p>
    <p>Your RoomID is ${RoomID}</p>
    <p>Your ArrivalDate is ${ArrivalDate}</p>
    <p>Your ArrivalTime is ${ArrivalTime}</p>
    <p>Your DepartureDate is ${DepartureDate}</p>
    <p>Your DepartureTime is ${DepartureTime}</p>
    <p>Your NumChildren is ${NumChildren}</p>
    <p>Your NumAdults is ${NumAdults}</p>
    <p>Your Name is ${PersonName}</p>
    <p>Your Email is ${PersonEmail}</p>`
    };
    const data = {
        UserID: UserID,
        RoomID: RoomID,
        ArrivalDate: ArrivalDate,
        ArrivalTime: ArrivalTime,
        DepartureDate: DepartureDate,
        DepartureTime: DepartureTime,
        NumChildren: NumChildren,
        NumAdults: NumAdults,
        PersonName: PersonName,
        PersonEmail: PersonEmail,
        PersonContact: PersonContact
    };
    connection.query('INSERT INTO Bookings SET ?', data, (err, result) => {
        if (err) throw err;
        else {
            console.log("Data inserted");
            res.redirect("http://localhost:3000/viewroomsinguest"); // Redirect to the home page after successful signup
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
