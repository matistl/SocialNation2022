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

        async function SellRole(color, Role) {

            if (EconomyRoles[color] === false) return SendError('No tienes ese color\nen tu inventario.', message);

            if (MercadoRoles[color].inShop === true) return SendError('Ya pusiste a la venta\nese color anteriormente.', message)

            if ((Value) && Value > Role.price) return SendError('No puedes vender el color más caro\nque en la tienda original.', message)

            if (!Value) Value = Role.price;

            let BuyNumber = await ModelMercader.find({ guild: message.guild.id }), RandomCode = (randomBytes(30).toString('hex')).slice(0, 4)

            RandomCode = RandomCode.toUpperCase() + (BuyNumber.length + 1).toString();

            SendEmbed('SELL ROL', `Pusiste a la venta tu color.\n\n${client.data.emotes.Money} \`Precio: $${Value.toLocaleString()}\`\n🆔 \`ID: ${RandomCode}\``, message)

            if (message.member.roles.cache.has(Role.id)) await message.member.roles.remove(Role.id).catch(() => null);

            EconomyRoles[color] = false;

            MercadoRoles[color].id = Role.id;

            MercadoRoles[color].buyId = RandomCode;

            MercadoRoles[color].inShop = true;

            MercadoRoles[color].value = Value;

            await MercadoRoles.save();
            await EconomyRoles.save()
        }

        if (Role.toLowerCase() === 'morado') {

            SellRole('morado', MORADO)


        } else if (Role.toLowerCase() === 'rosa') {

            SellRole('rosa', ROSA)

        }
        else if (Role.toLowerCase() === 'cafe') {

            SellRole('cafe', CAFE)

        }
        else if (Role.toLowerCase() === 'naranja') {

            SellRole('naranja', NARANJA)

        }
        else if (Role.toLowerCase() === 'fucsia') {

            SellRole('fucsia', FUCSIA)

        }
        else if (Role.toLowerCase() === 'salmon') {

            SellRole('salmon', SALMON)

        }
        else if (Role.toLowerCase() === 'vino') {

            SellRole('vino', VINO)

        }
        else if (args[0] === 'verde' && args[1] === 'pastel') {

            SellRole('verdepastel', VERDEPASTEL)

        }
        else if (Role.toLowerCase() === 'dorado') {

            SellRole('dorado', DORADO)

        }
        else if (args[0] === 'lila' && args[1] === 'pastel') {

            SellRole('lilapastel', LILAPASTEL)

        }
        else if (Role.toLowerCase() === 'fosforescente') {

            SellRole('fosforescente', FOSFORESCENTE)

        }
        else if (Role.toLowerCase() === 'negro') {

            SellRole('negro', NEGRO)

        }
        else if (Role.toLowerCase() === 'magenta') {

            SellRole('magenta', MAGENTA)

        }
        else if (Role.toLowerCase() === 'marine') {

            SellRole('marine', MARINE)

        }
        else if (Role.toLowerCase() === 'litegreen') {

            SellRole('litegreen', LITEGREEN)

        }
        else if (Role.toLowerCase() === 'strongred') {

            SellRole('strongred', STRONGRED)

        }
        else if (Role.toLowerCase() === 'turquesa') {

            SellRole('turquesa', TURQUESA)
        }
        else if (Role.toLowerCase() === 'navy') {

            SellRole('navy', NAVY)

        }
        else if (Role.toLowerCase() === 'lime') {

            SellRole('lime', LIME)

        }
        else if (Role.toLowerCase() === 'golden') {

            SellRole('golden', GOLDEN)

        }
        else {

            return SendError('Especifica un color de tu inventario\npara venderlo en el mercado.', message);

        }

    }

}