const Discord = require('discord.js');
const ModelEconomy = require('../../models/Economy_DB.js');
const SendError = require('../../utils/error.js');
const SendEmbed = require('../../utils/embed.js');

module.exports = {

    run: async (client, message, args) => {


        let user = message.mentions.users.first();

        let Item = args[0]?.toLowerCase();

        let Cantidad = args[1];

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

        if (!Item) return SendError('Especifica el item\nque quieres vender.', message)

        if (config.ITEMS[Item] === undefined) return SendError('Especifica un item\nválido para comprar', message)

        if (!Cantidad) return SendError('Especifica una cantidad\npara transferirle a un usuario.', message);

        if (isNaN(Cantidad) || Cantidad.startsWith('.') || Cantidad.startsWith('-') || ['-', '.'].some(x => Cantidad.toLowerCase().includes(x))) return SendError('Especifica un\nnúmero válido', message)

        if (!user) return SendError('Menciona a un usuario\npara darle dinero.', message)

        let EconomyGet_Author = await ModelEconomy.findOne({ guild: message.guild.id, user: message.author.id })

        let EconomyGet_Mention = await ModelEconomy.findOne({ guild: message.guild.id, user: user.id })

        if (user.id === message.author.id) return SendError('No puedes transferirte\n\'items\' a ti mismo.', message)

        if (parseInt(Cantidad) > EconomyGet_Author.diamante) return SendError('No tienes esa cantidad de\nitems.', message)

        SendEmbed(`${Item.toUpperCase()}`, `**${message.author.toString()}** Le dió ${Minerales[Item].emote} **${parseInt(Cantidad).toLocaleString()}** \`${Item.toLowerCase()}\`\nal usuario **${user.toString()}**`, message)

        EconomyGet_Author[Item] -= parseInt(Cantidad);
        EconomyGet_Mention[Item] += parseInt(Cantidad);

        await EconomyGet_Author.save();

        await EconomyGet_Mention.save();


    }
}