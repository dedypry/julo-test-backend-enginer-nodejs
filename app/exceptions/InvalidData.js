/**
 * @extends Error
 */
class InvalidData extends Error {
  /**
   * @param  {string} message
   */
  constructor(message, errorCode=null, status=null) {
    super(message);

    this.name = this.constructor.name;
    this.code = errorCode|| 422;
    this.status = status;
    this.message = 'Invalid Input Data! ' + message? message: '';
  }
}

module.exports = InvalidData;
