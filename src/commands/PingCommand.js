const { Command } = require('../structure')

module.exports = class PingCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'ping'
    })
  }

  run ({ channel }) {
    channel.send('Pong!')
  }
}
