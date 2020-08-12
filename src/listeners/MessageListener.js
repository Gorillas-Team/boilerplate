const { Listener, CommandContext } = require('../structure')
const { getPrefix } = require('../util')

module.exports = class MessageListener extends Listener {
  constructor () {
    super({
      name: 'message'
    })
  }

  run (message) {
    if (message.author.bot || message.channel.type !== 'text') return

    const prefix = getPrefix(message)
    if (!prefix) return

    const args = message.content.slice(prefix.length).trim().split('/ +/g')
    const cmd = args.shift().toLowerCase()
    const command = this.commands.find(({ name, aliases }) => name === cmd || aliases.includes(cmd))

    const context = new CommandContext(message, args, cmd, prefix)

    if (command) command.preLoad(context)
  }
}
