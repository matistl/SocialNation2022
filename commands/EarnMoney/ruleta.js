const Discord = require("discord.js");
const ModelEconomy = require("../../models/Economy_DB.js");
const ModelCooldown = require("../../models/Cooldown_All.js");
const SendError = require("../../utils/error.js");
const SendEmbed = require("../../utils/embed.js");
const ms = require("ms");
const pretty = require("pretty-ms");

module.exports = {
	run: async (client, message, args) => {
		let EconomyGet = await ModelEconomy.findOne({
			guild: message.guild.id,
			user: message.author.id,
		});

		let Cooldown = await ModelCooldown.findOne({
			guild: message.guild.id,
			user: message.author.id,
		});

		let Color = args[0];

		let Cantidad = args[1];

		let MS = ms("5m");

		/*
		
		if (Cooldown && Cooldown.Ruleta.Tiempo && Date.now() < Cooldown.Ruleta.Tiempo) {

			let Restante = pretty(Cooldown.Ruleta.Tiempo - Date.now(), { verbose: true, millisecondsDecimalDigits: 0, secondsDecimalDigits: 0 }).replace('hours', 'h').replace('minutes', 'm y').replace('seconds', 's').replace('hour ', 'h').replace('minute ', 'm')

			return SendError(`Tienes que esperar **${Restante}**\npara volver a apostar en ruleta.`, message);

		}
  		*/

		if (!Color)
			return SendError(
				"Especifica un color\npara apostar en ruleta.\n\n🔴 Red = `x2`\n⚫ Black = `x3`",
				message,
			);

		if (!Cantidad)
			return SendError(
				"Especifica una cantidad\npara apostar en ruleta.",
				message,
			);

		if (
			isNaN(Cantidad) ||
			Cantidad.startsWith(".") ||
			Cantidad.startsWith("-") ||
			["-", "."].some((x) => Cantidad.toLowerCase().includes(x))
		)
			return SendError("Eso no es un número válido.", message);

		if (parseInt(Cantidad) > EconomyGet.monedero)
			return SendError(
				"No tienes esa cantidad de dinero\nen tu monedero.",
				message,
			);

		if (parseInt(Cantidad) < 1)
			return SendError("Debes apostar una cantidad mayor.", message);

		
		if (parseInt(Cantidad) > 150000) return SendError(`No puedes apostar\nmás de ${client.data.emotes.Money} **$150,000**.`, message);


		if (Color.toLowerCase() === "r") Color = "red";
		if (Color.toLowerCase() === "b") Color = "black";

		let Option = ["red", "black"];

		let Random = Option[Math.floor(Math.random() * Option.length)];

		if (Color !== "red" && Color !== "black")
			return SendError(
				"Elige un color válido.\nEntre `red` o `black`.",
				message,
			);

		/*
		
		Cooldown.Ruleta.Tiempo = Date.now() + MS

		await Cooldown.save();

		*/

		if (Random === "red") {
			if (Color === "red") {
				EconomyGet.monedero += parseInt(Cantidad) * parseInt(2);

				await EconomyGet.save();

				return SendEmbed(
					"RULETA",
					`Has ganado ${client.data.emotes.Money} **$${(parseInt(Cantidad) * 2).toLocaleString()}**\npara tu monedero.`,
					message,
				);
			}

			EconomyGet.monedero -= parseInt(Cantidad);

			await EconomyGet.save();

			return SendError(
				`Has perdido ${client.data.emotes.Money} **$${parseInt(Cantidad).toLocaleString()}**\nde tu monedero.`,
				message,
			);
		}

		if (Random === "black") {
			if (Color === "black") {
				EconomyGet.monedero += parseInt(Cantidad) * parseInt(3);

				await EconomyGet.save();

				return SendEmbed(
					"RULETA",
					`Has ganado ${client.data.emotes.Money} **$${(parseInt(Cantidad) * 3).toLocaleString()}**\npara tu monedero.`,
					message,
				);
			}

			EconomyGet.monedero -= parseInt(Cantidad);

			await EconomyGet.save();

			return SendError(
				`Has perdido ${client.data.emotes.Money} **$${parseInt(Cantidad).toLocaleString()}**\nde tu monedero.`,
				message,
			);
		}
	},
};
