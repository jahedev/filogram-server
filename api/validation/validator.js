/*
 * This file will contain more general validations of strings
 * such as emails and passwords using mostly regex.
 */

const validator = {
  isEmail(email) {
    if (typeof email !== 'string') return false
    // https://stackoverflow.com/a/719543
    return /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email)
  },
  isUsername(username) {
    if (typeof username !== 'string') return false
    // https://stackoverflow.com/a/12019115
    return /^(?=[a-zA-Z0-9._]{1,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/.test(username)
  },
  isName(name) {
    if (typeof name !== 'string') return false
    return /^[A-z]+/.test(name)
  },
  isStrongPassword(password) {
    if (typeof password !== 'string') return false
    // 8 characters: at least 1 letter and 1 number
    // https://stackoverflow.com/a/21456918
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)
  },
}

module.exports = validator
