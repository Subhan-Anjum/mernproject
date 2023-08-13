const express = require('express');
const router = express.Router();
const { connection } = require('../database/sql');

router.post('/', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  connection.query(`SELECT * FROM Users WHERE Email = '${email}' AND Password = '${password}'`, (err, result) => {
    if (err) {
      console.error('Error executing the query:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (!result || result.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const userRole = result[0].Role; // Make sure to adjust the field name if needed
    const userID = result[0].UserID; // Add this line to get the UserID

    // Send a response with the user's role, userID, and a success message
    return res.status(200).json({ Role: userRole, UserID: userID, message: 'Login successful' });
  });
});

module.exports = router;
