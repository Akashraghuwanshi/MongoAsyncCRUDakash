
const express = require('express');

const router = express.Router();

const authorizationController = require('../controllers/authorizationController');

router.post('/',authorizationController.handleLogin);

module.exports =router;