const Discord = require('discord.js')
const client = new Discord.Client()

const fs = require('fs')
const { token, prefix } = require('./config.json')

client.commands = new Discord.Collection()
client.cooldowns = new Discord.Collection()

const commandFiles = fs.readdirSync('./commands').filter(f => f.endsWith('.js'))
    for (const file of commandFiles) {
        const command = require(`./commands/${file}`)
        client.commands.set(command.name, command)
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

client.login(token)