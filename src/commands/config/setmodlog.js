const GuildSchema = require("../../models/Guild")
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'setmodlog',
    description: 'Set a modlog for your server.',
    usage: `setmodlog <channel>`,
    permissions: 'ADMINISTATOR',
    category: 'Config',
    async execute(message, args, client) {  
        const channel = message.mentions.channels.first()

        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(
            new MessageEmbed()
            .setColor('RED')
            .setDescription('Only people with \`ADMINISTRATOR\` can do that!')
        )
        if (!channel) return message.channel.send(
            new MessageEmbed()
            .setColor('RED')
            .setDescription('Please specify a modlog channel you want to set!')
        )

        await GuildSchema.findOneAndUpdate(
            {
                guildID: message.guild.id,
            },
            {
                guildID: message.guild.id,
                logChannelID: channel.id,
            })

        message.channel.send(`You modlog channel is now: ${channel}`)
    }
}