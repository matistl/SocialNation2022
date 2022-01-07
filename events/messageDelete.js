const Discord = require('discord.js');

module.exports = (client, message) => {

	if (message.author.id === client.user.id) return;

	client.snipes.set(message.channel.id, {

		Author: message.author.tag,
		Content: message.content,
		Canal: message.channel.id,
		Hora: Date.now()

	})

	try {

		if (message.author.bot || message.guild?.id !== client.data.botGuild) return;

		let channel = client.channels.cache.get(client.data.channelLogs);

		if (!channel) return;

		let Alert = client.data.emotes.Alert;

		const embed = new Discord.MessageEmbed()
			.setTitle(`${Alert} | MENSAJE ELIMINADO`)
			.setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
			.addField('Mensaje', `--> ${message.content}`)
			.addField('Autor', `${message.author.tag} | ${message.author.id}`)
			.addField('Canal', `<#${message.channel.id}>`)
			.setColor('RED')
			.setTimestamp()

		channel.send({ embeds: [embed] })


	} catch (e) { }
}
