const { application } = require('express');
const express=require('express');
const router=express.Router();
const {addHouse,getOneHouse,getOwnerHouses,deleteHouse,
    getAllHouses,updateHouse}= require("../controllers/houseController.js");

   router.post("/add",addHouse)
   router.get("/:id",getOneHouse)
   router.get("/owner/:id",getOwnerHouses)
   router.delete("/:id",deleteHouse)
   router.get("/",getAllHouses)
   router.put("/:", updateHouse)

    
    
    
    module.exports=router;