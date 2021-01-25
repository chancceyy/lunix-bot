const GuildSchema = require("../../models/Guild")
const { MessageEmbed } = require('discord.js')
module.exports = {
    name: 'setmuterole',
    description: 'Set a muted role for your server.',
    usage: `setmuterole <role>`,
    permissions: 'ADMINISTATOR',
    category: 'Config',    
    async execute(message, args, client) {  
        const muteRole = message.mentions.roles.first()

        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(
            new MessageEmbed()
            .setColor('RED')
            .setDescription(`Only people with \`ADMINISTRATOR\` can do that!`)
        )
        if (!muteRole) return message.channel.send(
            new MessageEmbed()
            .setColor('RED')
            .setDescription('Please specify a prefix you want to change it too!')
        )

        await GuildSchema.findOneAndUpdate(
        {
            guildID: message.guild.id,
        },
        {
            guildID: message.guild.id,
            mutedRole: muteRole.id,
        })

        message.channel.send(`You muted role is now: ${muteRole}`)
    }
}