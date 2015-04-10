/**
 * Prevent gulp watch to be stopped on errors.
 *
 * @param object error
 */
module.exports = function (error) {

  console.log(error.toString());
  this.emit('end');

};
