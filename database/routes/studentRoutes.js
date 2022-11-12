const express=require("express")
const router=express.Router()

const {getAllByHomeOwner,getAllByHouse,getAllByResidence,getAllByUniversity,getAll,getStudentById,
        register,deleteStudent,updateStudent,login}=require('../controllers/studentController')
router.get('/All',getAll)
router.get('/HO/:id',getAllByHomeOwner)
router.get('/H/:id',getAllByHouse)
router.get('/R/:id',getAllByResidence)
router.get('/U/:id',getAllByUniversity)
router.get('/:id',getStudentById)
router.delete('/:id',deleteStudent)
router.put('/:id',updateStudent)
router.post('/register',register)
router.post('/login',login)

module.exports=router

