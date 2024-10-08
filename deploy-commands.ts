import {
    parseCommandFiles
} from "./src/command";

import {
    Client,
    Events,
    Routes,
} from "discord.js";

const commands = [];
for (const command of parseCommandFiles()) {
    if (!command.command.enabled) continue;

    if (command.command.slash != undefined) {
        commands.push(command.command.slash.toJSON());
    }

    if (command.command.context != undefined) {
        commands.push(command.command.context.toJSON())
    }
}

const client = new Client({ intents: [] });

client.on(Events.ClientReady, async (ready) => {
    ready.user.setStatus('invisible');
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands for ${ready.user.username}.`);

        client.rest.put(
            Routes.applicationCommands(ready.user.id),
            { body: commands },
        );

        console.log("Successfully reloaded application (/) commands.");
    } catch (error) {
        console.error(error);
    }

    client.destroy();
});

client.login(process.env.TOKEN);