const Discord = require('discord.js');
const { Client, MessageEmbed } = require('discord.js');

module.exports = {

	run: async (client, message, args) => {

		if (!message.member.permissions.has('ADMINISTRATOR')) return;

		let embed = new MessageEmbed()
			.setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
			.setDescription(args.join(' ') ? args.join(' ') : 'Sin Argumentos.')
			.setImage(message.attachments.first() ? message.attachments.first().proxyURL : null)
			.setFooter(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
			.setColor(0x8213B4)

		try {

			message.channel.send({ embeds: [embed] });
			message.delete();

		} catch (e) { }
	}
}