const Discord = require('discord.js');
const ModelEconomy = require('../../models/Economy_DB.js');
const ModelCooldown = require('../../models/Cooldown_All.js');
const SendError = require('../../utils/error.js');
const SendEmbed = require('../../utils/embed.js');
const ms = require('ms');
const pretty = require('pretty-ms');

module.exports = {

	run: async (client, message, args) => {

		let Bank = client.data.emotes.Bank;

		let Time = 10000;

		let Cantidad = args[0];

		let EconomyGet = await ModelEconomy.findOne({ guild: message.guild.id, user: message.author.id })

		let Cooldown = await ModelCooldown.findOne({ guild: message.guild.id, user: message.author.id });

		let Embed;

		let Random = Math.floor(Math.random() * 18);

		if (Random === 0) Random = 1;

		if (Random === 18) Random = 17;

		let MS = ms('5m');
		
		/*
		if (Cooldown && Cooldown.Slots.Tiempo && Cooldown.Slots.Tiempo && Date.now() < Cooldown.Slots.Tiempo) {

			let Restante = pretty(Cooldown.Slots.Tiempo - Date.now(), { verbose: true, millisecondsDecimalDigits: 0, secondsDecimalDigits: 0 }).replace('hours', 'h').replace('minutes', 'm y').replace('seconds', 's').replace('hour ', 'h').replace('minute ', 'm')

			return SendError(`Tienes que esperar **${Restante}**\npara volver a apostar en slots.`, message);

		}

		*/

		if (!Cantidad) return SendError('Especifica una cantidad\npara apostar en slots.', message);

		if (isNaN(Cantidad) || Cantidad.startsWith('.') || Cantidad.startsWith('-') || ['-', '.'].some(x => Cantidad.toLowerCase().includes(x))) return SendError('Especifica un\nnúmero válido', message);

		if (parseInt(Cantidad) > EconomyGet.monedero) return SendError('No tienes esa cantidad de dinero\nen tu monedero.', message);

		if (parseInt(Cantidad) < 1) return SendError('Debes apostar una cantidad mayor.', message);
		
		if (parseInt(Cantidad) > 150000) return SendError(`No puedes apostar\nmás de ${client.data.emotes.Money} **$150,000**.`, message);

		/*
		
		Cooldown.Slots.Tiempo = Date.now() + MS

		await Cooldown.save();

		*/


		if (Random <= 7) {

			Embed = new Discord.MessageEmbed()
				.setTitle(`▸  ${Bank}┇  SLOTS`)
				.setDescription(`🍉 ◼️ 🍇\n🍉 🍇 🍊\n ◼️ 🍇 🍉\n\nPerdiste ${client.data.emotes.Money} **$${parseInt(Cantidad).toLocaleString()}**`)
				.setFooter({ text: message.author.username,  iconURL: message.author.displayAvatarURL({ dynamic: true })})
				.setColor('RED')

			EconomyGet.monedero -= parseInt(Cantidad)

			await EconomyGet.save()

			return message.reply({ embeds: [Embed] })

		}


		if (Random <= 16) {

			Embed = new Discord.MessageEmbed()
				.setTitle(`▸  ${Bank}┇  SLOTS`)
				.setDescription(`🍉 ◼️ 🍉\n🍉 🍇 🍊\n 🍇 🍇 🍉\n\nGanaste ${client.data.emotes.Money} **$${(parseInt(Cantidad) * 2).toLocaleString()}**`)
				.setFooter({ text: message.author.username,  iconURL: message.author.displayAvatarURL({ dynamic: true })})
				.setColor('6800FF')

			EconomyGet.monedero += parseInt(Cantidad) * parseInt(2)

			await EconomyGet.save()

			return message.reply({ embeds: [Embed] })

		}

		if (Random === 17) {

			Embed = new Discord.MessageEmbed()
				.setTitle(`▸  ${Bank}┇  SLOTS`)
				.setDescription(`🍊 🍊 🍊\n🍉 🍉 🍉\n 🍇 🍇 🍇\n\nGanaste ${client.data.emotes.Money} **$${(parseInt(Cantidad) * 3).toLocaleString()}**`)
				.setFooter({ text: message.author.username,  iconURL: message.author.displayAvatarURL({ dynamic: true })})
				.setColor('6800FF')

			EconomyGet.monedero += parseInt(Cantidad) * parseInt(3)

			await EconomyGet.save()

			message.reply({ embeds: [Embed] })

		}
	}
}