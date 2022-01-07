const Discord = require('discord.js');
const ModelEconomy = require('../../models/Economy_DB.js');
const SendError = require('../../utils/error.js');
const SendEmbed = require('../../utils/embed.js');
const ModelRoles = require('../../models/Economy_Roles.js');
const config = require('../../config.json');

module.exports = {

	run: async (client, message, args) => {


		let Color = args[0];

		let Colors = [

			"MORADO",
			"ROSA",
			"CAFE",
			"NARANJA",
			"FUCSIA",
			"SALMON",
			"VINO",
			"VERDEPASTEL",
			"DORADO",
			"LILAPASTEL",
			"FOSFORESCENTE",
			"NEGRO",
			"MAGENTA",
			"MARINE",
			"LITEGREEN",
			"STRONGRED",
			"TURQUESA",
			"NAVY",
			"LIME",
			"GOLDEN"

		]

		let EconomyRoles = await ModelRoles.findOne({ guild: message.guild.id, user: message.author.id })

		if (!Color) return SendError('No pusiste el color\nque te quieres equipar', message);

		if (!Colors.includes(Color.toUpperCase())) return SendError('Ese color no existe', message)

		if (EconomyRoles[Color] === false) return SendError('No tienes ese color en\ntu inventario', message);

		Colors.forEach(async (color) => {

			if (color.toLowerCase() !== Color.toLowerCase()) {

				if (message.member.roles.cache.has(config[color].id)) await message.member.roles.remove(config[color].id).catch((err) => console.log(err))

			}

			if (color.toLowerCase() === Color.toLowerCase()) {

				await message.member.roles.add(config[color].id).catch((err) => console.log(err));

			}

		})

		SendEmbed('USE COLOR', 'Te equipaste ese color\nen tu perfil', message)





	}

}
