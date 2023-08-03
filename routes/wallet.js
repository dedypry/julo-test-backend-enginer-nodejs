const express = require('express');
const { handlerException } = require('../app/exceptions/handler');
const { auth } = require('../app/middleware/auth');
const routes = new express.Router();
const walletController = require('../app/controllers/walletController');
const { depositValidation } = require('../app/validations/walletValidation');

/* GET home page. */
routes.group('/wallet', (router) => {
  router.post('/', auth(), handlerException(walletController.enable));
  router.get('/', auth(), handlerException(walletController.balance));
  router.get('/transactions', auth(), handlerException(walletController.transactions));
  router.post('/deposits', auth(), handlerException(depositValidation), handlerException(walletController.deposit));
  router.patch('/withdrawals', auth(), handlerException(depositValidation), handlerException(walletController.withdrawals));
  router.patch('/', auth(),  handlerException(walletController.disable));
});
module.exports = routes;
