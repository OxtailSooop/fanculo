import {
    ApplicationIntegrationType,
    CommandInteraction,
    EmbedBuilder,
    InteractionContextType,
    SlashCommandBuilder
} from "discord.js";
import responses from '../../assets/eightball_responses.json'
import { randomInt } from "../utils";
import type { CommandData } from "../command";

export async function execute(interaction: CommandInteraction) {
    const question = interaction.options.get("question")?.value?.toString()!;

    await interaction.reply({
        embeds: [
            new EmbedBuilder()
                .setTitle(question)
                .setDescription(responses[randomInt(0, responses.length)])
                .setThumbnail(interaction.client.user.displayAvatarURL())
                .setFooter({ text: interaction.client.user.displayName, iconURL: interaction.client.user.displayAvatarURL() })
        ]
    });
}

export const command: CommandData = {
    enabled: true,
    slash: new SlashCommandBuilder()
        .setName("8ball")
        .setDescription("Just a standard eight ball you'd find at a local walmart, If you'd go outside that is.")
        .addStringOption(option => option
            .setName("question")
            .setDescription("What do you want.")
            .setRequired(true))
        .setContexts(
            InteractionContextType.Guild,
            InteractionContextType.BotDM,
            InteractionContextType.PrivateChannel)
        .setIntegrationTypes(
            ApplicationIntegrationType.GuildInstall,
            ApplicationIntegrationType.UserInstall)
}