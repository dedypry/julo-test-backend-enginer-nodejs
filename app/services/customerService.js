const CustomerModel = require("../models/customer");

async function insertCustomer(body){
    return await CustomerModel.query().insert({
        name: body.name
    })
}

module.exports = {
    insertCustomer
}