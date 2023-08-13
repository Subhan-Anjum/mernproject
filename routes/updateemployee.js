const express = require('express');
const router = express.Router();
const { connection } = require('../database/sql');

// PUT request to update employee details
router.put("/:EmployeeID", (req, res) => {
  const { EmployeeID } = req.params;
  const updatedEmployee = req.body; // Assuming the request body contains updated employee details

  // Validate and sanitize the input as needed before updating the database

  connection.query(
    "UPDATE Employees SET EmployeeName=?, CNIC=?, Contact=?, Email=?, Salary=? WHERE EmployeeID=?",
    [
      updatedEmployee.EmployeeName,
      updatedEmployee.CNIC,
      updatedEmployee.Contact,
      updatedEmployee.Email,
      updatedEmployee.Salary,
      EmployeeID,
    ],
    (error, results) => {
      if (error) {
        console.error("Error updating employee:", error);
        res.status(500).json({ msg: "Failed to update employee" });
      } else {
        res.status(200).json({ msg: "Employee updated successfully" });
      }
    }
  );
});

module.exports = router;
