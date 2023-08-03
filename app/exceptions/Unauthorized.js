/**
 * @extends Error
 */
class Unauthorized extends Error {
  /**
   * @param  {string} message
   * @param  {string} errorCode
   * @param  {string} statusCode
   */
  constructor(message, errorCode=null) {
    super(message, errorCode);

    this.name = this.constructor.name;
    this.status = 401;
    this.message = message ?? 'Unauthorized';
    this.code = errorCode;
  }
}

module.exports = Unauthorized;
