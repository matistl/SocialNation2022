const Discord = require('discord.js');
const ModelEconomy = require('../../models/Economy_DB.js');
const SendError = require('../../utils/error.js');
const SendEmbed = require('../../utils/embed.js');
const ModelRoles = require('../../models/Economy_Roles.js');
const ModelMercader = require('../../models/Economy_Mercader.js');


module.exports = {

    run: async (client, message, args) => {


        let Array = await ModelMercader.find({ guild: message.guild.id })

        let Role = args[0]

        if (!Role) return SendError('No especificaste la ID del rol\nque deseas comprar', message);

        var ExistID = false;

        let Colors = ['morado', 'rosa', 'cafe', 'naranja', 'fucsia', 'salmon', 'vino', 'verdepastel', 'dorado', 'lilapastel', 'fosforescente', 'negro', 'magenta', 'marine', 'litegreen', 'strongred', 'turquesa', 'navy', 'lime', 'golden']

        Array.forEach(async (objetoArr) => {

            Colors.forEach(async (color) => {

                if (objetoArr[color].buyId === undefined) return;

                if (objetoArr[color].buyId === Role.toUpperCase()) {

                    ExistID = true;

                    if (objetoArr.user === message.author.id) {

                        return SendError('No puedes comprar un rol\nque tu mismo pusiste a la venta.', message);

                    }

                    let EconomyGet_Author = await ModelEconomy.findOne({ guild: message.guild.id, user: message.author.id })

                    let EconomyRoles_Author = await ModelRoles.findOne({ guild: message.guild.id, user: message.author.id })

                    let EconomyGet_Vendedor = await ModelEconomy.findOne({ guild: message.guild.id, user: objetoArr.user })

                    let UserVendedor = await ModelMercader.findOne({ guild: message.guild.id, user: objetoArr.user })

                    if (EconomyGet_Author.monedero < UserVendedor[color].value) {

                        return SendError('No tienes suficiente dinero en el monedero\npara comprar ese color', message);

                    }

                    SendEmbed('BUY MERCADO', `Compraste el rol <@&${objetoArr[color].id}>\nde <@${objetoArr.user}> a ${client.data.emotes.Money} **$${objetoArr[color].value.toLocaleString()}**`, message)

                        (await client.users.fetch(objetoArr.user)).send(`${client.data.emotes.File} | **${message.author.tag}** Compró un color tuyo del mercado.\nGanaste ${client.data.emotes.Money} **$${objetoArr[color].value.toLocaleString()}**`).catch(() => null);

                    UserVendedor[color].buyId = undefined;

                    UserVendedor[color].id = undefined;

                    UserVendedor[color].value = undefined;

                    UserVendedor[color].inShop = false;

                    EconomyGet_Author.monedero -= parseInt(objetoArr[color].value);

                    EconomyGet_Vendedor.monedero += parseInt(objetoArr[color].value);

                    EconomyRoles_Author[color] = true;

                    await UserVendedor.save();

                    await EconomyGet_Author.save();

                    await EconomyGet_Vendedor.save();

                    await EconomyRoles_Author.save();

                }

            })

        })

        if (!ExistID) return SendError('Esa ID no existe\no está incorrecta', message)

    }

}