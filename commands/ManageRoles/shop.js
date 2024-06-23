const Discord = require('discord.js');
const ModelEconomy = require('../../models/Economy_DB.js');
const SendError = require('../../utils/error.js');
const SendEmbed = require('../../utils/embed.js');
const { MORADO, ROSA, CAFE, NARANJA, FUCSIA, SALMON, VINO, VERDEPASTEL, DORADO, LILAPASTEL, FOSFORESCENTE, NEGRO, MAGENTA, MARINE, LITEGREEN, STRONGRED, TURQUESA, NAVY, LIME, GOLDEN, LOWEXCLUSIVE, FULLEXCLUSIVE } = require('../../config.json').ROLES;

module.exports = {

	run: async (client, message, args) => {


		let Banco = await ModelEconomy.findOne({ guild: message.guild.id, user: message.author.id });

		let Bank = client.data.emotes.Bank;

		let Array = [

			`**[01]** <@&${MORADO.id}> \`💵 ${MORADO.price.toLocaleString()}\``,
			`**[02]** <@&${ROSA.id}> \`💵 ${ROSA.price.toLocaleString()}\``,
			`**[03]** <@&${CAFE.id}> \`💵 ${CAFE.price.toLocaleString()}\``,
			`**[04]** <@&${NARANJA.id}> \`💵 ${NARANJA.price.toLocaleString()}\``,
			`**[05]** <@&${FUCSIA.id}> \`💵 ${FUCSIA.price.toLocaleString()}\``,
			`**[06]** <@&${SALMON.id}> \`💵 ${SALMON.price.toLocaleString()}\``,
			`**[07]** <@&${VINO.id}> \`💵 ${VINO.price.toLocaleString()}\``,
			`**[08]** <@&${VERDEPASTEL.id}> \`💵 ${VERDEPASTEL.price.toLocaleString()}\``,
			`**[09]** <@&${DORADO.id}> \`💵 ${DORADO.price.toLocaleString()}\``,
			`**[10]** <@&${LILAPASTEL.id}> \`💵 ${LILAPASTEL.price.toLocaleString()}\``,
			`**[11]** <@&${FOSFORESCENTE.id}> \`💵 ${FOSFORESCENTE.price.toLocaleString()}\``,
			`**[12]** <@&${NEGRO.id}> \`💵 ${NEGRO.price.toLocaleString()}\``,
			`**[13]** <@&${MAGENTA.id}> \`💵 ${MAGENTA.price.toLocaleString()}\``,
			`**[14]** <@&${MARINE.id}> \`💵 ${NEGRO.price.toLocaleString()}\``,
			`**[15]** <@&${LITEGREEN.id}> \`💵 ${LITEGREEN.price.toLocaleString()}\``,
			`**[16]** <@&${STRONGRED.id}> \`💵 ${STRONGRED.price.toLocaleString()}\``,
			`**[17]** <@&${TURQUESA.id}> \`💵 ${TURQUESA.price.toLocaleString()}\``,
			`**[18]** <@&${NAVY.id}> \`💵 ${NAVY.price.toLocaleString()}\``,
			`**[19]** <@&${LIME.id}> \`💵 ${LIME.price.toLocaleString()}\``,
			`**[20]** <@&${GOLDEN.id}> \`💵 ${GOLDEN.price.toLocaleString()}\``,
			`\n👀 **__ROLES EXCLUSIVOS__** 👀\n\n**[21]** <@&${LOWEXCLUSIVE.id}>\n\` ${LOWEXCLUSIVE.price.toLocaleString()} 💵 = Rol exclusivo sin visualización.\`\n\n**[22]** <@&${FULLEXCLUSIVE.id}>\n\` ${FULLEXCLUSIVE.price.toLocaleString()} 💵 = Rol exclusivo con visualización.\``
		]

		let Embed1 = new Discord.MessageEmbed()
			.setTitle(`▸	🛍️	┇	TIENDA`)
			.setDescription(`**Tu banco:  ${Bank} $${Banco ? Banco.banco : 0}**\n\n${Array.slice(0, 5).join('\n')}\n\n**Para comprar un color usa** \`${client.data.prefix}buy <nombre>\`\n*Ejemplo:* \`${client.data.prefix}buy azul\``)
			.setColor('6800FF')

		let Embed2 = new Discord.MessageEmbed()
			.setTitle(`▸	🛍️	┇	TIENDA`)
			.setDescription(`**Tu banco:  ${Bank} $${Banco ? Banco.banco : 0}**\n\n${Array.slice(5, 10).join('\n')}\n\n**Para comprar un color usa** \`${client.data.prefix}buy <nombre>\`\n*Ejemplo:* \`${client.data.prefix}buy azul\``)
			.setColor('6800FF')

		let Embed3 = new Discord.MessageEmbed()
			.setTitle(`▸	🛍️	┇	TIENDA`)
			.setDescription(`**Tu banco:  ${Bank} $${Banco ? Banco.banco : 0}**\n\n${Array.slice(10, 15).join('\n')}\n\n**Para comprar un color usa** \`${client.data.prefix}buy <nombre>\`\n*Ejemplo:* \`${client.data.prefix}buy azul\``)
			.setColor('6800FF')

		let Embed4 = new Discord.MessageEmbed()
			.setTitle(`▸	🛍️	┇	TIENDA`)
			.setDescription(`**Tu banco:  ${Bank} $${Banco ? Banco.banco : 0}**\n\n${Array.slice(15, 20).join('\n')}\n\n**Para comprar un color usa** \`${client.data.prefix}buy <nombre>\`\n*Ejemplo:* \`${client.data.prefix}buy azul\``)
			.setColor('6800FF')

		let Embed5 = new Discord.MessageEmbed()
			.setTitle(`▸	🛍️	┇	TIENDA`)
			.setDescription(`**Tu banco:  ${Bank} $${Banco ? Banco.banco : 0}**\n\n${Array.slice(20, 22).join('\n')}\n\n**Para comprar un color usa** \`${client.data.prefix}buy <nombre>\`\n*Ejemplo:* \`${client.data.prefix}buy low exclusive\``)
			.setColor('6800FF')


		// Buttons

		let Button1 = new Discord.MessageButton()
			.setCustomId('backbtn')
			.setEmoji('⏪')
			.setStyle('DANGER');

		let Button2 = new Discord.MessageButton()
			.setCustomId('nextbtn')
			.setEmoji('⏩')
			.setStyle('SUCCESS');

		let pages = [

			Embed1,
			Embed2,
			Embed3,
			Embed4,
			Embed5

		]

		let buttons = [

			Button1,
			Button2

		]

		pagination(message, pages, buttons);

		async function pagination(interaction, pages, buttonList, timeout = 60000) {

			let page = 0;

			const row = new Discord.MessageActionRow()
				.addComponents(buttonList);

			if (interaction.deferred == false) {
				await interaction.deferReply()
			};

			const curPage = await interaction.reply({
				embeds: [pages[page].setFooter({ text:`Página ${page + 1} / ${pages.length}` })],
				components: [row],
				fetchReply: true,
			});

			const filter = (i) => {

				i.customId === buttonList[0].customId ||
					i.customId === buttonList[1].customId;

				if (i.user.id === interaction.author.id) return true;

				return i.reply({
					embeds:
						[new Discord.MessageEmbed()
							.setTitle(`▸  ${client.data.emotes.Error}┇  ERROR`)
							.setDescription('Debes ejecutarlo tú al\ncomando para poder usarlo')
							.setColor('RED')
						], ephemeral: true
				})

			}


			const collector = await curPage.createMessageComponentCollector({
				filter,
				time: timeout,
			});

			collector.on('collect', async (i) => {

				switch (i.customId) {

					case buttonList[0].customId:

						page = page > 0 ? --page : pages.length - 1;

						break;

					case buttonList[1].customId:

						page = page + 1 < pages.length ? ++page : 0;

						break;

					default:

						break;
				}

				await i.deferUpdate();
				await i.editReply({

					embeds: [pages[page].setFooter({ text:`Página ${page + 1} / ${pages.length}` })],

					components: [row],
				});

				collector.resetTimer();

			});

			collector.on('end', () => {

				try {
					const disabledRow = new Discord.MessageActionRow()
						.addComponents(
							buttonList[0].setDisabled(true),
							buttonList[1].setDisabled(true)
						);

					curPage.edit({
						embeds: [pages[page].setFooter({ text:`Página ${page + 1} / ${pages.length}` })],
						components: [disabledRow],
					});
				} catch (e){}
			});

			return curPage;
		};
	}

}



