const Discord = require('discord.js');

module.exports = {


	run: async (client, message, args) => {


		if (!client.data.dev.includes(message.author.id)) return;

		if (!args[0]) return;

		try {

			let res = require('child_process').execSync(args.join(' ')).toString();

			res = res.split('').reverse().slice(0, 1900).reverse().join('')

			message.reply(res, { code: 'js' }).catch(() => { })

		} catch (err) {

			message.reply(err, { code: 'js' }).catch(() => { });

		}

		console.clear();

	}
}