const GuildSchema = require("../../models/Guild")
const { MessageEmbed } = require('discord.js')
module.exports = {
    name: 'setautorole',
    description: 'Set a role for new.',
    usage: `setautorole <role>`,
    permissions: 'ADMINISTATOR',
    category: 'Config',    
    async execute(message, args, client) {  
        const autoRole = message.mentions.roles.first()

        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(
            new MessageEmbed()
            .setColor('RED')
            .setDescription(`Only people with \`ADMINISTRATOR\` can do that!`)
        )
        if (!autoRole) return message.channel.send(
            new MessageEmbed()
            .setColor('RED')
            .setDescription('Please specify a role you want to change it too!')
        )

        await GuildSchema.findOneAndUpdate(
        {
            guildID: message.guild.id,
        },
        {
            guildID: message.guild.id,
            autoRole: autoRole.id,
        })

        message.channel.send(`Your auto role is now: ${autoRole}`)
    }
}