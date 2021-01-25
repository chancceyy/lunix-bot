const { MessageEmbed } = require('discord.js')
const GuildSchema = require('../../models/Guild')

module.exports = {
    name: 'help',
    description: 'Shows the help command!',
    category: 'Utils',
    async execute(message, args, client) {
        const name = args[1]
        const command = client.commands.get(name)

        const guildDB = await GuildSchema.findOne({
            guildID: message.guild.id,
        });

        const prefix = guildDB.prefix

        var data = []

        if (!command) {
            const helpEmbed = new MessageEmbed()
            .setAuthor(`These are all of the commands! | Prefix ${prefix}`)
            .addFields(
                { name: 'Utils', value: 'help, ping' },
                { name: 'Moderation', value: 'Coming Soon!' },
                { name: 'Config', value: 'setmodlog, prefix' }, 
            )
            .setFooter(`More commands to come! / ${prefix}help [command-name]`)
            .setColor('#C8A2C8')

            return message.channel.send(helpEmbed)
        }

        if (command.description) {
            data.push(`**Description:** ${command.description}`)
        } else {
            data.push(`**Description:** None set!`)
        }
        if (command.aliases) {
            data.push(`**Aliases:** ${command.aliases.join(', ')}`)
        } else {
            data.push(`**Aliases:** None!`)
        }
        if (command.permissions) {
            data.push(`**Permission(s):** ${command.permissions}`)
        } else {
            data.push('**Permission(s):** None!')
        }
        if (command.category) {
            data.push(`**Category:** ${command.category}`)
        } else {
            data.push('**Category:** None!')
        }
        if (command.usage) {
            data.push(`**Usage:** ${prefix}${command.usage}`)
        } else {
            data.push(`**Usage:** None!`)
        }

        const commandEmbed = new MessageEmbed()
        .setAuthor(`${command.name.toUpperCase()} COMMAND INFO!`)
        .setDescription(data, { split: true })
        .setColor('#C8A2C8')

        return message.channel.send(commandEmbed)
    }
}
