const express = require('express');

const {
    registerUser,
    loginUser,
} = require('../controllers/auth.controller.js');

const authMiddleware = require("../middleware/auth.middleware.js");

const router = express.Router();

router.post('/register', registerUser);

router.post('/login', loginUser);


module.exports = router;