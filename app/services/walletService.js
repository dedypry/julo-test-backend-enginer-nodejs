const { fn, raw } = require('objection');
const InvalidData = require('../exceptions/InvalidData');
const CustomerModel = require('../models/customer');
const WalletModel = require('../models/wallet');
const { setToken } = require('../utils/jwtToken');
const VirtualMoneyModel = require('../models/virtualMoney');

async function findCsById(id) {
  const cs = await CustomerModel.query().findById(id);
  if (!cs) throw new InvalidData('User Not Found', 401);
  return cs;
}

async function findWalletByUserId(id) {
  return await WalletModel.query().modify('showSimple').where('owned_by', id).first();
}

async function initByUid(uid) {
  const cs = await findCsById(uid);
  return setToken({
    id: cs.id,
    name: cs.name,
  });
}

async function enableDisableByUser(user, status='enabled') {
  await findCsById(user.id);
  let wallet = await findWalletByUserId(user.id);
  const dataInsert = {
    owned_by: user.id,
    status: status,
    [status == 'enabled' ? 'enabled_at':'disabled_at']: new Date().toISOString(),
    balance: wallet ? wallet.balance : 0,
  };

  if (wallet) {
    dataInsert.id = wallet.id;
  }

  return await WalletModel.query().upsertGraph(dataInsert);
}

async function disableValidateByUser(id) {
  let wallet = await findWalletByUserId(id);
  if (!wallet || wallet.status === 'disabled') throw new InvalidData('Wallet disabled');
  return wallet;
}

async function showTransactionByUser(user) {
  const wallet = await disableValidateByUser(user.id);
  return await VirtualMoneyModel.query().modify('showTranction').where('reference_id', wallet.id);
}

async function updateBalanceWalletByUser(id, amount) {
  await disableValidateByUser(id);
  await WalletModel.query()
    .update({
      balance: raw(`balance + ${amount}`),
    })
    .where('owned_by', id);

  return await findWalletByUserId(id);
}

async function addVirtualMoneyToWallet(body, user) {
  let wallet = await updateBalanceWalletByUser(user.id, body.amount);

  return await VirtualMoneyModel.query().insert({
    deposited_by: user.id,
    status: 'success',
    deposited_at: new Date().toISOString(),
    amount: body.amount,
    reference_id: wallet.id,
    type: 'DEPOSIT',
  });
}
async function withdrawalsByUser(body, user) {
  await disableValidateByUser(user.id);
  let wallet = await updateBalanceWalletByUser(user.id, -(body.amount));

  return await VirtualMoneyModel.query().insert({
    withdrawn_by: user.id,
    status: 'success',
    withdrawn_at: new Date().toISOString(),
    amount: body.amount,
    reference_id: wallet.id,
    type: 'WITHDRAWN',
  });
}

module.exports = {
  enableDisableByUser,
  initByUid,
  findWalletByUserId,
  showTransactionByUser,
  addVirtualMoneyToWallet,
  withdrawalsByUser
};
