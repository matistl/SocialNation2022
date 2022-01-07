const Discord = require('discord.js');
const ModelEconomy = require('../../models/Economy_DB.js');
const ModelCooldown = require('../../models/Cooldown_All.js');
const SendError = require('../../utils/error.js');
const SendEmbed = require('../../utils/embed.js');
const ms = require('ms');
const pretty = require('pretty-ms');

module.exports = {

    run: async (client, message, args) => {


        let Random = parseInt(Math.floor(Math.random() * 3000));

        let Probabilidad = parseInt(Math.floor(Math.random() * 6));

        let EconomyGet = await ModelEconomy.findOne({ guild: message.guild.id, user: message.author.id })

        let Cooldown = await ModelCooldown.findOne({ guild: message.guild.id, user: message.author.id });

        let MS = ms('15m');

        let Mineral = [

            { name: 'diamante', emote: client.data.emotes.Minerales.MineralDiamante },
            { name: 'carbon', emote: client.data.emotes.Minerales.MineralCarbon },
            { name: 'oro', emote: client.data.emotes.Minerales.MineralOro },
            { name: 'cuarzo', emote: client.data.emotes.Minerales.MineralCuarzo },
            { name: 'amatista', emote: client.data.emotes.Minerales.MineralAmatista },
            { name: 'ruby', emote: client.data.emotes.Minerales.MineralRuby },
            { name: 'esmeralda', emote: client.data.emotes.Minerales.MineralEsmeralda },
            { name: 'plata', emote: client.data.emotes.Minerales.MineralPlata },
            { name: 'cobre', emote: client.data.emotes.Minerales.MineralCobre },
            { name: 'rodio', emote: client.data.emotes.Minerales.MineralRodio }
        ]

        Mineral = Mineral[Math.floor(Math.random() * Mineral.length)]

        let MineralCantidad = Math.floor(Math.random() * 3) + 1;

        if (Cooldown && Cooldown.Mine.Tiempo && Cooldown.Mine.Tiempo && Date.now() < Cooldown.Mine.Tiempo) {

            let Restante = pretty(Cooldown.Mine.Tiempo - Date.now(), { verbose: true, millisecondsDecimalDigits: 0, secondsDecimalDigits: 0 }).replace('hours', 'h').replace('minutes', 'm y ').replace('seconds', 's').replace('hour ', 'h').replace('minute ', 'm y ')

            return SendError(`Tienes que esperar **${Restante}**\npara volver a minar.`, message);

        }

        Cooldown.Mine.Tiempo = Date.now() + MS

        await Cooldown.save();

        if (Probabilidad <= 3) {


            SendEmbed('MINE', `Bajaste tan profundo que\nencontraste ${Mineral.emote} \`${Mineral.name}\` **x${MineralCantidad}**`, message);

            EconomyGet[Mineral.name] += parseInt(MineralCantidad);

            return await EconomyGet.save();

        }

        if (Probabilidad >= 4 || Probabilidad >= 5 || Probabilidad >= 6) {

            SendError(`Te perdiste en la cueva y no encontraste nada,\npagaste ${client.data.emotes.Money} **$${Random.toLocaleString()}** para que vengan a rescatarte`, message);

            EconomyGet.banco -= parseInt(Random);

            return await EconomyGet.save();

        }
    }
}