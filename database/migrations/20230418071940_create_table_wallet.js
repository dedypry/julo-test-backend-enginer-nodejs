
exports.up = async function(knex) {
  await knex.schema.createTable('wallet', (table)=> {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.uuid('owned_by', 50).references('id').inTable('customer');
    table.string('status', 10).defaultTo('enabled');
    table.timestamp('enabled_at')
    table.timestamp('disabled_at')
    table.decimal('balance',10,2)
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};


exports.down = function(knex) {

};
