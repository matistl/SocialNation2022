const Discord = require('discord.js');

module.exports = {

    run: async (client, message, args) => {


        let SuggestString = args.join(' ');

        if (!SuggestString) return message.author.send(`${client.data.emotes.Error} | No especificaste la sugerencia!`).catch(() => { })

        if (SuggestString.length > 1900) return message.reply(`${client.data.emotes.Error} | La sugerencia no puede superar los \`1900\` caracteres.`).then(x => x.delete({ timeout: 5000 }));

        const embed = new Discord.MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
            .setTitle('__Sugerencia__')
            .setDescription(`**${client.data.emotes.Lupa} | Sugerencia de: ${message.author.tag}:** \n${SuggestString}`)
            .addField(`${client.data.emotes.Alert} | Estado`, 'En proceso')
            .setColor('36393E')
            .setThumbnail(message.guild.iconURL({ size: 2048, dynamic: true, format: 'png' }))
            .setFooter(`${client.user.username} | ${message.guild.name}`, client.user.displayAvatarURL())
            .setTimestamp()

        try {

            message.delete()

            client.channels.cache.get(client.data.suggestChannel).send({ embeds: [embed] }).then(async x => {

                await x.react(client.data.emotes.TickGreen);
                await x.react(client.data.emotes.TickRed);

            })

        } catch (E) { }
    }
}