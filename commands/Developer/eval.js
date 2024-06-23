const Discord = require('discord.js');
const { inspect } = require('util');
const SendError = require('../../utils/error.js');
const SendEmbed = require('../../utils/embed.js');

module.exports = {

    run: async (client, message, args) => {



        let code = args.join(' ');

        if (!client.data.dev.includes(message.author.id)) return;

        if (!code) return;

        try {

            const evaled = await eval(`(async() => {${code}})()`).catch(() => null);

            message.reply("```js\n" + `(${typeof (evaled)}) ${inspect(evaled, { depth: 0 })}` + "```")

        } catch (e) {

            message.reply("```js\n" + `${e.name}: ${e.message}` + "```");

        }
    }
}