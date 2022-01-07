const Discord = require('discord.js');
const ModelEconomy = require('../../models/Economy_DB.js');
const SendError = require('../../utils/error.js');
const SendEmbed = require('../../utils/embed.js');
const config = require('../../config.json');

module.exports = {

    run: async (client, message, args) => {



        let EconomyGet = await ModelEconomy.findOne({ guild: message.guild.id, user: message.author.id })

        let Cantidad = args[1];

        let Item = args[0]?.toLowerCase();

        let Minerales = {

            diamante: { emote: client.data.emotes.Minerales.MineralDiamante },
            carbon: { emote: client.data.emotes.Minerales.MineralCarbon },
            oro: { emote: client.data.emotes.Minerales.MineralOro },
            cuarzo: { emote: client.data.emotes.Minerales.MineralCuarzo },
            amatista: { emote: client.data.emotes.Minerales.MineralAmatista },
            ruby: { emote: client.data.emotes.Minerales.MineralRuby },
            esmeralda: { emote: client.data.emotes.Minerales.MineralEsmeralda },
            plata: { emote: client.data.emotes.Minerales.MineralPlata },
            cobre: { emote: client.data.emotes.Minerales.MineralCobre },
            rodio: { emote: client.data.emotes.Minerales.MineralRodio }

        }

        if (!Item) return SendError('Especifica el item\nque quieres comprar.', message)

        if (config.ITEMS[Item] === undefined) return SendError('Especifica un item\nválido para comprar', message)

        if (!Cantidad) return SendError('Especifica la cantidad de items\nque quieres comprar.', message)

        if (isNaN(Cantidad) || Cantidad.startsWith('.') || Cantidad.startsWith('-') || ['-', '.'].some(x => Cantidad.toLowerCase().includes(x))) return SendError(`Eso no es un número válido.`, message)

        let Total = parseInt(Cantidad) * config.ITEMS[Item];

        if (Total > EconomyGet.monedero) return SendError(`Necesitas ${client.data.emotes.Money} **$${parseInt(Total).toLocaleString()}** en el monedero\npara comprar esos items.`, message)

        SendEmbed(`${Item.toUpperCase()}`, `Compraste ${Minerales[Item].emote} **${parseInt(Cantidad).toLocaleString()}** \`${Item.toLowerCase()}\`\npor ${client.data.emotes.Money} **$${parseInt(Total).toLocaleString()}**.`, message)

        EconomyGet.monedero -= parseInt(Total);
        EconomyGet[Item] += parseInt(Cantidad);

        await EconomyGet.save();

    }
}