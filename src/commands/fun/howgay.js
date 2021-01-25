const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'howgay',
    description: 'See how gay you are or your friend!',
    usage: `howgay [user]`,
    aliases: ['🏳️‍🌈'],
    category: 'Fun',    
    async execute(message, args, client) {  
        var gayCalculator = Math.floor(Math.random() * 100) + 1;

        let member = message.mentions.users.first() || message.author

        let avatar = member.displayAvatarURL({dynamic: true})

        message.channel.send(
            new MessageEmbed()
            .setAuthor(`Omg did you hear that...`)
            .setDescription(`\n\n${member.username} is ${gayCalculator}% gay! 🏳️‍🌈 `)
            .setThumbnail(avatar)
            .setColor('#C8A2C8')
        )
    }
}
