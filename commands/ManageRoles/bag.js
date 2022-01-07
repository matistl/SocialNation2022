const Discord = require('discord.js');
const SendError = require('../../utils/error.js');
const SendEmbed = require('../../utils/embed.js');
const ModelRoles = require('../../models/Economy_Roles.js');
const { MORADO, ROSA, CAFE, NARANJA, FUCSIA, SALMON, VINO, VERDEPASTEL, DORADO, LILAPASTEL, FOSFORESCENTE, NEGRO, MAGENTA, MARINE, LITEGREEN, STRONGRED, TURQUESA, NAVY, LIME, GOLDEN, LOWEXCLUSIVE, FULLEXCLUSIVE } = require('../../config.json').ROLES;


module.exports = {


	run: async (client, message, args) => {

		let user = message.mentions.users.first() || message.author;

		let EconomyRoles = await ModelRoles.findOne({ guild: message.guild.id, user: user.id })

		let TickGreen = client.data.emotes.TickGreen;

		let TickRed = client.data.emotes.TickRed;

		let Array = [

			`**[01]** <@&${MORADO.id}> ${EconomyRoles.morado === true ? TickGreen : TickRed}`,
			`**[02]** <@&${ROSA.id}> ${EconomyRoles.rosa === true ? TickGreen : TickRed}`,
			`**[03]** <@&${CAFE.id}> ${EconomyRoles.cafe === true ? TickGreen : TickRed}`,
			`**[04]** <@&${NARANJA.id}> ${EconomyRoles.naranja === true ? TickGreen : TickRed}`,
			`**[05]** <@&${FUCSIA.id}> ${EconomyRoles.fucsia === true ? TickGreen : TickRed}`,
			`**[06]** <@&${SALMON.id}> ${EconomyRoles.salmon === true ? TickGreen : TickRed}`,
			`**[07]** <@&${VINO.id}> ${EconomyRoles.vino === true ? TickGreen : TickRed}`,
			`**[08]** <@&${VERDEPASTEL.id}> ${EconomyRoles.verdepastel === true ? TickGreen : TickRed}`,
			`**[09]** <@&${DORADO.id}> ${EconomyRoles.dorado === true ? TickGreen : TickRed}`,
			`**[10]** <@&${LILAPASTEL.id}> ${EconomyRoles.lilapastel === true ? TickGreen : TickRed}`,
			`**[11]** <@&${FOSFORESCENTE.id}> ${EconomyRoles.fosforescente === true ? TickGreen : TickRed}`,
			`**[12]** <@&${NEGRO.id}> ${EconomyRoles.negro === true ? TickGreen : TickRed}`,
			`**[13]** <@&${MAGENTA.id}> ${EconomyRoles.magenta === true ? TickGreen : TickRed}`,
			`**[14]** <@&${MARINE.id}> ${EconomyRoles.marine === true ? TickGreen : TickRed}`,
			`**[15]** <@&${LITEGREEN.id}> ${EconomyRoles.litegreen === true ? TickGreen : TickRed}`,
			`**[16]** <@&${STRONGRED.id}> ${EconomyRoles.strongred === true ? TickGreen : TickRed}`,
			`**[17]** <@&${TURQUESA.id}> ${EconomyRoles.turquesa === true ? TickGreen : TickRed}`,
			`**[18]** <@&${NAVY.id}> ${EconomyRoles.navy === true ? TickGreen : TickRed}`,
			`**[19]** <@&${LIME.id}> ${EconomyRoles.lime === true ? TickGreen : TickRed}`,
			`**[20]** <@&${GOLDEN.id}> ${EconomyRoles.golden === true ? TickGreen : TickRed}`,
			`**[21]** <@&${LOWEXCLUSIVE.id}> ${EconomyRoles.lowexclusive === true ? TickGreen : TickRed}`,
			`**[22]** <@&${FULLEXCLUSIVE.id}> ${EconomyRoles.fullexclusive === true ? TickGreen : TickRed}`,
		]

		SendEmbed('INVENTARIO DE ROLES', `${Array.join('\n')}\n\nPara equipar el color usa \`=use <color>\``, message);



	}
}