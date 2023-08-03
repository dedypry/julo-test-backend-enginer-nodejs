const {Model} = require('objection');
const knex = require('./knex');

Model.knex(knex);

/**
 * @extends Model
 */
class CustomerModel extends Model {
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
    return 'customer';
  }

  static modifiers = {
    /**
     * Return minimum column
     * @param  {any} query
     */

  };


  static table = this.tableName;

  /**
   * Define relation
   * @return {Object}
   */
  static relationMappings() {
    return {};
  }
}

module.exports = CustomerModel;
