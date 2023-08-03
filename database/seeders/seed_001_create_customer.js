/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('customer').del()
  await knex('customer').insert([
    {
      id: 'ea0212d3-abd6-406f-8c67-868e814a2436',
      name: 'sahrulkan'
    },
  ]);
};
