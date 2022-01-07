const Discord = require('discord.js');
const ModelEconomy = require('../../models/Economy_DB.js');
const ModelRoles = require('../../models/Economy_Roles.js');
const SendError = require('../../utils/error.js');
const SendEmbed = require('../../utils/embed.js');
const { MORADO, ROSA, CAFE, NARANJA, FUCSIA, SALMON, VINO, VERDEPASTEL, DORADO, LILAPASTEL, FOSFORESCENTE, NEGRO, MAGENTA, MARINE, LITEGREEN, STRONGRED, TURQUESA, NAVY, LIME, GOLDEN, LOWEXCLUSIVE, FULLEXCLUSIVE } = require('../../config.json').ROLES;

module.exports = {

	run: async (client, message, args) => {


		let EconomyGet = await ModelEconomy.findOne({ guild: message.guild.id, user: message.author.id })

		let EconomyRoles = await ModelRoles.findOne({ guild: message.guild.id, user: message.author.id })

		let Color = args[0];

		if (!Color) return SendError('Y.. ¿El color?', message);

		Color = args[0].toUpperCase();

		let ERROR = client.data.emotes.Error;
		let BANK = client.data.emotes.Bank;
		let MONEY = client.data.emotes.Money;


		//---------------------------------------------------------------------------------


		if (Color.toUpperCase() === 'MORADO') {

			EconomyRoles.morado = true;

			return Buy(MORADO)

		}

		if (Color.toUpperCase() === 'ROSA') {

			EconomyRoles.rosa = true;

			return Buy(ROSA)

		}

		if (Color.toUpperCase() === 'CAFE') {

			EconomyRoles.cafe = true;

			return Buy(CAFE)

		}

		if (Color.toUpperCase() === 'NARANJA') {

			EconomyRoles.naranja = true;

			return Buy(NARANJA)

		}

		if (Color.toUpperCase() === 'FUCSIA') {

			EconomyRoles.fucsia = true;

			return Buy(FUCSIA)

		}

		if (Color.toUpperCase() === 'SALMON') {

			EconomyRoles.salmon = true;

			return Buy(SALMON)

		}

		if (Color.toUpperCase() === 'VINO') {

			EconomyRoles.vino = true;

			return Buy(VINO)

		}

		if (args[0].toUpperCase() === 'VERDE' && args[1].toUpperCase() === "PASTEL") {

			EconomyRoles.verdepastel = true;

			return Buy(VERDEPASTEL)

		}

		if (Color.toUpperCase() === 'DORADO') {

			EconomyRoles.dorado = true;

			return Buy(DORADO)

		}

		if (args[0].toUpperCase() === 'LILA' && args[1].toUpperCase() === "PASTEL") {

			EconomyRoles.lilapastel = true;

			return Buy(LILAPASTEL)

		}

		if (Color.toUpperCase() === 'FOSFORESCENTE') {

			EconomyRoles.fosforescente = true;

			return Buy(FOSFORESCENTE)

		}

		if (Color.toUpperCase() === 'NEGRO') {

			EconomyRoles.negro = true;

			return Buy(NEGRO)

		}

		if (Color.toUpperCase() === 'MAGENTA') {

			EconomyRoles.magenta = true;

			return Buy(MAGENTA)

		}

		if (Color.toUpperCase() === 'MARINE') {

			EconomyRoles.marine = true;

			return Buy(MARINE)

		}

		if (Color.toUpperCase() === 'LITEGREEN') {

			EconomyRoles.litegreen = true;

			return Buy(LITEGREEN)

		}

		if (Color.toUpperCase() === 'STRONGRED') {

			EconomyRoles.strongred = true;

			return Buy(STRONGRED)

		}

		if (Color.toUpperCase() === 'TURQUESA') {

			EconomyRoles.turquesa = true;

			return Buy(TURQUESA)

		}

		if (Color.toUpperCase() === 'NAVY') {

			EconomyRoles.navy = true;

			return Buy(NAVY)

		}

		if (Color.toUpperCase() === 'LIME') {

			EconomyRoles.lime = true;

			return Buy(LIME)

		}

		if (Color.toUpperCase() === 'GOLDEN') {

			EconomyRoles.golden = true;

			return Buy(GOLDEN)

		}

		if (args[0].toUpperCase() === 'LOW' && args[1].toUpperCase() === "EXCLUSIVE") {

			EconomyRoles.lowexclusive = true;

			return Buy(LOWEXCLUSIVE)

		}

		if (args[0].toUpperCase() === 'FULL' && args[1].toUpperCase() === "EXCLUSIVE") {

			EconomyRoles.fullexclusive = true;

			return Buy(FULLEXCLUSIVE)

		}

		async function Buy(color) {

			if (EconomyGetDB.monedero < color.price) return SendError('No tienes suficiente dinero en el monedero\npara comprar ese color.', message);

			SendEmbed('BUY ROL', `Compraste el rol <@&${color.id}>\ny se te restan ${MONEY} **$${color.price.toLocaleString()}** del monedero.\nPara equipar el color usa \`=use <color>\``, message);

			EconomyGet.monedero -= parseInt(color.price);

			await EconomyRoles.save();

			await EconomyGetDB.save();

		}

	}
}