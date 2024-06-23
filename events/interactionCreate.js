const ModelEconomy = require('../models/Economy_DB.js');
const Discord = require('discord.js');

module.exports = async (client, interaction) => {

	// Select Menu

	if (!interaction.isSelectMenu) return;

	// Exec # Top Command

	try {

		TopCommand();

		// Exec # Help Command

		HelpCommand();

	} catch (e) {

		console.log(e)

	}

	// # Top Command

	async function Sort(topType, topName, emoji, signo = false) {

		const SortArray = await ModelEconomy.find({ guild: interaction.guild.id }).sort([[topType, 'descending']]).limit(10);

		let Array = [];

		if (SortArray.length > 0) {

			for (let i = 0; i < SortArray.length; i++) {

				let Emote;

				if (!Array[0]) {

					Emote = client.data.emotes.Rank_One + '**)-** ';
				}

				if (Array[0] && !Array[1]) {

					Emote = client.data.emotes.Rank_Two + '**)-** ';

				}

				if (Array[0] && Array[1] && !Array[2]) {

					Emote = client.data.emotes.Rank_Three + '**)-** ';

				}

				if (Array[0] && Array[1] && Array[2]) {

					Emote = '**#' + (i + 1) + ')-** ';

				}

				Array.push(`${Emote + (await client.users.fetch(SortArray[i].user)).toString() + ` ${emoji} **${signo ? '$' : 'x'}${SortArray[i][topType].toLocaleString() || 0}**`}`)

			}

			const embed = new Discord.MessageEmbed()
				.setTitle(`▸  ${client.data.emotes.Bank} ┇  ${emoji} __TOP ${topName}__ ${emoji}`)
				.setDescription(Array.join('\n'))
				.setColor('6800FF')

			interaction.update({ embeds: [embed] })


		}

	}

	async function TopCommand() {

		if (interaction.customId === 'top_command_select_menu') {

			if (interaction.values[0] === 'monedero_option') {

				Sort('monedero', 'MONEDERO', client.data.emotes.Money, true);

			}


			if (interaction.values[0] === 'banco_option') {

				Sort('banco', 'BANCO', '💵', true);

			}

			if (interaction.values[0] === 'diamante_option') {

				Sort('diamante', 'DIAMANTE', client.data.emotes.Minerales.MineralDiamante)

			}

			if (interaction.values[0] === 'carbon_option') {

				Sort('carbon', 'CARBÓN', client.data.emotes.Minerales.MineralCarbon)

			}

			if (interaction.values[0] === 'oro_option') {

				Sort('oro', 'ORO', client.data.emotes.Minerales.MineralOro)

			}

			if (interaction.values[0] === 'cuarzo_option') {

				Sort('cuarzo', 'CUARZO', client.data.emotes.Minerales.MineralCuarzo)

			}

			if (interaction.values[0] === 'amatista_option') {

				Sort('amatista', 'AMATISTA', client.data.emotes.Minerales.MineralAmatista)

			}

			if (interaction.values[0] === 'ruby_option') {

				Sort('ruby', 'RUBY', client.data.emotes.Minerales.MineralRuby)

			}

			if (interaction.values[0] === 'esmeralda_option') {

				Sort('esmeralda', 'ESMERALDA', client.data.emotes.Minerales.MineralEsmeralda)

			}

			if (interaction.values[0] === 'plata_option') {

				Sort('plata', 'PLATA', client.data.emotes.Minerales.MineralPlata)

			}

			if (interaction.values[0] === 'cobre_option') {

				Sort('cobre', 'COBRE', client.data.emotes.Minerales.MineralCobre)

			}

			if (interaction.values[0] === 'rodio_option') {

				Sort('rodio', 'RODIO', client.data.emotes.Minerales.MineralRodio)

			}

		}
	}

	// # Help Command
	async function HelpCommand() {

		let ArrayDinero = [

			`**▸ 📆┇ ${client.data.prefix}weekly**`,
			`**▸ 🕙┇ ${client.data.prefix}daily**`,
			`**▸ 🧑‍🏭┇ ${client.data.prefix}work**`,
			`**▸ 🎰┇ ${client.data.prefix}slots**`,
			`**▸ 🌀┇ ${client.data.prefix}ruleta**`,
			`**▸ 🤓┇ ${client.data.prefix}memory**`,
			`**▸ ✊┇ ${client.data.prefix}rob**`,
			`**▸ ${client.data.emotes.Money}┇ ${client.data.prefix}coin**`,
			`**▸ 🐟┇ ${client.data.prefix}fish**`

		]

		let ArrayGestion = [

			`**▸ 🏦┇ ${client.data.prefix}dep**`,
			`**▸ 📊┇ ${client.data.prefix}top**`,
			`**▸ 💰┇ ${client.data.prefix}bal**`,
			`**▸ 💳┇ ${client.data.prefix}wd**`,
			`**▸ 👛┇ ${client.data.prefix}transfer**`,
			`**▸ 🫂┇ ${client.data.prefix}pay**`,

		]

		let ArrayDiamonds = [

			`**▸ 💰┇ ${client.data.prefix}itemsprice**`,
			`**▸ 💳┇ ${client.data.prefix}buyitem**`,
			`**▸ 💵┇ ${client.data.prefix}sellitem**`,
			`**▸ 💸┇ ${client.data.prefix}payitem**`

		]

		let ArrayMercado = [

			`**▸ ⚖️┇ ${client.data.prefix}mercado**`,
			`**▸ 💴┇ ${client.data.prefix}sellcolor**`,
			`**▸ 💶┇ ${client.data.prefix}removecolor**`,
			`**▸ 💷┇ ${client.data.prefix}buymercado**`,
			`**▸ 🤑┇ ${client.data.prefix}buy**`,
			`**▸ 🛍️┇ ${client.data.prefix}shop**`,
			`**▸ 🛒┇ ${client.data.prefix}roles**`,
			`**▸ 🚩┇ ${client.data.prefix}use**`,
		]

		let Bank = client.data.emotes.Bank;

		if (interaction.customId === 'help_command_select_menu') {

			if (interaction.values[0] === 'one_option') {

				let Embed = new Discord.MessageEmbed()
					.setAuthor(interaction.guild.name, interaction.guild.iconURL({ dynamic: true }))
					.setTitle(`▸	${Bank} ┇ GANAR DINERO`)
					.setDescription(`${ArrayDinero.join('\n')}`)
					.setFooter(interaction.guild.name, interaction.guild.iconURL({ dynamic: true }))
					.setColor('6800FF')

				interaction.update({ embeds: [Embed] });

			}


			if (interaction.values[0] === 'two_option') {

				let Embed = new Discord.MessageEmbed()
					.setAuthor(interaction.guild.name, interaction.guild.iconURL({ dynamic: true }))
					.setTitle(`▸	${Bank} ┇ GESTIONAR DINERO`)
					.setDescription(`${ArrayGestion.join('\n')}`)
					.setFooter(interaction.guild.name, interaction.guild.iconURL({ dynamic: true }))
					.setColor('6800FF')

				interaction.update({ embeds: [Embed] });

			}

			if (interaction.values[0] === 'three_option') {

				let Embed = new Discord.MessageEmbed()
					.setAuthor(interaction.guild.name, interaction.guild.iconURL({ dynamic: true }))
					.setTitle(`▸	${Bank} ┇ GESTIONAR MINERALES`)
					.setDescription(`${ArrayDiamonds.join('\n')}`)
					.setFooter(interaction.guild.name, interaction.guild.iconURL({ dynamic: true }))
					.setColor('6800FF')

				interaction.update({ embeds: [Embed] });

			}

			if (interaction.values[0] === 'four_option') {

				let Embed = new Discord.MessageEmbed()
					.setAuthor(interaction.guild.name, interaction.guild.iconURL({ dynamic: true }))
					.setTitle(`▸	${Bank} ┇ GESTIONAR ROLES`)
					.setDescription(`${ArrayMercado.join('\n')}`)
					.setFooter(interaction.guild.name, interaction.guild.iconURL({ dynamic: true }))
					.setColor('6800FF')

				interaction.update({ embeds: [Embed] });

			}


		}
	}

}
