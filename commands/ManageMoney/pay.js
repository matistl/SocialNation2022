const Discord = require('discord.js');
const ModelEconomy = require('../../models/Economy_DB.js');
const SendError = require('../../utils/error.js');
const SendEmbed = require('../../utils/embed.js');

module.exports = {

	run: async (client, message, args) => {


		let user = message.mentions.users.first();

		let Cantidad = args[0];

		if (!Cantidad) return SendError('Especifica una cantidad\npara transferirle a un usuario.', message);

		if (isNaN(Cantidad) || Cantidad.startsWith('.') || Cantidad.startsWith('-') || ['-', '.'].some(x => Cantidad.toLowerCase().includes(x))) return SendError('Especifica un\nnúmero válido', message)

		if (parseInt(Cantidad) < 1) return SendError('No puedes dar cantidad menor a 1', message)

		if (!user) return SendError('Menciona a un usuario\npara darle dinero.', message)

		let EconomyGet_Author = await ModelEconomy.findOne({ guild: message.guild.id, user: message.author.id })

		let EconomyGet_Mention = await ModelEconomy.findOne({ guild: message.guild.id, user: user.id })

		if (user.id === message.author.id) return SendError('No puedes transferirte\ndinero a ti mismo.', message)

		if (parseInt(Cantidad) > EconomyGet_Author.monedero) return SendError('No tienes esa cantidad de\ndinero en el monedero.', message)

		SendEmbed('TRANSFER', `**${message.author.toString()}** Le dió ${client.data.emotes.Money} **$${parseInt(Cantidad).toLocaleString()}**\nal monedero de **${user.toString()}**`, message)

		EconomyGet_Author.monedero -= parseInt(Cantidad);

		EconomyGet_Mention.monedero += parseInt(Cantidad);

		await EconomyGet_Author.save();

		await EconomyGet_Mention.save();


	}
}