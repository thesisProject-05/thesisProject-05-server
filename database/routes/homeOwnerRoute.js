const express = require('express');
const router = express.Router();
const { register, login, getOneOwnerByPhoneNumber, getHomeOwnerById, getAllOwners, getOwnerByCity, getOwnerByEmail, logout, deleteHomeOwner,getHomeOwner} = require('../controllers/homeOwnerController.js')






router.get('/all',getAllOwners);
router.get('/:id',getHomeOwnerById);
router.post('/register',register);
router.post('/login',login);
router.post('/phone', getOneOwnerByPhoneNumber);
router.post('/city', getOwnerByCity);
router.post('/email', getOwnerByEmail);
router.post('/logout',logout)
router.delete('/:id',deleteHomeOwner);

module.exports = router;