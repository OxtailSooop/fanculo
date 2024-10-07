import {
    ActionRowBuilder,
    ApplicationIntegrationType,
    ButtonBuilder,
    ButtonStyle,
    CommandInteraction,
    EmbedBuilder,
    InteractionContextType,
    SlashCommandBuilder
} from "discord.js";
import type { CommandData } from "../command.ts";

export async function execute(interaction: CommandInteraction) {
    const actions = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setLabel("Actions")
                .setStyle(ButtonStyle.Primary)
                .setCustomId("actions"),
            new ButtonBuilder()
                .setLabel("Inventory")
                .setStyle(ButtonStyle.Primary)
                .setCustomId("inventory")
        );

    const embed = new EmbedBuilder()
        .setTitle(`${interaction.user.username}'s miku`)
        .setImage("https://media.discordapp.net/attachments/1290759169372196947/1292468391122042982/miku.png");

    const response = await interaction.reply({
        embeds: [embed],
        components: [actions]
    });

    const collectorFilter = i => i.user.id == interaction.user.id;

    try {
        while (true) {
            let button = await response.awaitMessageComponent({ filter: collectorFilter, time: 30_000 });
            button!.deferUpdate();

            if (button!.customId == "actions") {
                await response.edit({ embeds: [new EmbedBuilder().setTitle("<:cyn:1292206046731042877>")] });
            } else if (button!.customId == "inventory") {
                await response.edit({ embeds: [new EmbedBuilder().setTitle("<:senkosleep:1292501221877354588>")] });
            }
        }
    } catch (e) {
        interaction.deleteReply();
    }
}

export const command: CommandData = {
    enabled: true,
    slash: new SlashCommandBuilder()
        .setName("mikupet")
        .setDescription("Care for your own miku, Talk at your friends about her and see if they care, Wherever they went.")
        .setContexts(
            InteractionContextType.Guild,
            InteractionContextType.BotDM,
            InteractionContextType.PrivateChannel)
        .setIntegrationTypes(
            ApplicationIntegrationType.GuildInstall,
            ApplicationIntegrationType.UserInstall)
}
