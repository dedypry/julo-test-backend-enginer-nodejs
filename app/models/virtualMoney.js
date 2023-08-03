const {Model, raw} = require('objection');
const knex = require('./knex');

Model.knex(knex);

/**
 * @extends Model
 */
class VirtualMoneyModel extends Model {
  /**
   * create action before insert in database
   */
  $beforeInsert() {
    this.created_at = new Date().toISOString();
  }

  /**
   * create action before update in database
   */
  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }

  /**
   * It returns table name
   * @return {string} The table name
   */
  static get tableName() {
    return 'virtual_money';
  }

 static get modifiers(){
  return {
    showTranction(query){
      query.select(
        'id',
        'deposited_by',
        'status',
        'deposited_at',
        raw('amount::FLOAT').as('amount'),
        'reference_id'
      )
    }
  }
 }

  static table = this.tableName;

  /**
   * Define relation
   * @return {Object}
   */
  static relationMappings() {
    return {};
  }
}

module.exports = VirtualMoneyModel;
