const Discord = require('discord.js');
const ModelEconomy = require('../../models/Economy_DB.js');
const SendError = require('../../utils/error.js');
const SendEmbed = require('../../utils/embed.js');
const config = require('../../config.json');

module.exports = {

    run: async (client, message, args) => {


        let Array = [

            `${client.data.emotes.Minerales.MineralDiamante} **__Diamante__** \`💵 ${config.ITEMS.diamante.toLocaleString()}\``,
            `${client.data.emotes.Minerales.MineralCarbon} **__Carbón__** \`💵 ${config.ITEMS.carbon.toLocaleString()}\``,
            `${client.data.emotes.Minerales.MineralOro} **__Oro__** \`💵 ${config.ITEMS.oro.toLocaleString()}\``,
            `${client.data.emotes.Minerales.MineralCuarzo} **__Cuarzo__** \`💵 ${config.ITEMS.cuarzo.toLocaleString()}\``,
            `${client.data.emotes.Minerales.MineralAmatista} **__Amatista__** \`💵 ${config.ITEMS.amatista.toLocaleString()}\``,
            `${client.data.emotes.Minerales.MineralRuby} **__Ruby__** \`💵 ${config.ITEMS.ruby.toLocaleString()}\``,
            `${client.data.emotes.Minerales.MineralEsmeralda} **__Esmeralda__** \`💵 ${config.ITEMS.esmeralda.toLocaleString()}\``,
            `${client.data.emotes.Minerales.MineralPlata} **__Plata__** \`💵 ${config.ITEMS.plata.toLocaleString()}\``,
            `${client.data.emotes.Minerales.MineralCobre} **__Cobre__** \`💵 ${config.ITEMS.cobre.toLocaleString()}\``,
            `${client.data.emotes.Minerales.MineralRodio} **__Rodio__** \`💵 ${config.ITEMS.rodio.toLocaleString()}\``

        ]

        SendEmbed('ITEMS', Array.join('\n'), message);


    }

}
