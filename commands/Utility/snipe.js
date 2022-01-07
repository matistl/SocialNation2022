const Discord = require('discord.js');
const ms = require('ms');
const SendError = require('../../utils/error.js');

module.exports = {


	run: async (client, message, args) => {


		let ERROR = client.data.emotes.Error;

		let msg = client.snipes.get(message.channel.id);

		if (!message.member.permissions.has('ADMINISTRATOR') && !client.data.dev.includes(message.author.id)) return message.reply(`${client.data.emotes.Error} | No tienes permisos.`);

		if (!msg) return SendError('No hay un mensaje borrado\nrecientemente en el canal.', message);

		let embed = new Discord.MessageEmbed()
			.setTitle(`▸  ┇ SNIPE`)
			.addField(`▸ Canal:`, `<#${msg.Canal}>`)
			.addField(`▸ Mensaje de:`, `${msg.Author}`)
			.addField(`▸ Contenido:`, `\`${msg.Content}\``)
			.addField(`▸ Tiempo:`, `Hace ${ms(Date.now() - msg.Hora)}`)
			.setThumbnail(message.guild.iconURL({ dynamic: true, size: 1024, format: 'png' }))
			.setFooter(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
			.setColor('6800FF')

		message.reply({ embeds: [embed] }).catch(e => { })


	}
}