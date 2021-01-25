const mongoose = require('discord.js')
const GuildSchema = require('../models/Guild')

module.exports = async(client, member) => {

    const guildDB = await GuildSchema.findOne({
        guildID: member.guild.id,
    });

    const autoRole = member.guild.roles.cache.get(guildDB.autoRole)
    console.log(autoRole)

    member.roles.add(autoRole).catch(console.error);
}