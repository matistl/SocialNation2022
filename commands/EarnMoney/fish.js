const Discord = require('discord.js');
const ModelEconomy = require('../../models/Economy_DB.js');
const ModelCooldown = require('../../models/Cooldown_All.js');
const SendError = require('../../utils/error.js');
const SendEmbed = require('../../utils/embed.js');
const ms = require('ms');
const pretty = require('pretty-ms');

module.exports = {

	run: async (client, message, args) => {


		let Random = parseInt(Math.floor(Math.random() * 500));

		let Probabilidad = parseInt(Math.floor(Math.random() * 6));

		let EconomyGet = await ModelEconomy.findOne({ guild: message.guild.id, user: message.author.id })

		let Cooldown = await ModelCooldown.findOne({ guild: message.guild.id, user: message.author.id });

		let MS = ms('5m');

		if (Cooldown && Cooldown.Fish.Tiempo && Cooldown.Fish.Tiempo && Date.now() < Cooldown.Fish.Tiempo) {

			let Restante = pretty(Cooldown.Fish.Tiempo - Date.now(), { verbose: true, millisecondsDecimalDigits: 0, secondsDecimalDigits: 0 }).replace('hours', 'h').replace('minutes', 'm y ').replace('seconds', 's').replace('hour ', 'h').replace('minute ', 'm y ')

			return SendError(`Tienes que esperar **${Restante}**\npara volver a pescar.`, message);

		}

		if (EconomyGet && EconomyGet.banco < 350) return SendError(`Para pescar minimo debes de tener\n${client.data.emotes.Money} **$500** en tu banco.`, message);

		Cooldown.Fish.Tiempo = Date.now() + MS

		await Cooldown.save()


		if (Probabilidad <= 1) {

			SendEmbed('FISH', `Has pescado y has ganado ${client.data.emotes.Money} **$${Random.toLocaleString()}**\npor pescar un pescado normal. 🐟`, message);

			EconomyGet.banco += parseInt(Random);

			return await EconomyGet.save();

		}

		if (Probabilidad <= 2) {

			SendEmbed('FISH', `Has pescado y has ganado ${client.data.emotes.Money} **$${Random.toLocaleString()}**\npor pescar un pescado pequeño. 🐠`, message);

			EconomyGet.banco += parseInt(Random);

			return await EconomyGet.save();

		}

		if (Probabilidad <= 3) {

			SendEmbed('FISH', `Has pescado y has ganado ${client.data.emotes.Money} **$${Random.toLocaleString()}**\npor pescar un pescado grande. 🐡`, message);

			EconomyGet.banco += parseInt(Random);

			return await EconomyGet.save();

		}

		if (Probabilidad >= 4 || Probabilidad >= 5 || Probabilidad >= 6) {

			SendError(`Al intentar pescar te has encontrado con\nun tiburón 🦈 y pierdes ${client.data.emotes.Money} **$${Random.toLocaleString()}**`, message);

			EconomyGet.banco -= parseInt(Random);

			return await EconomyGet.save();

		}
	}
}