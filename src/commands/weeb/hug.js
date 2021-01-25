const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'hug',
    description: 'Hug a friend/user in your server!',
    category: 'Fun',
    usage: 'hug <user>',
    execute(message, args, client) {
        const user = message.mentions.users.first()

        const hugGifs = [
            'https://media.giphy.com/media/od5H3PmEG5EVq/source.gif',
            `https://media.giphy.com/media/kvKFM3UWg2P04/source.gif`,
            `https://media.giphy.com/media/6njmfYCtQg3m/source.gif`,
            `https://media.giphy.com/media/VGACXbkf0AeGs/source.gif`,
            `https://media.giphy.com/media/14aBJO7py75MD6/source.gif`,
            `https://media.giphy.com/media/wSY4wcrHnB0CA/source.gif`,
            `https://media.giphy.com/media/l2QDM9Jnim1YVILXa/source.gif`,
            `https://media.giphy.com/media/wnsgren9NtITS/source.gif`,
            `https://media.giphy.com/media/143v0Z4767T15e/source.gif`,
            `https://media.giphy.com/media/svXXBgduBsJ1u/source.gif`
        ]

        const responses = [
            `Awhhhhh, ${message.author.username} has just hugged ${user.username} 🥺`,
            `${message.author.username} has hugged ${user.username}! How cute!`,
            `${user.username} has just received a hug from the one and only ${message.author.username} 🥰`,
            `${user.username}...${message.author.username} has sent you a hug!! 😊`,
            `How cute! ${user.username} has just received a hug from ${message.author.username}!`,
        ] 


        if (!user) {
            return message.channel.send(
                new MessageEmbed()
                .setDescription('Please specify a user you would like to hug! 🥰')
                .setColor('RED')
            )
        }
        if (user.bot) {
            return message.channel.send(
                new MessageEmbed()
                .setDescription('Oh come on! You cannot hug the poor bot, they are not alive 😢')
                .setColor('#de5307')
            )
        }

        var randomHug = hugGifs[Math.floor(Math.random() * hugGifs.length)];
        var randomResponse = responses[Math.floor(Math.random() * responses.length)]

        message.channel.send(
            new MessageEmbed()
            .setAuthor(randomResponse)
            .setImage(randomHug)
            .setColor('#C8A2C8')
        )
    }
}
