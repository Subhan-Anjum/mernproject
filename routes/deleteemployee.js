const express = require('express');
const router = express.Router();
const {connection}=require('../database/sql');

router.delete('/:EmployeeID',(req,res)=>{
    const EmployeeID=req.params.EmployeeID;
    console.log(EmployeeID);
    const query=`DELETE FROM Employees WHERE EmployeeID=${EmployeeID}`;
    connection.query(query,(error,results)=>{
        if(error){
            console.error('Failed to execute the query:',error);
            res.status(500).json({error:'Failed to delete employee'});
            return;
        }
        res.json({msg:'Employee deleted successfully'});
    });
}) 
module.exports=router;    