import {
    ApplicationIntegrationType,
    CommandInteraction,
    EmbedBuilder,
    InteractionContextType,
    SlashCommandBuilder,
    User
} from "discord.js";
import type { CommandData } from "../command";

export async function execute(interaction: CommandInteraction) {
    const user: User = interaction.options.get("user") != null ? interaction.options.get("user")?.user! : interaction.user;

    await interaction.reply({
        embeds: [
            new EmbedBuilder()
                .setImage(
                    user.displayAvatarURL({
                        forceStatic: true,
                        size: 4096
                    }))
                .setFooter({
                    text: "Avatar of " + user.username,
                    iconURL: interaction.client.user.displayAvatarURL()
                })
        ]
    });
}

export const command: CommandData = {
    enabled: false,
    slash: new SlashCommandBuilder()
        .setName("avatar")
        .setDescription("It's like a mirror, But less realistic.")
        .addUserOption(option => option
            .setName("user")
            .setDescription("Who's shattering the mirror today?"))
        .setContexts(
            InteractionContextType.Guild,
            InteractionContextType.BotDM,
            InteractionContextType.PrivateChannel)
        .setIntegrationTypes(
            ApplicationIntegrationType.GuildInstall,
            ApplicationIntegrationType.UserInstall)
}