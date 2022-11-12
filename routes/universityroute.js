const express = require('express');
const router =express.Router();


const {getAll,addUniversity,deleteUniversity,updateUniversity,getOne}=require("../controllers/universityController.js");
router.get('/all',getAll);
router.post('/add',addUniversity);
router.delete ('/:id',deleteUniversity);
router.put("/:id",updateUniversity)
router.get('/:id',getOne)



module.exports = router ;

//fixe the router//