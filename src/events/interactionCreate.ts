import {
    CommandInteraction,
    Events
} from "discord.js";
import type { EventData } from "../event";

export const event: EventData = {
    enabled: true,
    type: Events.InteractionCreate,
    once: false
}

export async function execute(interaction: CommandInteraction) {
    if (!interaction.isChatInputCommand() && !interaction.isContextMenuCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: "There was an error while executing this command!", ephemeral: true });
        } else {
            await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
        }
    }
}
