const Discord = require('discord.js');
const ModelEconomy = require('../../models/Economy_DB.js');
const SendError = require('../../utils/error.js');
const SendEmbed = require('../../utils/embed.js');

module.exports = {

	run: async (client, message, args) => {

		let Cantidad = args[0];

		let EconomyGet = await ModelEconomy.findOne({ guild: message.guild.id, user: message.author.id });

		if (EconomyGet && EconomyGet.monedero === null || EconomyGet && EconomyGet.monedero === 0) return SendError(`No tienes dinero para depositar\nal banco.`, message);

		if (!Cantidad) return SendError(`Especifica cuanto quieres\ndepositar al banco.`, message);

		if (Cantidad.toLowerCase() === 'all') {

			SendEmbed('DEPOSITADO', `Depositaste ${client.data.emotes.Money} **$${parseInt(EconomyGet.monedero).toLocaleString()}**\nal banco.`, message);

			EconomyGet.banco += EconomyGet.monedero;
			EconomyGet.monedero = 0;

			return await EconomyGet.save();

		}

		if (isNaN(Cantidad) || Cantidad.startsWith('.') || Cantidad.startsWith('-') || ['-', '.'].some(x => Cantidad.toLowerCase().includes(x))) return SendError('Especifica un\nnúmero válido', message)

		if (EconomyGet.monedero < parseInt(Cantidad)) return SendError('No tienes esa cantidad\nen el monedero.', message)

		SendEmbed('DEPOSITADO', `Depositaste ${client.data.emotes.Money} **$${parseInt(Cantidad).toLocaleString()}**\nal banco.`, message)

		EconomyGet.monedero -= parseInt(Cantidad);
		EconomyGet.banco += parseInt(Cantidad);


		await EconomyGet.save();


	}
}
