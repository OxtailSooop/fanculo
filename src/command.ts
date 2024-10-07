import {
    ContextMenuCommandBuilder,
    type SlashCommandOptionsOnlyBuilder
} from "discord.js";
import path from "node:path";
import fs from "node:fs";

export interface CommandData {
    enabled: boolean,
    slash?: SlashCommandOptionsOnlyBuilder,
    context?: ContextMenuCommandBuilder,
}

export function parseCommandFiles() {
    const commands = [];

    const commandsPath = path.join(__dirname, "commands");
    const commandFiles = fs.readdirSync(commandsPath, { recursive: true }).filter(entry => entry.toString().endsWith(".ts"));

    for (const entry of commandFiles) {
        const entryPath = path.join(commandsPath, entry.toString());
        const command = require(entryPath);
        if ('command' in command) {
            commands.push(command);
        } else {
            console.log(`[WARNING] The command at ${entryPath} has missing data.`);
        }
    }

    return commands;
}