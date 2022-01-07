const Discord = require('discord.js');
const ModelEconomy = require('../../models/Economy_DB.js');
const SendError = require('../../utils/error.js');
const SendEmbed = require('../../utils/embed.js');
const ModelRoles = require('../../models/Economy_Roles.js');
const ModelMercader = require('../../models/Economy_Mercader.js');
const { randomBytes } = require('crypto');
const { MORADO, ROSA, CAFE, NARANJA, FUCSIA, SALMON, VINO, VERDEPASTEL, DORADO, LILAPASTEL, FOSFORESCENTE, NEGRO, MAGENTA, MARINE, LITEGREEN, STRONGRED, TURQUESA, NAVY, LIME, GOLDEN } = require('../../config.json');

module.exports = {

    run: async (client, message, args) => {


        let EconomyRoles = await ModelRoles.findOne({ guild: message.guild.id, user: message.author.id })

        let MercadoRoles = await ModelMercader.findOne({ guild: message.guild.id, user: message.author.id })

        let Role = args[0], Value = args[1] ?? parseInt(args[1]);

        if (!Role) return SendError('No especificaste el rol\nque deseas poner en venta.', message);

        if ((Value) && (isNaN(Value) || Value.startsWith('.') || Value.startsWith('-') || ['-', '.'].some(x => Value.toLowerCase().includes(x)))) return SendError('Especifica un\nnúmero válido', message);

        if ((Value) && Value < 1) return SendError('El precio debe de ser\nuna cantidad mayor.', message);

        async function RemoveRole(color, Role) {


            if (MercadoRoles[color].inShop === false) return SendError('Ese color no está en venta\nen el mercado.', message)

            SendEmbed('SELL ROL', `El color <@&${Role.id}> se quitó del mercado.\n\nSe te devolvió el rol a tu inventario`, message)

            EconomyRoles[color] = true;

            MercadoRoles[color].id = undefined;

            MercadoRoles[color].buyId = undefined;

            MercadoRoles[color].inShop = false;

            MercadoRoles[color].value = undefined;

            await MercadoRoles.save();
            await EconomyRoles.save()
        }

        if (Role.toLowerCase() === 'morado') {

            RemoveRole('morado', MORADO)


        } else if (Role.toLowerCase() === 'rosa') {

            RemoveRole('rosa', ROSA)

        }
        else if (Role.toLowerCase() === 'cafe') {

            RemoveRole('cafe', CAFE)

        }
        else if (Role.toLowerCase() === 'naranja') {

            RemoveRole('naranja', NARANJA)

        }
        else if (Role.toLowerCase() === 'fucsia') {

            RemoveRole('fucsia', FUCSIA)

        }
        else if (Role.toLowerCase() === 'salmon') {

            RemoveRole('salmon', SALMON)

        }
        else if (Role.toLowerCase() === 'vino') {

            RemoveRole('vino', VINO)

        }
        else if (args[0] === 'verde' && args[1] === 'pastel') {

            RemoveRole('verdepastel', VERDEPASTEL)

        }
        else if (Role.toLowerCase() === 'dorado') {

            RemoveRole('dorado', DORADO)

        }
        else if (args[0] === 'lila' && args[1] === 'pastel') {

            RemoveRole('lilapastel', LILAPASTEL)

        }
        else if (Role.toLowerCase() === 'fosforescente') {

            RemoveRole('fosforescente', FOSFORESCENTE)

        }
        else if (Role.toLowerCase() === 'negro') {

            RemoveRole('negro', NEGRO)

        }
        else if (Role.toLowerCase() === 'magenta') {

            RemoveRole('magenta', MAGENTA)

        }
        else if (Role.toLowerCase() === 'marine') {

            RemoveRole('marine', MARINE)

        }
        else if (Role.toLowerCase() === 'litegreen') {

            RemoveRole('litegreen', LITEGREEN)

        }
        else if (Role.toLowerCase() === 'strongred') {

            RemoveRole('strongred', STRONGRED)

        }
        else if (Role.toLowerCase() === 'turquesa') {

            RemoveRole('turquesa', TURQUESA)
        }
        else if (Role.toLowerCase() === 'navy') {

            RemoveRole('navy', NAVY)

        }
        else if (Role.toLowerCase() === 'lime') {

            RemoveRole('lime', LIME)

        }
        else if (Role.toLowerCase() === 'golden') {

            RemoveRole('golden', GOLDEN)

        }
        else {

            return SendError('Especifica un color de tu inventario\npara venderlo en el mercado.', message);

        }

    }

}