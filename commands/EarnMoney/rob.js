const Discord = require('discord.js');
const ModelEconomy = require('../../models/Economy_DB.js');
const ModelCooldown = require('../../models/Cooldown_All.js');
const SendError = require('../../utils/error.js');
const SendEmbed = require('../../utils/embed.js');
const ms = require('ms');
const pretty = require('pretty-ms');

module.exports = {

	run: async (client, message, args) => {


		let user = message.mentions.users.first();

		let EconomyGet = await ModelEconomy.findOne({ guild: message.guild.id, user: message.author.id })

		let Cantidad = args[0];

		let Cooldown = await ModelCooldown.findOne({ guild: message.guild.id, user: message.author.id });

		let MS = ms('10m');

		if (Cooldown && Cooldown.Rob.Tiempo && Date.now() < Cooldown.Rob.Tiempo) {

			let Restante = pretty(Cooldown.Rob.Tiempo - Date.now(), { verbose: true, millisecondsDecimalDigits: 0, secondsDecimalDigits: 0 }).replace('hours', 'h').replace('minutes', 'm y').replace('seconds', 's').replace('hour ', 'h').replace('minute ', 'm')

			return SendError(`Tienes que esperar **${Restante}**\npara volver a robar.`, message);

		}

		if (!Cantidad || isNaN(Cantidad) || Cantidad.startsWith('.') || Cantidad.startsWith('-') || ['.', '-'].some(x => Cantidad.includes(x))) return SendError('Especifica una cantidad válida\npara robarle a la persona.', message);

		if (!user) return SendError('Menciona a un usuario\npara robarle.', message);

		let EconomyGet_Mention = await ModelEconomy.findOne({ guild: message.guild.id, user: user.id })

		if (user.id === message.author.id) return SendError('No puedes robarte\na ti mismo.', message);

		if (250 > EconomyGet_Mention.monedero) return SendError(`Para robarle a ese usuario\nminimo debe de tener ${client.data.emotes.Money} **$250** en su monedero.`, message);

		if (parseInt(Cantidad) > EconomyGet_Mention.monedero) return SendError('Esa persona no tiene esa cantidad\nen su monedero.', message);

		SendEmbed('ROB', `**${message.author.toString()}** le robó ${client.data.emotes.Money} **$${parseInt(Cantidad).toLocaleString()}**\nal usuario **${user.toString()}**\n de su monedero.`, message);

		EconomyGet.monedero += parseInt(Cantidad);
		EconomyGet_Mention.monedero -= parseInt(Cantidad);
		Cooldown.Rob.Tiempo = Date.now() + MS

		await EconomyGet.save();
		await EconomyGet_Mention.save();
		await Cooldown.save();

	}
}