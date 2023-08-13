const express = require('express');
const router = express.Router();
const {connection}=require('../database/sql');

router.delete('/:RoomID',(req,res)=>{
    const RoomID=req.params.RoomID;
    console.log(RoomID);
    const query=`DELETE FROM Rooms WHERE RoomID=${RoomID}`;
    connection.query(query,(error,results)=>{
        if(error){
            console.error('Failed to execute the query:',error);
            res.status(500).json({error:'Failed to delete room'});
            return;
        }
        res.json({msg:'Room deleted successfully'});
    });
}) 
module.exports=router;    