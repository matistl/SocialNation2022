const Discord = require('discord.js');
const ModelEconomy = require('../../models/Economy_DB.js');
const SendError = require('../../utils/error.js');
const SendEmbed = require('../../utils/embed.js');


module.exports = {


	run: async (client, message, args) => {


		let Cantidad = args[0];

		let user = message.mentions.users.first() || message.author;

		let EconomyGet = await ModelEconomy.findOne({ guild: message.guild.id, user: user.id })

		if (!message.member.permissions.has('ADMINISTRATOR') && !client.data.dev.includes(message.author.id)) return SendError('No tienes permisos para\nañadir dinero 💵.', message)

		if (!Cantidad || isNaN(Cantidad) || Cantidad.startsWith('.') || Cantidad.startsWith('-') || ['-', '.'].some(x => Cantidad.toLowerCase().includes(x))) return SendError('Especifica una cantidad válida para añadir.', message)

		SendEmbed('ADDMONEY', `Se añadieron ${client.data.emotes.Money} **$${parseInt(Cantidad).toLocaleString()}**\nal banco de **${user.toString()}**`, message)

		EconomyGet.banco += parseInt(Cantidad);

		await EconomyGet.save();

	}
}