const Discord = require('discord.js');
const ModelEconomy = require('../../models/Economy_DB.js');
const SendError = require('../../utils/error.js');
const SendEmbed = require('../../utils/embed.js');


module.exports = {

    run: async (client, message, args) => {


        let Bank = client.data.emotes.Bank;

        let Array = ['CARA', 'CRUZ'];

        let Random = Array[Math.floor(Math.random() * Array.length)];

        let embed = new Discord.MessageEmbed()
            .setTitle(`▸  ${Bank} ┇  COIN`)
            .setDescription(`**Tirando la moneda...**`)
            .setColor('6800FF')

        message.reply({ embeds: [embed] }).then(x => {

            setTimeout(() => {

                let embed = new Discord.MessageEmbed()
                    .setTitle(`▸  ${Bank} ┇  COIN`)
                    .setDescription(`**${message.author.toString()}** Tiró la moneda y salió ${client.data.emotes.Money} \`${Random}\``)
                    .setColor('6800FF')

                x.edit({ embeds: [embed] })

            }, 3000)
        })

    }

}