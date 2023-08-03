const { insertCustomer } = require("../services/customerService");
const { initByUid } = require("../services/walletService");
const SuccessResult = require("../utils/SuccessResult");

async function customer(req, res){
    const cs = await insertCustomer(req.body);
    const data = await initByUid(cs.id);
    return SuccessResult.make(res).send(data,'token');
}

module.exports = {
    customer
}