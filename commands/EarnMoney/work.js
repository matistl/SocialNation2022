const Discord = require('discord.js');
const ModelEconomy = require('../../models/Economy_DB.js');
const ModelCooldown = require('../../models/Cooldown_All.js');
const SendError = require('../../utils/error.js');
const SendEmbed = require('../../utils/embed.js');
const ms = require('ms');
const pretty = require('pretty-ms');

module.exports = {

	run: async (client, message, args) => {


		let Random = Math.floor(Math.random() * (501 - 100)) + 100;

		let EconomyGet = await ModelEconomy.findOne({ guild: message.guild.id, user: message.author.id });

		let Cooldown = await ModelCooldown.findOne({ guild: message.guild.id, user: message.author.id });

		let MS = ms('10m');

		if (Cooldown && Cooldown.Work && Cooldown.Work.Tiempo && Date.now() < Cooldown.Work.Tiempo) {

			let Restante = pretty(Cooldown.Work.Tiempo - Date.now(), { verbose: true, millisecondsDecimalDigits: 0, secondsDecimalDigits: 0 }).replace('hours', 'h').replace('minutes', 'm y ').replace('seconds', 's').replace('hour ', 'h').replace('minute ', 'm y ')

			return SendError(`Tienes que esperar **${Restante}**\npara volver a trabajar.`, message);

		}


		let Array = [

			`Descubriste que Valeriana\nes Valeria, ganaste ${client.data.emotes.Money} **$${Random.toLocaleString()}**`,
			`Jugaste al NFS con\nHozi, ganaste ${client.data.emotes.Money} **$${Random.toLocaleString()}**`,
			`Cantaste con Luana villancicos\nperuanos, ganaste ${client.data.emotes.Money} **$${Random.toLocaleString()}**`,
			`Jugaste al Clash Royale\ncon Ángel, ganaste ${client.data.emotes.Money} **$${Random.toLocaleString()}**`,
			`Cuándo ibas a comprar una Coca\nte encontraste dinero, ganaste ${client.data.emotes.Money} **$${Random.toLocaleString()}**`,
			`Jugaste Pokemon con Andrea y salieron\nvictoriosos, ganaste ${client.data.emotes.Money} **$${Random.toLocaleString()}**`,
			`Fuiste dupla de Dhano en Freestyle y\nsalieron campeones, ganaste ${client.data.emotes.Money} **$${Random.toLocaleString()}**`,
			`Bañaste a Pepito\ny ganaste ${client.data.emotes.Money} **$${Random.toLocaleString()}**`,
			`Hiciste un Stream con\nValentín, ganaste ${client.data.emotes.Money} **$${Random.toLocaleString()}**`,
			`Cantaste una canción de Disney\ncon Alex, ganaste ${client.data.emotes.Money} **$${Random.toLocaleString()}**`,
			`Arreglaste el server de Minecraft\ncon Shadow, ganaste ${client.data.emotes.Money} **$${Random.toLocaleString()}**`,
			`Jugaste CoD con Areli,\nganaste ${client.data.emotes.Money} **$${Random.toLocaleString()}**`,
			`Ayudaste a Ali con\nsu trabajo, ganaste ${client.data.emotes.Money} **$${Random.toLocaleString()}**`,
			`Bailaste con Steff y ganaron\nun concurso, ganaste ${client.data.emotes.Money} **$${Random.toLocaleString()}**`,
			`Encontraste el padre de César\ny dejó de ser huérfano, ganaste ${client.data.emotes.Money} **$${Random.toLocaleString()}**`,
			`Compraste gaseosa para las papas\nde Ally, ganaste ${client.data.emotes.Money} **$${Random.toLocaleString()}**`,
			`Compraste las Wiskas\ndel Mishi, ganaste ${client.data.emotes.Money} **$${Random.toLocaleString()}**`,
			`Baneaste a Flopas y Carlos,\nMati te pagó ${client.data.emotes.Money} **$${Random.toLocaleString()}**`,
			`Le compraste un consolador\na Dhano, ganaste ${client.data.emotes.Money} **$${Random.toLocaleString()}**`

		]

		let Mineral = [

			{ name: 'diamante', emote: client.data.emotes.Minerales.MineralDiamante },
			{ name: 'carbon', emote: client.data.emotes.Minerales.MineralCarbon },
			{ name: 'oro', emote: client.data.emotes.Minerales.MineralOro },
			{ name: 'cuarzo', emote: client.data.emotes.Minerales.MineralCuarzo },
			{ name: 'amatista', emote: client.data.emotes.Minerales.MineralAmatista },
			{ name: 'ruby', emote: client.data.emotes.Minerales.MineralRuby },
			{ name: 'esmeralda', emote: client.data.emotes.Minerales.MineralEsmeralda },
			{ name: 'plata', emote: client.data.emotes.Minerales.MineralPlata },
			{ name: 'cobre', emote: client.data.emotes.Minerales.MineralCobre },
			{ name: 'rodio', emote: client.data.emotes.Minerales.MineralRodio }
		]

		Mineral = Mineral[Math.floor(Math.random() * Mineral.length)]

		let Trabajos = Array[Math.floor(Math.random() * Array.length)];

		Trabajos = Trabajos + `\ny también ${Mineral.emote} \`x(1)\` ${mayusOneLetter(Mineral.name)}.`;

		SendEmbed('TRABAJAR', `${Trabajos}`, message);

		EconomyGet.monedero += parseInt(Random);

		EconomyGet[Mineral.name] += 1;

		Cooldown.Work.Tiempo = Date.now() + MS

		await EconomyGet.save();

		await Cooldown.save();

		function mayusOneLetter(str) {

			return str.charAt(0).toUpperCase() + str.slice(1);

		}
	}
}