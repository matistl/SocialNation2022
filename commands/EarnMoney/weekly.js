const Discord = require('discord.js');
const ModelEconomy = require('../../models/Economy_DB.js');
const ModelCooldown = require('../../models/Cooldown_All.js');
const SendError = require('../../utils/error.js');
const SendEmbed = require('../../utils/embed.js');
const ms = require('ms');
const pretty = require('pretty-ms');

module.exports = {

	run: async (client, message, args) => {


		let Ganancia = 35000;

		let EconomyGet = await ModelEconomy.findOne({ guild: message.guild.id, user: message.author.id });

		let Cooldown = await ModelCooldown.findOne({ guild: message.guild.id, user: message.author.id });

		let MS = ms('7d');

		if (Cooldown && Cooldown.Weekly && Cooldown.Weekly.Tiempo && Date.now() < Cooldown.Weekly.Tiempo) {

			let Restante = pretty(Cooldown.Weekly.Tiempo - Date.now(), { verbose: true, millisecondsDecimalDigits: 0, secondsDecimalDigits: 0 }).replace('days', 'd').replace('day', 'd').replace('hours', 'h').replace('minutes', 'm y').replace('seconds', 's').replace('hour ', 'h').replace('minute ', 'm')

			return SendError(`Tienes que esperar **${Restante}**\npara volver a recoger tu weekly.`, message);

		}


		SendEmbed('WEEKLY', `Recogiste tu recompensa semanal,\ny se añadieron 💵 **${Ganancia.toLocaleString()}** a tu monedero.`, message);

		EconomyGet.monedero += parseInt(Ganancia)

		Cooldown.Weekly.Tiempo = Date.now() + MS

		await EconomyGet.save();

		await Cooldown.save()
	}
}