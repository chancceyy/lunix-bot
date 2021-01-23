const db = require('mongoose')
const { mongoPass, mongoUser } = require('../config.json')

const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
}

module.exports = async () => {
    console.log('Lunix bot is ONLINE!')

    await db.connect(`mongodb+srv://Chanceyy:${mongoPass}@cluster0.rudhl.mongodb.net/${mongoUser}?retryWrites=true&w=majority`, dbOptions)
    .then(console.log('MongoDB has connected!'))
    .catch(error => console.log(error))
}