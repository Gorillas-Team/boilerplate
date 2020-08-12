module.exports = class Command {
  constructor (client, options) {
    this.client = client

    this.name = options.name
    this.aliases = options.aliases || 'No aliases.'
    this.description = options.description || 'No description.'
    this.usage = options.usage || 'No usage.'
    this.category = options.category || 'General'
    this.devOnly = options.devOnly || false
  }

  preLoad (ctx) {
    if (this.devOnly && !this.client.config.owners.includes(ctx.author.id)) {
      return ctx.channel.send('Este comando se encontra disponível apenas para meus donos.')
    }

    try {
      this.run(ctx)
    } catch (error) {
      console.error(error)
    }
  }

  run () {}
}
