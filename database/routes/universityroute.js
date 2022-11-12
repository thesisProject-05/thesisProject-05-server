const express = require('express');
const router =express.Router();


const {getAll,addUniversity,deleteUniversity,updateUniversity,getOne,getOneByAdress}=require("../controllers/universityController.js");
router.get('/all',getAll);
router.post('/add',addUniversity);
router.delete ('/:id',deleteUniversity);
router.put("/:id",updateUniversity)
router.get('/:id',getOne)
router.get('/:adress',getOneByAdress)



module.exports = router ;

//fixe the router//