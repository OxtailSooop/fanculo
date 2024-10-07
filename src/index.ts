import fs from "node:fs";
import path from "node:path";
import {
    Client,
    Collection,
    GatewayIntentBits
} from "discord.js";
import { parseCommandFiles } from "./command";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
for (const command of parseCommandFiles()) {

    if (command.command.slash != undefined) {
        client.commands.set(command.command.slash.name, command);
    }

    if (command.command.context != undefined) {
        client.commands.set(command.command.context.name, command);
    }
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath, { recursive: true }).filter(entry => entry.toString().endsWith(".ts"));

for (const entry of eventFiles) {
    let event = await import(path.join(eventsPath, entry.toString()))

    if (!event.event.enabled) continue;

    if (event.event.once) {
        client.once(event.event.type, (...args) => event.execute(...args));
    } else {
        client.on(event.event.type, (...args) => event.execute(...args));
    }
}


client.login(process.env.TOKEN);