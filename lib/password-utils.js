/**
 * Name: Password Utils
 * Description: Provides a way to validate passwords.
 */

const crypto = require('crypto')

function genPassword(password) {
  var salt = crypto.randomBytes(32).toString('hex')
  var genHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
    .toString('hex')

  return {
    salt: salt,
    hash: genHash,
  }
}

function validPassword(password, hash, salt) {
  let hasVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
    .toString()
}

module.exports.validPassword = validPassword
module.exports.genPassword = genPassword
