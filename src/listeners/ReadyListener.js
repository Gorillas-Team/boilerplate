const { Listener } = require('../structure/')

module.exports = class ReadyListener extends Listener {
  constructor () {
    super({
      name: 'ready',
      once: true
    })
  }

  run () {
    console.log(this.user.username, 'is ready to use.')
  }
}
