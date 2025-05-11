const express = require('express');
const { register, login, updateUser, deleteUser, getUser } = require('../controllers/authController'); // Import getUser

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.delete('/:id', deleteUser); 
router.put('/:id', updateUser);
router.get('/:id', getUser);

module.exports = router;