// Module
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { token, clientId, guildId, updateCommand } = require("config");

const rest = new REST({ version: "9" }).setToken(token);

module.exports = (client) => {
    client.handleCommands = async (commandsFolder, path) => {
        client.commandArrays = [];
        for (const file of commandsFolder) {
            const command = require(`../commands/${file}`);

            client.commands.set(command.data.name, command);
            client.commandArrays.push(command.data.toJSON());
        }

        try {
            // Production -> Deploy Global Commands
            // Development -> Deploy Guild Commands

            // updateCommand -> true: when you saved file it will update command | false: won't update command
            if (updateCommand) {
                console.log(process.env.NODE_ENV);
                if (process.env.NODE_ENV == "production") {
                    console.log("Started refreshing application global (/) commands.");

                    await rest.put(Routes.applicationCommands(clientId), {
                        body: client.commandArrays,
                    });

                    console.log("Successfully reloaded application global (/) commands.");
                } else {
                    console.log("Started refreshing application guilds (/) commands.");

                    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
                        body: client.commandArrays,
                    });

                    console.log("Successfully reloaded application guilds (/) commands.");
                }
            } else {
                console.log("You disabled reloaded application (/) commands.");
            }
        } catch (error) {
            console.error(error);
        }
    };
};
