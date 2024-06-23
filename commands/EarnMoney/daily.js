const Discord = require('discord.js');
const ModelEconomy = require('../../models/Economy_DB.js');
const ModelCooldown = require('../../models/Cooldown_All.js');
const SendError = require('../../utils/error.js');
const SendEmbed = require('../../utils/embed.js');
const ms = require('ms');
const pretty = require('pretty-ms');

module.exports = {

	run: async (client, message, args) => {


		let Ganancia = 15000;

		let EconomyGet = await ModelEconomy.findOne({ guild: message.guild.id, user: message.author.id });

		let Cooldown = await ModelCooldown.findOne({ guild: message.guild.id, user: message.author.id });

		let MS = ms('24h');

		if (Cooldown && Cooldown.Daily && Cooldown.Daily.Tiempo && Date.now() < Cooldown.Daily.Tiempo) {

			let Restante = pretty(Cooldown.Daily.Tiempo - Date.now(), { verbose: true, millisecondsDecimalDigits: 0, secondsDecimalDigits: 0 }).replace('hours', 'h').replace('minutes', 'm y').replace('seconds', 's').replace('hour ', 'h').replace('minute ', 'm')

			return SendError(`Tienes que esperar **${Restante}**\npara volver a recoger tu daily.`, message);

		}

		EconomyGet.monedero += parseInt(Ganancia);

		await EconomyGet.save();

		SendEmbed('DAILY', `Recogiste tu recompensa diaria,\ny se añadieron 💵 **${Ganancia.toLocaleString()}** a tu monedero.`, message);

		Cooldown.Daily.Tiempo = Date.now() + MS

		await Cooldown.save();
	}
}