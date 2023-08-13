const express = require('express');
const router = express.Router();
const {connection}=require('../database/sql');

router.get('/',(req,res,next)=>{
var query='SELECT * from Employees';
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