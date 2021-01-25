const GuildSchema = require("../../models/Guild")
const { MessageEmbed } = require('discord.js')
module.exports = {
    name: 'setprefix',
    description: 'Set a prefix for your server.',
    usage: `prefix <prefix>`,
    permissions: 'ADMINISTATOR',
    category: 'Config',    
    async execute(message, args, client) {  
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(
            new MessageEmbed()
            .setColor('RED')
            .setDescription(`Only people with \`ADMINISTRATOR\` can do that!`)
        )
        if (!args[1]) return message.channel.send(
            new MessageEmbed()
            .setColor('RED')
            .setDescription('Please specify a prefix you want to change it too!')
        )
        if (args[1].length > 3) return message.channel.send(
            new MessageEmbed()
            .setColor('RED')
            .setDescription('The prefix can not be more than 3 letters!')
        )

        await GuildSchema.findOneAndUpdate(
        {
            guildID: message.guild.id,
        },
        {
            guildID: message.guild.id,
            prefix: args[1],
        },
        {   
            upsert: true
        });

        message.channel.send(`You new prefix is: \`${args[1]}\``)
    }
}
