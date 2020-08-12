const { Client, Collection } = require('discord.js')
const Loaders = require('./loader')

module.exports = class Bot extends Client {
  constructor (options = {}) {
    super(options)
    this.token = options.token
    this.config = {
      owners: options.owners,
      prefixes: options.prefixes,
      nodes: options.nodes
    }

    this.commands = new Collection()
  }

  async initLoaders () {
    for (const Loader of Object.values(Loaders)) {
      const loader = new Loader(this)
      try {
        await loader.load()
      } catch (err) {
        console.error(err)
      }
    }
  }

  start () {
    this.initLoaders()
    super.login(this.token)
    return this
  }
}
