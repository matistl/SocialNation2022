const Discord = require('discord.js');
const ModelEconomy = require('../../models/Economy_DB.js');
const SendError = require('../../utils/error.js');
const SendEmbed = require('../../utils/embed.js');
const ModelRoles = require('../../models/Economy_Roles.js');
const ModelMercader = require('../../models/Economy_Mercader.js');

module.exports = {

    run: async (client, message, args) => {


        let EconomyRoles = await ModelRoles.findOne({ guild: message.guild.id, user: message.author.id })

        let MercadoRoles = await ModelMercader.findOne({ guild: message.guild.id, user: message.author.id })

        let Array = await ModelMercader.find({ guild: message.guild.id })

        let Colors = ['morado', 'rosa', 'cafe', 'naranja', 'fucsia', 'salmon', 'vino', 'verdepastel', 'dorado', 'lilapastel', 'fosforescente', 'negro', 'magenta', 'marine', 'litegreen', 'strongred', 'turquesa', 'navy', 'lime', 'golden']

        let ShopDatos = [];

        let Paginas = [];

        let LengthTop = 10;

        let Select = parseInt(args[0]) || 1;

        Array.forEach(objetoArr => {

            Colors.forEach(color => {

                if (objetoArr[color].inShop === true) {

                    ShopDatos.push(`--> \`Dueño:\` <@${objetoArr.user}>\n--> \`Color:\` <@&${objetoArr[color].id}>\n--> \`Precio:\` ${client.data.emotes.Money} **$${objetoArr[color].value.toLocaleString()}**\n--> \`ID:\` ${objetoArr[color].buyId}\n\n`)

                }

            })

        })

        if (ShopDatos.length < 1) return SendError('No hay páginas disponibles\nen el mercado', message)

        while (ShopDatos.length > 0) {

            Paginas.push(ShopDatos.splice(0, LengthTop))

        }

        if (Select <= 0 || Select > Paginas.length) return SendError('Esa página no existe\nen el mercado', message)

        let embed = new Discord.MessageEmbed()
            .setTitle(`▸  ${client.data.emotes.Bank} ┇  MERCADO`)
            .setDescription(Paginas[Select - 1].join(' ') + `\n\`Para ver otra página, usa: =mercado <página>\``)
            .setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048, format: 'png' }))
            .setFooter(`Página: ${Select} / ${Paginas.length}`)
            .setColor('6800FF')

        message.reply({ embeds: [embed] })

    }
}