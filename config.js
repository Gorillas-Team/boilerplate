module.exports = {
  // Discord options
  fetchAllMembers: true,

  // config bot
  token: process.env.TOKEN,
  owners: JSON.parse(process.env.OWNERS),
  prefixes: JSON.parse(process.env.PREFIXES),
  nodes: JSON.parse(process.env.LAVALINK_NODES)
}
