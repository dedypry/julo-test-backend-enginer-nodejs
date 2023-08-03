const { Model, raw } = require('objection');
const knex = require('./knex');

Model.knex(knex);

/**
 * @extends Model
 */
class WalletModel extends Model {
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
    return 'wallet';
  }

  static get modifiers() {
    return {
      showSimple(query) {
        query.select(
          'id',
          'owned_by',
          'status',
          'enabled_at',
          raw('balance::Float').as('balance')
          );
      },
    };
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

module.exports = WalletModel;
