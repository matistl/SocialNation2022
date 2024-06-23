const Discord = require('discord.js');
const SendError = require('../../utils/error.js');
const SendEmbed = require('../../utils/embed.js');

module.exports = {

	run: async (client, message, args) => {


		let Bank = client.data.emotes.Bank;

		let embed = new Discord.MessageEmbed()
			.setTitle(`▸  ${Bank} ┇  HELP`)
			.setDescription(`Selecciona el tipo de comandos que\nquieres ver en el menú de abajo.`)
			.setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048, format: 'png' }))
			.setFooter({ text: message.author.username,  iconURL: message.author.displayAvatarURL({ dynamic: true })})
			.setColor('6800FF')

		const row = new Discord.MessageActionRow()
			.addComponents(new Discord.MessageSelectMenu()
				.setCustomId('help_command_select_menu')
				.setPlaceholder('Nada seleccionado.')
				.addOptions([
					{
						label: 'Ganar Dinero',
						emoji: `${client.data.emotes.Money}`,
						description: 'Comandos para ganar dinero',
						value: 'one_option',
					},
					{
						label: 'Gestionar Dinero',
						emoji: `${client.data.emotes.Dollar}`,
						description: 'Comandos para gestionar dinero.',
						value: 'two_option',
					},
					{
						label: 'Gestionar Minerales',
						emoji: `${client.data.emotes.Minerales.MineralCarbon}`,
						description: 'Comandos para gestionar  minerales.',
						value: 'three_option',
					},
					{
						label: 'Gestionar Mercado',
						emoji: `⚖️`,
						description: 'Comandos para gestionar tus roles.',
						value: 'four_option',
					},
				]),
			);

		message.channel.send({ embeds: [embed], components: [row] }).then((msg) => {

			setTimeout(() => {

				row.components[0].setDisabled(true)

				msg.edit({ components: [row] })

			}, 60000)

		})
	}
};