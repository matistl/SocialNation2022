const Discord = require("discord.js");

const { Client, Collection } = require("discord.js");

const client = new Client({ intents: 4615 });

module.exports = client;

const fs = require("fs");

const mongoose = require("mongoose");

client.commands = new Collection();

client.cooldowns = new Collection();

client.snipes = new Map();

client.blacklist = [];

client.data = {
    prefix: ".",
    dev: "756331043195191439",
    channelLogs: null,
    botGuild: "751236327563067494",
    suggestChannel: null,
    emotes: require("./utils/emotes.js"),
};


try {
    for (let folder of fs.readdirSync("./commands/")) {
        for (let file of fs.readdirSync(`./commands/${folder}`)) {
            if (file.endsWith(".js")) {
                let fileName = file.substring(0, file.length - 3);

                let fileContents = require(`./commands/${folder}/${file}`);

                client.commands.set(fileName, fileContents);
            }
        }
    }

    for (let file of fs.readdirSync("./events/")) {
        if (file.endsWith(".js")) {
            let fileName = file.substring(0, file.length - 3);

            let fileContents = require(`./events/${file}`);

            client.on(fileName, fileContents.bind(null, client));
        }
    }
} catch (err) {
    console.log(err);
}

mongoose
    .connect(
        "mongodb+srv://GN_Bot:IvEuppDgX9qPtmHB@gnbot.tquzh.mongodb.net/?retryWrites=true&w=majority&appName=GNBot",
        { useNewUrlParser: true, useUnifiedTopology: true },
    )
    .then(() => {
        console.log("Logged in MongoDB");
    });

client.login(
    process.env['TOKEN'],
);
