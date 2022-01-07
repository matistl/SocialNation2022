const Discord = require('discord.js');

module.exports = (client, oldMessage, newMessage, args) => {


	if (newMessage.content.startsWith("=")) {

		client.emit('message', newMessage)

	};

	try {


		if (oldmessage.author.bot || oldMessage.guild?.id !== client.data.botGuild) return;

		let channel = client.channels.cache.get(client.data.channelLogs);

		if (!channel) return;

		let Alert = client.data.emotes.Alert;

		const embed = new Discord.MessageEmbed()
			.setTitle(`${Alert} | MENSAJE EDITADO`)
			.setThumbnail(oldmessage.author.displayAvatarURL({ dynamic: true }))
			.addField('Mensaje Anterior', `--> ${oldMessage.content || 'Sin contenido.'}`)
			.addField('Mensaje Nuevo', `--> ${newMessage.content || 'Sin contenido.'}`)
			.addField('Autor', `${oldmessage.author.tag} | ${oldmessage.author.id}`)
			.addField('Canal', `<#${oldMessage.channel.id}>`)
			.setColor('RED')
			.setTimestamp();

		channel.send({ embeds: [embed] });

	} catch (e) { }

}