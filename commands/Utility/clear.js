const Discord = require('discord.js');
const ModelEconomy = require('../../models/Economy_DB.js');
const SendError = require('../../utils/error.js');
const SendEmbed = require('../../utils/embed.js');


module.exports = {

    run: async (client, message, args) => {


        if (!message.member.permissions.has('MANAGE_MESSAGES')) return SendError('Necesitas permisos de gestionar mensajes.', message);

        if (!args[0]) return SendError('Especifica una cantidad.', message);

        let number = parseInt(args[0])

        if (isNaN(number)) return SendError('Eso no es un número, fíjate bien\nque cantidad quieres borrar', message);

        if (number < 1) return SendError('No puedes borrar cantidades\nmenor a 1.', message);

        if (number > 1000) return SendError('No puedo borrar más de 1k de mensajes.', message);

        if (number > 100) {

            await clear(number).catch((e) => {

                message.reply(`${client.data.emotes.Error} | No puedo borrar mensajes pasados los 14 días.`);

            })

        } else {

            await message.channel.bulkDelete(number).catch((e) => {

                message.reply(`${client.data.emotes.Error} | No puedo borrar mensajes pasados los 14 días.`);

            })

        }

        message.reply(`${client.data.emotes.Lupa} | Borré **${(number)}** mensajes.`);

        async function clear(number) {

            let max = 100

            let array = []

            if (number < 100) array.push(number)

            for (let i = 0; i <= number; i++) {

                if (i === max) {

                    array.push(100)

                    max = max + 100

                }
            }

            for (let bulk of array) {

                await Discord.Util.delayFor(2000)

                message.channel.bulkDelete(bulk).catch(() => { })

            }
        }

    }

}