// Require the necessary discord.js classes
const { Client, Intents, Collection } = require("discord.js");
const fs = require("fs");
const { token } = require("config");

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();

// functions events commands
const functions = fs.readdirSync("./functions").filter((file) => file.endsWith(".js"));
const events = fs.readdirSync("./events").filter((file) => file.endsWith(".js"));
const commands = fs.readdirSync("./commands");

(() => {
    // create handleCommands and handleEvents
    for (file of functions) {
        require(`./functions/${file}`)(client);
    }

    // Make Bot Online
    client.handleEvents(events, "./events");
    client.handleCommands(commands, "./commands");
    client.login(token);
})();
