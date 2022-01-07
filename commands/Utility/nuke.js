const Discord = require('discord.js');

module.exports = {

    run: async (client, message, args) => {



        if (!message.member.permissions.has('ADMINISTRATOR')) return;

        try {

            message.channel.clone().then(async (ch) => {

                await ch.setParent(message.channel.parent.id);

                await ch.setPosition(message.channel.position);

                await ch.setTopic(message.channel.topic);

                await ch.setNSFW(message.channel.nsfw);

                await ch.setRateLimitPerUser(message.channel.rateLimitPerUser);

                message.channel.delete();

                const embed = new Discord.MessageEmbed()
                    .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
                    .setTitle('**__Canal Nukeado__**')
                    .setImage('https://i.pinimg.com/originals/c4/3e/f1/c43ef1eed9bbb73d800e6d1a6d50b208.gif')
                    .setColor('36393E')
                    .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                    .setTimestamp();

                ch.send({ embeds: [embed] });

            })
        } catch (e) { }
    }
}
