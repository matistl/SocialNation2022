const Discord = require('discord.js');
const SendError = require('../../utils/error.js');
const SendEmbed = require('../../utils/embed.js');
const ModelEconomy = require('../../models/Economy_DB.js');

module.exports = {

	run: async (client, message, args) => {


		let Bank = client.data.emotes.Bank;

		let embed = new Discord.MessageEmbed()
			.setTitle(`▸  ${Bank} ┇  TOP`)
			.setDescription(`Selecciona el tipo de top que\nquieres ver en el menú de abajo.`)
			.setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048, format: 'png' }))
			.setFooter(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
			.setColor('6800FF')

		const row = new Discord.MessageActionRow()
			.addComponents(new Discord.MessageSelectMenu()
				.setCustomId('top_command_select_menu')
				.setPlaceholder('Nada seleccionado.')
				.addOptions([
					{
						label: 'Monedero',
						emoji: `${client.data.emotes.Money}`,
						description: 'Inspecciona el top de monedero.',
						value: 'monedero_option',
					},
					{
						label: 'Banco',
						emoji: `💵`,
						description: 'Inspecciona el top de banco.',
						value: 'banco_option',
					},
					{
						label: 'Diamante',
						emoji: `${client.data.emotes.Minerales.MineralDiamante}`,
						description: 'Inspecciona el top de diamante.',
						value: 'diamante_option',
					},
					{
						label: 'Carbón',
						emoji: `${client.data.emotes.Minerales.MineralCarbon}`,
						description: 'Inspecciona el top de carbón.',
						value: 'carbon_option',
					},
					{
						label: 'Oro',
						emoji: `${client.data.emotes.Minerales.MineralOro}`,
						description: 'Inspecciona el top de oro.',
						value: 'oro_option',
					},
					{
						label: 'Cuarzo',
						emoji: `${client.data.emotes.Minerales.MineralCuarzo}`,
						description: 'Inspecciona el top de cuarzos.',
						value: 'cuarzo_option',
					},
					{
						label: 'Amatista',
						emoji: `${client.data.emotes.Minerales.MineralAmatista}`,
						description: 'Inspecciona el top de amatista.',
						value: 'amatista_option',
					},
					{
						label: 'Ruby',
						emoji: `${client.data.emotes.Minerales.MineralRuby}`,
						description: 'Inspecciona el top de ruby.',
						value: 'ruby_option',
					},
					{
						label: 'Esmeralda',
						emoji: `${client.data.emotes.Minerales.MineralEsmeralda}`,
						description: 'Inspecciona el top de esmeralda.',
						value: 'esmeralda_option',
					},
					{
						label: 'Plata',
						emoji: `${client.data.emotes.Minerales.MineralPlata}`,
						description: 'Inspecciona el top de plata.',
						value: 'plata_option',
					},
					{
						label: 'Cobre',
						emoji: `${client.data.emotes.Minerales.MineralCobre}`,
						description: 'Inspecciona el top de cobre.',
						value: 'cobre_option',
					},
					{
						label: 'Rodio',
						emoji: `${client.data.emotes.Minerales.MineralRodio}`,
						description: 'Inspecciona el top de rodio.',
						value: 'rodio_option',
					},
				]),
			);

		message.reply({ embeds: [embed], components: [row] }).then((msg) => {

			setTimeout(() => {

				row.components[0].setDisabled(true)

				msg.edit({ components: [row] })

			}, 60000)

		})
	}
};