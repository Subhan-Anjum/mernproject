const express = require('express');
const router = express.Router();
const { connection } = require('../database/sql');

router.get('/', (req, res, next) => {
  var query = 'SELECT * FROM Rooms WHERE AvailabilityStatus = 1';
  connection.query(query, (error, results, fields) => {
    if (error) {
      console.error('Failed to execute the query:', error);
      return res.status(500).json({ error: 'Failed to fetch rooms' });
    }
    console.log(results);
    res.send(results);
  });
});

module.exports = router;
