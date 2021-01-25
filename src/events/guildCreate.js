const GuildSchema = require('../models/Guild')

module.exports = async(client, guild) => {
    try {
        const guildConfig = await GuildSchema.create({
            guildID: guild.id,
            prefix: '+'
        })
        console.log('I have joined a server!')
    } catch (error) {
        console.log(error)
    }
}