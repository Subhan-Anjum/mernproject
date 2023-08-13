const express = require('express');
const router = express.Router();
const { connection } = require('../database/sql');

// PUT request to update room details
router.put("/:RoomID", (req, res) => {
  const { RoomID } = req.params;
  const updatedRoom = req.body; // Assuming the request body contains updated room details

  // Validate and sanitize the input as needed before updating the database

  connection.query(
    "UPDATE Rooms SET RoomType=?, RoomServantName=?, ServantContact=?, RoomPrice=?, AvailabilityStatus=?, RoomDescription=? WHERE RoomID=?",
    [
      updatedRoom.RoomType,
      updatedRoom.RoomServantName,
      updatedRoom.ServantContact,
      updatedRoom.RoomPrice,
      updatedRoom.AvailabilityStatus,
      updatedRoom.RoomDescription,
      RoomID,
    ],
    (error, results) => {
      if (error) {
        console.error("Error updating room:", error);
        res.status(500).json({ msg: "Failed to update room" });
      } else {
        res.status(200).json({ msg: "Room updated successfully" });
      }
    }
  );
});

module.exports = router;
