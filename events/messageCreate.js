const Discord = require('discord.js');
const ModelEconomy = require('../models/Economy_DB.js');
const ModelRoles = require('../models/Economy_Roles.js');
const ModelMercader = require('../models/Economy_Mercader.js');
const ModelCooldown = require('../models/Cooldown_All.js');

module.exports = async (client, message) => {


	let prefix = client.data.prefix;

	if (message.author.bot) return;

	if (!message.content.startsWith(prefix)) return;

	let args = message.content.slice(prefix.length).trim().split(/ +/g);
	let command = args.shift().toLowerCase();

	if (message.channel.type === 'dm') return;

	let cmd = client.commands.get(command);

	if (!cmd) return;

	let Dinero = await ModelEconomy.findOne({ guild: message.guild.id, user: message.author.id });

	let Role = await ModelRoles.findOne({ guild: message.guild.id, user: message.author.id });

	let Mercader = await ModelMercader.findOne({ guild: message.guild.id, user: message.author.id })

	let Cooldown = await ModelCooldown.findOne({ guild: message.guild.id, user: message.author.id })

	if (!Dinero) await ModelEconomy.create({ guild: message.guild.id, user: message.author.id })

	if (!Role) await ModelRoles.create({ guild: message.guild.id, user: message.author.id })

	if (!Mercader) await ModelMercader.create({ guild: message.guild.id, user: message.author.id })

	if (!Cooldown) await ModelCooldown.create({ guild: message.guild.id, user: message.author.id })

	if (message.mentions.users.first()) {

		let RoleMention = await ModelRoles.findOne({ guild: message.guild.id, user: message.mentions.users.first().id });

		let DineroMention = await ModelEconomy.findOne({ guild: message.guild.id, user: message.mentions.users.first().id });

		let Mercader = await ModelMercader.findOne({ guild: message.guild.id, user: message.mentions.users.first().id });

		let Cooldown = await ModelCooldown.findOne({ guild: message.guild.id, user: message.mentions.users.first().id })

		if (!DineroMention) await ModelEconomy.create({ guild: message.guild.id, user: message.mentions.users.first().id })

		if (!RoleMention) await ModelRoles.create(({ guild: message.guild.id, user: message.mentions.users.first().id }))

		if (!Mercader) await ModelMercader.create({ guild: message.guild.id, user: message.mentions.users.first().id })

		if (!Cooldown) await ModelCooldown.create({ guild: message.guild.id, user: message.mentions.users.first().id })
	}

	try {

		cmd.run(client, message, args);

	} catch (e) {

		console.log(e);

	}

};