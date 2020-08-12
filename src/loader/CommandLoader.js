const { Loader } = require('../structure')
const { requireDirectory } = require('../util')

module.exports = class CommandLoader extends Loader {
  constructor (client) {
    super(client)
    this.success = 0
    this.failed = 0

    this.critical = true
  }

  load () {
    try {
      this.initCommands()
      this.log(this.failed ? `${this.success} loaded with success and ${this.failed} failed.` : 'All loaded with success.', 'commands')
      return true
    } catch (e) {
      this.logError(e.stack, 'commands')
      return false
    }
  }

  initCommands (dir = 'src/commands') {
    this.log('Loading commands...', 'commands')
    return requireDirectory({ dir }, (error, Command) => {
      if (error) {
        this.logError('Error: ' + error.message, 'error')
        return this.failed++
      }

      const command = new Command(this.client)

      this.client.commands.set(command.name, command)
      console.info(`|  [${command.category}] [${command.name}] loaded.`)
      this.success++
    })
  }
}
