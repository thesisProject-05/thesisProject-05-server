const express = require('express');
const router = express.Router();
const { register, login, getOneOwnerByPhoneNumber, getHomeOwnerById, getAllOwners, getOwnerByCity, getOwnerByEmail, logout, deleteHomeOwner,verifyCode, getUser} = require('../controllers/homeOwnerController.js')






router.get('/',getAllOwners);
router.get('/:id',getHomeOwnerById);
router.post('/register',register);
router.post('/login',login);
router.post('/phone', getOneOwnerByPhoneNumber);
router.post('/city', getOwnerByCity);
router.post('/email', getOwnerByEmail);
router.post('/logout',logout)
router.delete('/:id',deleteHomeOwner);
router.post('/check',verifyCode);
router.get('/getU',getUser)

module.exports = router;