const Discord = require('discord.js');
const ModelEconomy = require('../../models/Economy_DB.js');
const SendError = require('../../utils/error.js');
const SendEmbed = require('../../utils/embed.js');

module.exports = {

	run: async (client, message, args) => {

		let Cantidad = args[0];

		let EconomyGet = await ModelEconomy.findOne({ guild: message.guild.id, user: message.author.id });

		if (EconomyGet && EconomyGet.banco === null || EconomyGet && EconomyGet.banco === 0) return SendError(`No tienes dinero para retirar\ndel banco.`, message);

		if (!Cantidad) return SendError(`Especifica cuanto quieres\nretirar del banco.`, message);

		if (Cantidad.toLowerCase() === 'all') {

			SendEmbed('RETIRADO', `Retiraste ${client.data.emotes.Money} **$${parseInt(EconomyGet.banco).toLocaleString()}**\ndel banco.`, message);

			EconomyGet.monedero += parseInt(EconomyGet.banco);
			EconomyGet.banco = 0;

			return await EconomyGet.save();

		}

		if (isNaN(Cantidad) || Cantidad.startsWith('.') || Cantidad.startsWith('-') || ['-', '.'].some(x => Cantidad.toLowerCase().includes(x))) return SendError('Especifica un\nnúmero válido', message)

		if (EconomyGet.banco < parseInt(Cantidad)) return SendError('No tienes esa cantidad\nen el banco.', message)

		SendEmbed('RETIRADO', `Retiraste ${client.data.emotes.Money} **$${parseInt(Cantidad).toLocaleString()}**\ndel banco.`, message)

		EconomyGet.monedero += parseInt(Cantidad);
		EconomyGet.banco -= parseInt(Cantidad);


		await EconomyGet.save();


	}
}