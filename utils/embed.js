const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const client = require('../index.js');

module.exports = async (title, text, message) => {

	let Bank = client.data.emotes.Bank;

	let embed = new MessageEmbed()
		.setTitle(`▸  ${Bank} ┇  ${title}`)
		.setDescription(text)
		.setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048, format: 'png' }))
		.setFooter(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
		.setColor('6800FF')


	await message.reply({ embeds: [embed] })

}