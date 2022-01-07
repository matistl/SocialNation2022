const Discord = require('discord.js');

module.exports = async (client, oldUser, newUser) => {


	let channel = client.channels.cache.get(client.data.channeLogs);

	if (!channel) return;

	let Alert = client.data.emotes.Alert;

	if (oldUser.displayAvatarURL() !== newUser.displayAvatarURL()) {

		const embed = new Discord.MessageEmbed()
			.setTitle(`${Alert} | AVATAR MODIFICADO`)
			.setThumbnail(newUser.displayAvatarURL({ dynamic: true }))
			.setDescription(`__${oldUser.username}__ **Modificó su avatar**\n\n--> [Antiguo Avatar](${oldUser.displayAvatarURL({ dynamic: true })}) \n--> [Nuevo Avatar](${newUser.displayAvatarURL({ dynamic: true })})`)
			.setColor('RED')
			.setTimestamp()
			.setFooter(oldUser.username + " | " + oldUser.id)

		return channel.send({ embeds: [embed] })

	}

	if (oldUser.username !== newUser.username) {

		const embed = new Discord.MessageEmbed()
			.setTitle(`${Alert}	| USERNAME MODIFICADO`)
			.setThumbnail(newUser.displayAvatarURL({ dynamic: true }))
			.setDescription(`__${oldUser.username}__ **Modificó su username**\n\n--> Antiguo username: \`${oldUser.username}\`\n--> Nuevo username: \`${newUser.username}\``)
			.setColor('RED')
			.setTimestamp()
			.setFooter(oldUser.username + " | " + oldUser.id)

		return channel.send({ embeds: [embed] })

	}

}