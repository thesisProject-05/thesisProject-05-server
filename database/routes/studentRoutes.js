const express=require("express")
const router=express.Router()

const {getAllByHomeOwner,getAllByHouse,getAllByResidence,getAllByUniversity,getAll,getStudentById,
        register,deleteStudent,updateStudent,login,verifyCode,getUser,logout}=require('../controllers/studentController')
router.get('/',getAll)
router.get('/HO/:id',getAllByHomeOwner)
router.get('/H/:id',getAllByHouse)
router.get('/R/:id',getAllByResidence)
router.get('/U/:id',getAllByUniversity)
router.get('/:id',getStudentById)
router.delete('/:id',deleteStudent)
router.put('/:id',updateStudent)
router.post('/register',register)
router.post('/login',login)
router.post('/check',verifyCode)
router.get('/getU',getUser)
router.post('/logout',logout)


module.exports=router

