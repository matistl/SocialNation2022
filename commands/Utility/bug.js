const Discord = require('discord.js');
const ModelEconomy = require('../../models/Economy_DB.js');
const SendError = require('../../utils/error.js');
const SendEmbed = require('../../utils/embed.js');


module.exports = {

    run: async (client, message, args) => {


        let suggest = args.join(' ');

        const Embed = new Discord.MessageEmbed()
            .setTitle("Sugerencia de " + message.author.tag)
            .setDescription(suggest || 'Sin sugerencia')
            .setColor("6800FF")


            (await client.users.fetch(client.data.dev)).send({ embeds: [Embed] }).catch(() => null);

        message.delete().catch(() => null)

    }

}