const colors = require('colors')

const logger = {
  log(str) {
    console.log(colors.yellow('[LOG]: ' + str))
  },
  message(str) {
    console.log(colors.green('[LOG] MESSAGE: ' + str))
  },
  error(str) {
    console.log(colors.red('[LOG] ERROR: ' + str))
  },
}

module.exports = logger
