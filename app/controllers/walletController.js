const walletService = require('../services/walletService');
const SuccessResult = require('../utils/SuccessResult');

async function init(req, res) {
  const data = await walletService.initByUid(req.body.customer_xid);
  return SuccessResult.make(res).send(data, 'token');
}

async function enable(req, res) {
  const data = await walletService.enableDisableByUser(req.user);
  return SuccessResult.make(res).send(data, 'wallet');
}
async function disable(req, res) {
  const data = await walletService.enableDisableByUser(req.user, 'disabled');
  return SuccessResult.make(res).send(data, 'wallet');
}

async function balance(req, res) {
  const data = await walletService.findWalletByUserId(req.user.id);
  return SuccessResult.make(res).send(data, 'wallet');
}

async function transactions(req, res) {
  const data = await walletService.showTransactionByUser(req.user);
  return SuccessResult.make(res).send(data,'transactions');
}
async function deposit(req, res) {
  const data = await walletService.addVirtualMoneyToWallet(req.body, req.user);
  return SuccessResult.make(res).send(data,'deposit');
}
async function withdrawals(req, res) {
  const data = await walletService.withdrawalsByUser(req.body, req.user);
  return SuccessResult.make(res).send(data,'withdrawal');
}

module.exports = {
  init,
  enable,
  balance,
  transactions,
  deposit,
  withdrawals,
  disable
};
