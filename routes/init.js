var express = require('express');
const { handlerException } = require('../app/exceptions/handler');
var router = express.Router();
const walletController = require('../app/controllers/walletController');
const customerController = require('../app/controllers/customerController');
const { initValidation, csValidation } = require('../app/validations/walletValidation');

/* GET home page. */
router.post('/init', handlerException(initValidation), handlerException(walletController.init));
router.post('/customer', handlerException(csValidation), handlerException(customerController.customer));

module.exports = router;
