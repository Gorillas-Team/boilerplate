const { Loader } = require('../structure')
const { requireDirectory } = require('../util')

module.exports = class ListenerLoader extends Loader {
  constructor (client) {
    super(client)
    this.success = 0
    this.failed = 0

    this.critical = true
  }

  load () {
    try {
      this.initListeners()
      this.log(this.failed ? `${this.success} loaded with success and ${this.failed} failed.` : 'All loaded with success.', 'listeners')
      return true
    } catch (err) {
      console.error(err)
      return false
    }
  }

  initListeners (dir = 'src/listeners') {
    this.log('Loading listeners...', 'listeners')
    return requireDirectory({ dir }, (error, Listener) => {
      if (error) {
        console.error('Error: ' + error.message, 'error')
        return this.failed++
      }

      const listener = new Listener()
      listener.listen(this.client)
      console.info(`|  [${listener.name}] loaded.`)
      this.success++
    })
  }
}
