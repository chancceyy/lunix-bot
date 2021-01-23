const Discord = require('discord.js')
const mongoose = require('mongoose')
const GuildSchema = require('../models/Guild')
const { globalprefix } = require('../config.json')

module.exports = async (client, message) => {
    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;

    const dbresult = await GuildSchema.findOne({guildID: message.guild.id})

    if (!dbresult) await GuildSchema.findByIdAndUpdate({
        guildID: message.guild.id
    },
    {
        guildID: message.guild.id,
        prefix: globalprefix
    },
    {
        upsert: true
    })

    const prefix = dbresult.prefix

    if(!message.content.startsWith(prefix)) return;

    const args = message.content.substring(prefix.length).split(' ')

    const command = client.commands.get(args[0])
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(args[0]))

    if (!command) return;
        
    try {
         command.execute(message, args, client)
    } catch(error) {
         console.log(error)
    }
}
