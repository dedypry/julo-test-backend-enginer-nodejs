
exports.up = async function(knex) {
  await knex.schema.createTable('virtual_money', (table)=> {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.uuid('deposited_by').references('id').inTable('customer');
    table.string('status',10);
    table.enu('type',['DEPOSIT','WITHDRAWN'])
    table.timestamp('deposited_at');
    table.timestamp('withdrawn_at');
    table.uuid('withdrawn_by').references('id').inTable('customer');
    table.decimal('amount', 10,2);
    table.uuid('reference_id').references('id').inTable('wallet');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};


exports.down = function(knex) {

};
