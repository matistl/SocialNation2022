const Discord = require('discord.js');

module.exports = {

    run: async (client, message, args) => {


        let messageID = args[0];

        let reasonSuggest = args.slice(1).join(' ');

        if (!message.member.permissions.has("ADMINISTRATOR")) return;

        if (!messageID) return message.reply(`${client.data.emotes.Error} | Especifica la ID de una sugerencia.`);

        let messageFetch = await client.channels.resolve(client.data.suggestChannel).messages.fetch(messageID).catch(e => { })

        if (messageFetch && messageFetch.id == null || messageFetch && messageFetch.id == undefined || !messageFetch || messageFetch.author.id !== client.user.id || !messageFetch.embeds[0] || !messageFetch.embeds[0].description.includes('Sugerencia de')) return message.reply(`${client.data.emotes.Error} | Especifica la ID válida de una sugerencia.`);

        const embed = new Discord.MessageEmbed()
            .setAuthor(messageFetch.embeds[0].author.name, messageFetch.embeds[0].author.proxyIconURL)
            .setTitle(messageFetch.embeds[0].title)
            .setDescription(messageFetch.embeds[0].description)
            .addField(`${client.data.emotes.Alert} | Estado`, `Aceptado por **${message.author.username}**`)
            .addField(`${client.data.emotes.TickGreen} | Razón`, `${reasonSuggest ? reasonSuggest : 'Sin razón.'}`)
            .setColor('6800FF')
            .setThumbnail(message.guild.iconURL({ size: 2048, dynamic: true, format: 'png' }))
            .setFooter(messageFetch.embeds[0].setFooter.text, messageFetch.embeds[0].setFooter.proxyIconURL)
            .setTimestamp();

        await messageFetch.edit({ embeds: [embed] })
    }
}