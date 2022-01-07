const Discord = require('discord.js');

module.exports = {

    run: async (client, message, args) => {



        if (!client.data.dev.includes(message.author.id)) return;

        let folderName = args[0];

        let commandName = args[1];

        if (!folderName) return message.reply(`${client.data.emotes.Error} | Olvidaste decir el nombre de la carpeta.`)

        if (!commandName) return message.reply(`${client.data.emotes.Error} | Olvidaste decir el nombre del comando.`)

        try {

            delete require.cache[require.resolve(`../../commands/${folderName}/${commandName}.js`)]

            client.commands.delete(commandName)

            let pull = require(`../../commands/${folderName}/${commandName}.js`)

            client.commands.set(commandName, pull)

        } catch (e) {

            return message.reply(`${client.data.emotes.Error} | ${e.name}: ${e}`)

        }

        message.reply(`${client.data.emotes.TickGreen} | El comando \`${commandName.toUpperCase()}\` fue reiniciado.`)

    }
}