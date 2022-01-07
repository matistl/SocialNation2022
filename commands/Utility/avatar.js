const Discord = require('discord.js');
const ModelEconomy = require('../../models/Economy_DB.js');
const SendError = require('../../utils/error.js');
const SendEmbed = require('../../utils/embed.js');


module.exports = {

	run: async (client, message, args) => {


		let user = message.mentions.users.first() || message.author;

		const Embed = new Discord.MessageEmbed()
			.setTitle("Avatar de " + user.tag)
			.setImage(user.displayAvatarURL({ dynamic: true, size: 4096 }))
			.setColor("6800FF")
			.setFooter('Pedido por: ' + message.author.tag)

		message.reply({ embeds: [Embed] })

	}

}