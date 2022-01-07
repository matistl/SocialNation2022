const Discord = require('discord.js');
const client = require('../index.js');
const { MessageEmbed } = require('discord.js');
const Error = client.data.emotes.Error;

module.exports = async (text, message) => {

	let embed = new MessageEmbed()
		.setTitle(`▸  ${Error} ┇  ERROR`)
		.setDescription(text)
		.setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048, format: 'png' }))
		.setFooter(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
		.setColor('RED')

	await message.reply({ embeds: [embed] })

}