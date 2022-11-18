const express = require('express');

const router = express.Router();
const {getOneByCity,getAll,addResidence,deleteResidence,updateResidence,getOne,getOneByAdress}=require("../controllers/residenceController.js")

router.get('/',getAll);
router.post('/add',addResidence);
router.delete ('/:id',deleteResidence);
router.put("/:id",updateResidence)
router.get('/:id',getOne)
router.post('/adress',getOneByAdress)
router.post('/city',getOneByCity)


module.exports = router; 




