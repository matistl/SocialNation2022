const Mongoose = require('mongoose');

module.exports = async (client) => {

    client.user.setActivity('Developed by xUnknown#4004', { type: "WATCHING" })

    console.log(`Watching ${client.users.cache.size.toLocaleString()} users and ${client.guilds.cache.size} guilds.`)

};

