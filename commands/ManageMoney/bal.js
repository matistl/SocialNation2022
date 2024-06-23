const Discord = require("discord.js");
const ModelEconomy = require("../../models/Economy_DB.js");
const SendError = require("../../utils/error.js");
const SendEmbed = require("../../utils/embed.js");

module.exports = {
	run: async (client, message, args) => {
		let user = message.mentions.users.first() || message.author;

		let Dinero = await ModelEconomy.findOne({
			guild: message.guild.id,
			user: user.id,
		});

		let Array = [
			`${client.data.emotes.Minerales.MineralDiamante} **__Diamante__** \`x(${Dinero && Dinero.diamante ? Dinero.diamante.toLocaleString() : 0})\``,
			`${client.data.emotes.Minerales.MineralCarbon} **__Carbón__** \`x(${Dinero && Dinero.carbon ? Dinero.carbon.toLocaleString() : 0})\``,
			`${client.data.emotes.Minerales.MineralOro} **__Oro__** \`x(${Dinero && Dinero.oro ? Dinero.oro.toLocaleString() : 0})\``,
			`${client.data.emotes.Minerales.MineralCuarzo} **__Cuarzo__** \`x(${Dinero && Dinero.cuarzo ? Dinero.cuarzo.toLocaleString() : 0})\``,
			`${client.data.emotes.Minerales.MineralAmatista} **__Amatista__** \`x(${Dinero && Dinero.amatista ? Dinero.amatista.toLocaleString() : 0})\``,
			`${client.data.emotes.Minerales.MineralRuby} **__Ruby__** \`x(${Dinero && Dinero.ruby ? Dinero.ruby.toLocaleString() : 0})\``,
			`${client.data.emotes.Minerales.MineralEsmeralda} **__Esmeralda__** \`x(${Dinero && Dinero.esmeralda ? Dinero.esmeralda.toLocaleString() : 0})\``,
			`${client.data.emotes.Minerales.MineralPlata} **__Plata__** \`x(${Dinero && Dinero.plata ? Dinero.plata.toLocaleString() : 0})\``,
			`${client.data.emotes.Minerales.MineralCobre} **__Cobre__** \`x(${Dinero && Dinero.cobre ? Dinero.cobre.toLocaleString() : 0})\``,
			`${client.data.emotes.Minerales.MineralRodio} **__Rodio__** \`x(${Dinero && Dinero.rodio ? Dinero.rodio.toLocaleString() : 0})\``,
		];

		const EmbedMoney = new Discord.MessageEmbed()
			.setAuthor({
				name: "Balance",
				iconURL: message.author.displayAvatarURL({ dynamic: true }),
			})
			.addFields({
				name: `${client.data.emotes.Dollar} ┇ **__Banco__**`,
				value: `${Dinero && Dinero.banco ? Dinero.banco.toLocaleString() : 0}`,
			})
			.addFields({
				
				name: `${client.data.emotes.Money} ┇ **__Monedero__**`,
				value: `${Dinero && Dinero.monedero ? Dinero.monedero.toLocaleString() : 0}`,
			})
			.setThumbnail(
				message.guild.iconURL({
					dynamic: true,
					size: 2048,
					format: "png",
				}),
			)
			.setFooter({
				text: message.author.username,
				iconURL: message.author.displayAvatarURL({ dynamic: true }),
			})
			.setColor("6800FF");

		const EmbedMinerals = new Discord.MessageEmbed()
			.setAuthor({
				name: "Minerales",
				iconURL: message.author.displayAvatarURL({ dynamic: true }),
			})
			.setDescription(Array.join("\n"))
			.setThumbnail(
				message.guild.iconURL({
					dynamic: true,
					size: 2048,
					format: "png",
				}),
			)
			.setFooter({
				text: message.author.username,
				iconURL: message.author.displayAvatarURL({ dynamic: true }),
			})
			.setColor("6800FF");

		// Buttons

		let Button1 = new Discord.MessageButton()
			.setCustomId("backbtn")
			.setEmoji("⏪")
			.setStyle("DANGER");

		let Button2 = new Discord.MessageButton()
			.setCustomId("nextbtn")
			.setEmoji("⏩")
			.setStyle("SUCCESS");

		let pages = [EmbedMoney, EmbedMinerals];

		let buttons = [Button1, Button2];

		pagination(message, pages, buttons);

		async function pagination(
			interaction,
			pages,
			buttonList,
			timeout = 60000,
		) {
			let page = 0;

			const row = new Discord.MessageActionRow().addComponents(
				buttonList,
			);

			if (interaction.deferred == false) {
				await interaction.deferReply();
			}

			const curPage = await interaction.reply({
				embeds: [
					pages[page].setFooter({
						text: `Página ${page + 1} / ${pages.length}`,
					}),
				],
				components: [row],
				fetchReply: true,
			});

			const filter = (i) => {
				i.customId === buttonList[0].customId ||
					i.customId === buttonList[1].customId;

				if (i.user.id === interaction.author.id) return true;

				return i.reply({
					embeds: [
						new Discord.MessageEmbed()
							.setTitle(`▸  ${client.data.emotes.Error}┇  ERROR`)
							.setDescription(
								"Debes ejecutarlo tú al\ncomando para poder usarlo",
							)
							.setColor("RED"),
					],
					ephemeral: true,
				});
			};

			const collector = await curPage.createMessageComponentCollector({
				filter,
				time: timeout,
			});

			collector.on("collect", async (i) => {
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
					embeds: [
						pages[page].setFooter({
							text: `Página ${page + 1} / ${pages.length}`,
						}),
					],

					components: [row],
				});

				collector.resetTimer();
			});

			collector.on("end", () => {
				try {
					const disabledRow =
						new Discord.MessageActionRow().addComponents(
							buttonList[0].setDisabled(true),
							buttonList[1].setDisabled(true),
						);

					curPage.edit({
						embeds: [
							pages[page].setFooter({
								text: `Página ${page + 1} / ${pages.length}`,
							}),
						],
						components: [disabledRow],
					});
				} catch (e){}
			});

			return curPage;
		}
	},
};
