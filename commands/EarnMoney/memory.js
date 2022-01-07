const Discord = require('discord.js');
const ModelEconomy = require('../../models/Economy_DB.js');
const ModelCooldown = require('../../models/Cooldown_All.js');
const SendError = require('../../utils/error.js');
const SendEmbed = require('../../utils/embed.js');
const ms = require('ms');
const pretty = require('pretty-ms');


module.exports = {

    run: async (client, message, args) => {


        let Cantidad = args[0];

        let EconomyGet = await ModelEconomy.findOne({ guild: message.guild.id, user: message.author.id })

        let Cooldown = await ModelCooldown.findOne({ guild: message.guild.id, user: message.author.id });

        let MS = ms('10m');

        if (Cooldown && Cooldown.Memory.Tiempo && Cooldown.Memory.Tiempo && Date.now() < Cooldown.Memory.Tiempo) {

            let Restante = pretty(Cooldown.Memory.Tiempo - Date.now(), { verbose: true, millisecondsDecimalDigits: 0, secondsDecimalDigits: 0 }).replace('hours', 'h').replace('minutes', 'm y').replace('seconds', 's').replace('hour ', 'h').replace('minute ', 'm')

            return SendError(`Tienes que esperar **${Restante}**\npara volver a apostar en el memorama.`, message);

        }

        if (!Cantidad) return SendError('Especifica una cantidad\npara apostar en el memorama.', message);

        if (isNaN(Cantidad) || Cantidad.startsWith('.') || Cantidad.startsWith('-') || ['-', '.'].some(x => Cantidad.toLowerCase().includes(x))) return SendError('Especifica un\nnúmero válido', message);

        if (parseInt(Cantidad) > EconomyGet.monedero) return SendError('No tienes esa cantidad de dinero\nen tu monedero.', message);

        if (parseInt(Cantidad) < 1) return SendError('Debes apostar una cantidad mayor.', message);

        if (parseInt(Cantidad) > 10000) return SendError(`No puedes apostar\nmás de ${client.data.emotes.Money} **$5,000**.`, message);

        let Datos = {

            user: {

                intentos: 3

            }
        }


        let ButtonsSelect = [];

        let Emotes = [
            '🍧', '🍟', '🍔', '🚕', '🌙', '🎃',
            '🎅', '🎄', '💎', '🌈', '🌠', '🌄',
            '😈', '🎉', '🎍', '🎋', '🎒', '🎏'
        ];

        let Array = [];

        let DeleteArray = [];

        let ArrayLugares = [0, 1, 2, 3, 4, 5];

        let Lugares = [];

        let DeleteLugares = [];


        await EmojisF();

        await LugaresF();

        const Button1 = new Discord.MessageButton().setEmoji(Array[Lugares[0]]).setStyle('PRIMARY').setCustomId('EmojiMemory1').setDisabled(true);
        const Button2 = new Discord.MessageButton().setEmoji(Array[Lugares[1]]).setStyle('PRIMARY').setCustomId('EmojiMemory2').setDisabled(true);
        const Button3 = new Discord.MessageButton().setEmoji(Array[Lugares[2]]).setStyle('PRIMARY').setCustomId('EmojiMemory3').setDisabled(true);
        const Button4 = new Discord.MessageButton().setEmoji(Array[Lugares[3]]).setStyle('PRIMARY').setCustomId('EmojiMemory4').setDisabled(true);

        const Row1 = new Discord.MessageActionRow().addComponents(Button1, Button2, Button3, Button4)

        const Button5 = new Discord.MessageButton().setEmoji(Array[Lugares[4]]).setStyle('PRIMARY').setCustomId('EmojiMemory5').setDisabled(true);
        const Button6 = new Discord.MessageButton().setEmoji(Array[Lugares[5]]).setStyle('PRIMARY').setCustomId('EmojiMemory6').setDisabled(true);
        const Button7 = new Discord.MessageButton().setEmoji(Array[Lugares[0]]).setStyle('PRIMARY').setCustomId('EmojiMemory7').setDisabled(true);
        const Button8 = new Discord.MessageButton().setEmoji(Array[Lugares[1]]).setStyle('PRIMARY').setCustomId('EmojiMemory8').setDisabled(true);

        const Row2 = new Discord.MessageActionRow().addComponents(Button5, Button6, Button7, Button8)

        const Button9 = new Discord.MessageButton().setEmoji(Array[Lugares[2]]).setStyle('PRIMARY').setCustomId('EmojiMemory9').setDisabled(true);
        const Button10 = new Discord.MessageButton().setEmoji(Array[Lugares[3]]).setStyle('PRIMARY').setCustomId('EmojiMemory10').setDisabled(true);
        const Button11 = new Discord.MessageButton().setEmoji(Array[Lugares[4]]).setStyle('PRIMARY').setCustomId('EmojiMemory11').setDisabled(true);
        const Button12 = new Discord.MessageButton().setEmoji(Array[Lugares[5]]).setStyle('PRIMARY').setCustomId('EmojiMemory12').setDisabled(true);

        const Row3 = new Discord.MessageActionRow().addComponents(Button9, Button10, Button11, Button12)

        message.reply({ content: `${client.data.emotes.Alert} Tienes 3 intentos, o pierdes.`, components: [Row1, Row2, Row3] }).then(async (msg) => {

            let ComponentsArray = [

                msg.components[0].components[0],
                msg.components[0].components[1],
                msg.components[0].components[2],
                msg.components[0].components[3],
                msg.components[1].components[0],
                msg.components[1].components[1],
                msg.components[1].components[2],
                msg.components[1].components[3],
                msg.components[2].components[0],
                msg.components[2].components[1],
                msg.components[2].components[2],
                msg.components[2].components[3]

            ]

            const Button1 = new Discord.MessageButton().setEmoji('➖').setStyle('PRIMARY').setCustomId('Cubierto_EmojiMemory1');
            const Button2 = new Discord.MessageButton().setEmoji('➖').setStyle('PRIMARY').setCustomId('Cubierto_EmojiMemory2');
            const Button3 = new Discord.MessageButton().setEmoji('➖').setStyle('PRIMARY').setCustomId('Cubierto_EmojiMemory3');
            const Button4 = new Discord.MessageButton().setEmoji('➖').setStyle('PRIMARY').setCustomId('Cubierto_EmojiMemory4');

            const Row1 = new Discord.MessageActionRow().addComponents(Button1, Button2, Button3, Button4)

            const Button5 = new Discord.MessageButton().setEmoji('➖').setStyle('PRIMARY').setCustomId('Cubierto_EmojiMemory5');
            const Button6 = new Discord.MessageButton().setEmoji('➖').setStyle('PRIMARY').setCustomId('Cubierto_EmojiMemory6');
            const Button7 = new Discord.MessageButton().setEmoji('➖').setStyle('PRIMARY').setCustomId('Cubierto_EmojiMemory7');
            const Button8 = new Discord.MessageButton().setEmoji('➖').setStyle('PRIMARY').setCustomId('Cubierto_EmojiMemory8');

            const Row2 = new Discord.MessageActionRow().addComponents(Button5, Button6, Button7, Button8)

            const Button9 = new Discord.MessageButton().setEmoji('➖').setStyle('PRIMARY').setCustomId('Cubierto_EmojiMemory9');
            const Button10 = new Discord.MessageButton().setEmoji('➖').setStyle('PRIMARY').setCustomId('Cubierto_EmojiMemory10');
            const Button11 = new Discord.MessageButton().setEmoji('➖').setStyle('PRIMARY').setCustomId('Cubierto_EmojiMemory11');
            const Button12 = new Discord.MessageButton().setEmoji('➖').setStyle('PRIMARY').setCustomId('Cubierto_EmojiMemory12');

            const Row3 = new Discord.MessageActionRow().addComponents(Button9, Button10, Button11, Button12)

            let ComponentsArrayCubierts = [

                Row1.components[0],
                Row1.components[1],
                Row1.components[2],
                Row1.components[3],
                Row2.components[0],
                Row2.components[1],
                Row2.components[2],
                Row2.components[3],
                Row3.components[0],
                Row3.components[1],
                Row3.components[2],
                Row3.components[3]

            ]

            setTimeout(async () => {

                await msg.edit({ content: `${client.data.emotes.Alert} Intentos **3/3**`, components: [Row1, Row2, Row3] })

            }, 8000)

            Cooldown.Memory.Tiempo = Date.now() + MS

            await Cooldown.save();

            ButtonInteraction(msg, ComponentsArray, ComponentsArrayCubierts)

        })

        async function ButtonInteraction(msg, ComponentsArray, ComponentsArrayCubierts) {


            const filter = m => m;
            const collector = msg.createMessageComponentCollector({ filter, idle: 120000 });

            collector.on('collect', async btn => {

                await btn.deferUpdate();

                if (btn.user.id !== message.author.id) {

                    const embed = new Discord.MessageEmbed()
                        .setTitle(`▸  ${client.data.emotes.Error}┇ ERROR`)
                        .setColor('RED')
                        .setDescription('Para jugar debes ejecutar\ntú mismo el comando.')
                        .setFooter(message.author.username, message.author.displayAvatarURL({ dynamic: true }))

                    return btn.reply({ embeds: [embed], ephemeral: true })

                }

                collector.resetTimer();

                let EmojiSeleccionado = ComponentsArray.find(x => x.customId === btn.customId.split('_')[1])

                await ButtonsSelect.push({ id: EmojiSeleccionado.customId, idCubiert: btn.customId, emoji: EmojiSeleccionado.emoji.name });

                if ((ButtonsSelect[0] && ButtonsSelect[1]) && ButtonsSelect[0].emoji !== ButtonsSelect[1].emoji) {

                    ButtonsSelect = [];

                    Datos.user.intentos -= 1;

                    if (Datos.user.intentos === 0) {

                        Datos = {};

                        const Row1Edit = new Discord.MessageActionRow().addComponents((ComponentsArrayCubierts[0]).setDisabled(true), (ComponentsArrayCubierts[1]).setDisabled(true), (ComponentsArrayCubierts[2]).setDisabled(true), (ComponentsArrayCubierts[3]).setDisabled(true))

                        const Row2Edit = new Discord.MessageActionRow().addComponents((ComponentsArrayCubierts[4]).setDisabled(true), (ComponentsArrayCubierts[5]).setDisabled(true), (ComponentsArrayCubierts[6]).setDisabled(true), (ComponentsArrayCubierts[7]).setDisabled(true))

                        const Row3Edit = new Discord.MessageActionRow().addComponents((ComponentsArrayCubierts[8]).setDisabled(true), (ComponentsArrayCubierts[9]).setDisabled(true), (ComponentsArrayCubierts[10]).setDisabled(true), (ComponentsArrayCubierts[11]).setDisabled(true))

                        await collector.stop();

                        EconomyGet.monedero -= parseInt(Cantidad);

                        return msg.edit({ content: `${client.data.emotes.Error} Perdiste, te quedaste sin intentos y se te resta ${client.data.emotes.Money} **${parseInt(Cantidad).toLocaleString()}** del monedero.`, components: [Row1Edit, Row2Edit, Row3Edit] })


                    }

                    msg.edit({ content: `${client.data.emotes.Alert} Intentos **${Datos.user.intentos}/3**` })

                }

                if ((ButtonsSelect[0] && ButtonsSelect[1]) && ButtonsSelect[0].emoji === ButtonsSelect[1].emoji && ButtonsSelect[0].idCubiert !== ButtonsSelect[1].idCubiert) {

                    ComponentsArrayCubierts.map((x) => {

                        if (x.customId === ButtonsSelect[0].idCubiert) {

                            x.emoji.name = ButtonsSelect[0].emoji;
                            x.custom_id = x.customId.split[1];
                            x.setDisabled(true);

                        }

                        if (x.customId === ButtonsSelect[1].idCubiert) {

                            x.emoji.name = ButtonsSelect[0].emoji;
                            x.custom_id = x.customId.split[1];
                            x.setDisabled(true);

                        }

                        return x;

                    })



                    const Row1Edit = new Discord.MessageActionRow().addComponents(ComponentsArrayCubierts[0], ComponentsArrayCubierts[1], ComponentsArrayCubierts[2], ComponentsArrayCubierts[3])

                    const Row2Edit = new Discord.MessageActionRow().addComponents(ComponentsArrayCubierts[4], ComponentsArrayCubierts[5], ComponentsArrayCubierts[6], ComponentsArrayCubierts[7])

                    const Row3Edit = new Discord.MessageActionRow().addComponents(ComponentsArrayCubierts[8], ComponentsArrayCubierts[9], ComponentsArrayCubierts[10], ComponentsArrayCubierts[11])

                    msg.edit({ components: [Row1Edit, Row2Edit, Row3Edit] })

                    if (CheckGame(ComponentsArrayCubierts) === true) {

                        msg.edit({ content: `${client.data.emotes.Rank_One} Ganaste el juego y por eso ganas ${client.data.emotes.Money} **$${parseInt(Cantidad).toLocaleString()}** de dinero a tú monedero.` })

                        EconomyGet.monedero += parseInt(Cantidad);

                        await EconomyGet.save();

                    }

                    ButtonsSelect = [];
                }

            })

            collector.on('end', async (collected) => {

                const Row1Edit = new Discord.MessageActionRow().addComponents((ComponentsArrayCubierts[0]).setDisabled(true), (ComponentsArrayCubierts[1]).setDisabled(true), (ComponentsArrayCubierts[2]).setDisabled(true), (ComponentsArrayCubierts[3]).setDisabled(true))

                const Row2Edit = new Discord.MessageActionRow().addComponents((ComponentsArrayCubierts[4]).setDisabled(true), (ComponentsArrayCubierts[5]).setDisabled(true), (ComponentsArrayCubierts[6]).setDisabled(true), (ComponentsArrayCubierts[7]).setDisabled(true))

                const Row3Edit = new Discord.MessageActionRow().addComponents((ComponentsArrayCubierts[8]).setDisabled(true), (ComponentsArrayCubierts[9]).setDisabled(true), (ComponentsArrayCubierts[10]).setDisabled(true), (ComponentsArrayCubierts[11]).setDisabled(true))


                if (CheckGame(ComponentsArrayCubierts) === false && Datos.user.intentos > 0) {

                    EconomyGet.monedero -= parseInt(Cantidad);

                    return msg.edit({ content: `${client.data.emotes.Error} Perdiste, te quedaste sin tiempo y se te resta ${client.data.emotes.Money} **${Cantidad.toLocaleString()}** del monedero.`, components: [Row1Edit, Row2Edit, Row3Edit] })

                }

            })

        }

        function EmojisF() {
            for (let i = 0; i < 6; i++) {

                let RandomEmote = (Emotes.filter(x => !DeleteArray.includes(x)))[Math.floor(Math.random() * (Emotes.filter(x => !DeleteArray.includes(x))).length)];

                Array.push(RandomEmote)
                DeleteArray.push(RandomEmote)

            }

        }

        function CheckGame(ComponentsArrayCubierts) {

            if (ComponentsArrayCubierts[0].disabled === true &&
                ComponentsArrayCubierts[1].disabled === true &&
                ComponentsArrayCubierts[2].disabled === true &&
                ComponentsArrayCubierts[3].disabled === true &&
                ComponentsArrayCubierts[4].disabled === true &&
                ComponentsArrayCubierts[5].disabled === true &&
                ComponentsArrayCubierts[6].disabled === true &&
                ComponentsArrayCubierts[7].disabled === true &&
                ComponentsArrayCubierts[8].disabled === true &&
                ComponentsArrayCubierts[9].disabled === true &&
                ComponentsArrayCubierts[10].disabled === true &&
                ComponentsArrayCubierts[11].disabled === true) {

                return true;

            } else {

                return false;

            }

        }

        function LugaresF() {
            for (let i = 0; i < 6; i++) {

                let RandomLugares = (ArrayLugares.filter(x => !DeleteLugares.includes(x)))[Math.floor(Math.random() * (ArrayLugares.filter(x => !DeleteLugares.includes(x))).length)];

                Lugares.push(RandomLugares)
                DeleteLugares.push(RandomLugares)

            }

        }

    }

}