const express = require('express');
const router = express.Router();
const { connection } = require('../database/sql'); // Adjust this based on your setup

// GET room details by RoomID
router.get('/:RoomID', (req, res) => {
  const { RoomID } = req.params;

  // Execute SQL query to retrieve room details by RoomID
  const query = `SELECT * FROM Rooms WHERE RoomID = ${RoomID}`; // Adjust table name as needed
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Failed to execute the query:', error);
      res.status(500).json({ error: 'Failed to fetch room details' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: 'Room not found' });
      return;
    }

    const roomDetails = results[0]; // Assuming RoomID is unique

    res.json(roomDetails);
  });
});

module.exports = router;
