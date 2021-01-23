const mongoose = require('mongoose')

const guildSchema = mongoose.Schema({
    guildID: {
        type: String,
        required: true,
    },prefix: {
        type: String,
    },logChannelID: {
        type: String,
    }
});

module.exports = mongoose.model('guild-settings', guildSchema)
