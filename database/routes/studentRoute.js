const express=require("express")
const router=express.Router()

const {register,getAllByHomeOwner,getAllByHouse,getAllByResidence,getAllByUniversity,getAll}=require('../controllers/studentController')
router.get('/All',getAll)
router.get('/:id',getAllByHomeOwner)
router.get('/:id',getAllByHouse)
router.get('/:id',getAllByResidence)
router.get('/:id',getAllByUniversity)
router.post('/add',register)

module.exports=router