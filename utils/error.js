const Discord = require('discord.js');
const client = require('../index.js');
const Error = client.data.emotes.Error;

module.exports = async (text, message) => {

	let embed = new Discord.MessageEmbed()
		.setTitle(`▸  ${Error} ┇  ERROR`)
		.setDescription(text)
		.setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048, format: 'png' }))
		.setFooter({ text: message.author.username,  iconURL: message.author.displayAvatarURL({ dynamic: true })})
		.setColor('RED')

	await message.reply({ embeds: [embed] })

}