const Discord = require('discord.js')
const client = new Discord.Client()

const fs = require('fs')
const { token, prefix } = require('./config.json')
const glob = require('glob')
const GuildSchema = require('./models/Guild')

client.commands = new Discord.Collection()
client.cooldowns = new Discord.Collection()

const commandFiles = glob.sync('./commands/**/*.js');
for (const file of commandFiles) {
   const command = require(file);
   client.commands.set(command.name, command);
}

fs.readdir("./events", (err, files) => {
    if (err) return console.log(err)
    files.forEach(file => {
        if (!file.endsWith('.js')) return
        const event = require(`./events/${file}`)
        const eventName = file.split(".")[0]
        client.on(eventName, event.bind(null, client))
        delete require.cache[require.resolve(`./events/${file}`)]
    })
})

client.on('message', async (message) => {
    if (message.content === '+setup') {
        const serverResults = await GuildSchema.findOne({guildID: message.guild.id})

        if (serverResults) {
            return;
        }

        const doc = new GuildSchema({
            guildID: message.guild.id,
            prefix: "+"
        })

        await doc.save()
        message.channel.send('The set up is now done!')
    }
})

client.login(token)