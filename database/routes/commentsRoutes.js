const express=require('express')
const router=express.Router()

const {getAll,getOneComment,updateComment,deleteComment,addComment}=require('../controllers/commentsController')



router.get('/',getAll)
router.get('/:id',getOneComment)
router.post('/add',addComment)
router.put('/:id',updateComment)
router.delete('/:id',deleteComment)

module.exports=router