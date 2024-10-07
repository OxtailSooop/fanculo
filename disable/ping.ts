import {
    ApplicationIntegrationType,
    CommandInteraction,
    EmbedBuilder,
    InteractionContextType,
    SlashCommandBuilder,
} from "discord.js";
import {
    getMicroSecTime
} from "../utils.ts";
import type {
    CommandData
} from "../command.ts";

export async function execute(interaction: CommandInteraction) {
    const start = getMicroSecTime();
    const messageRecieved = Date.now() - interaction.createdAt.getMilliseconds();
    let embed = new EmbedBuilder();

    if (interaction.client.ws.ping == -1) {
        embed.addFields({ name: "Websocket", value: "Still updating, Try again in 5 seconds.", inline: true })
    } else {
        embed.addFields({ name: "Websocket", value: interaction.client.ws.ping.toString() + "ms", inline: true })
    }

    embed.addFields(
        { name: "Message Recieved", value: messageRecieved.toString() + "ms", inline: true },
    );

    await interaction.reply({
        embeds: [
            embed
                .addFields({ name: "Process", value: (getMicroSecTime() - start) + "µs" })
        ]
    });
}

export const command: CommandData = {
    enabled: false,
    slash: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("How long does it take me to care?")
        .setContexts(
            InteractionContextType.Guild,
            InteractionContextType.BotDM,
            InteractionContextType.PrivateChannel)
        .setIntegrationTypes(
            ApplicationIntegrationType.GuildInstall,
            ApplicationIntegrationType.UserInstall)
}