const express = require('express');
const router = express.Router();
const { connection } = require('../database/sql');

// Route to get the logged-in user's UserID
router.get('/getloggedinuserid', (req, res) => {
    if (req.isAuthenticated()) {
      const Email = req.Users.Email; // Change this to the actual property name in your user object
      const query = 'SELECT UserID FROM Users WHERE Email = ?';
  
      connection.query(query, [Email], (error, results) => {
        if (error) {
          console.error('Error fetching UserID:', error);
          res.status(500).json({ message: 'Internal server error' });
        } else {
          if (results.length > 0) {
            const UserID = results[0].UserID;
            res.status(200).json({ UserID });
          } else {
            res.status(404).json({ message: 'User not found' });
          }
        }
      });
    } else {
      // If user is not authenticated, send an error
      res.status(401).json({ message: 'User not authenticated' });
    }
  });
  
  module.exports = router;
