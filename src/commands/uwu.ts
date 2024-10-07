import {
    ApplicationCommandType,
    ApplicationIntegrationType,
    CommandInteraction,
    ContextMenuCommandBuilder,
    EmbedBuilder,
    InteractionContextType,
    MessageContextMenuCommandInteraction,
    SlashCommandBuilder
} from "discord.js";
import uwu from '../../assets/uwu.json'
import type { CommandData } from "../command";

export async function execute(interaction: MessageContextMenuCommandInteraction | CommandInteraction) {
    var message;
    if (interaction.isContextMenuCommand()) {
        message = interaction.targetMessage.toString();
    } else {
        message = interaction.options.get("message")?.value?.toString()!;
    }

    if (message.length == 0) {
        await interaction.reply({ embeds: [new EmbedBuilder().setTitle("nyo message tyoo devawue").setImage("https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExcnR1OGI4ajJzN3BhZzN2NXowb3BqcjlieTIzODh6b2N3ZTRmOW56ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/K1e6R8XvJAuBTvU9Tb/giphy.gif")], ephemeral: true })
        return;
    }

    for (const i in uwu) {
        message = message.toLowerCase().replaceAll(i.toLowerCase(), uwu[i].toLowerCase());
    }

    await interaction.reply(message);
}

export const command: CommandData = {
    enabled: true,
    slash: new SlashCommandBuilder()
        .setName("uwu")
        .setDescription("make messages unyintewwigibuwu and mask yow wack of intewwigence by making yow sound even stupidew")
        .addStringOption(option => option
            .setName("message")
            .setDescription("twoo uwu owr nyot tyoo uwu dwat is thwe qweschon uwu")
            .setRequired(true))
        .setContexts(
            InteractionContextType.Guild,
            InteractionContextType.BotDM,
            InteractionContextType.PrivateChannel)
        .setIntegrationTypes(
            ApplicationIntegrationType.GuildInstall,
            ApplicationIntegrationType.UserInstall),
    context: new ContextMenuCommandBuilder()
        .setName("uwu")
        .setContexts(
            InteractionContextType.Guild,
            InteractionContextType.BotDM,
            InteractionContextType.PrivateChannel)
        .setIntegrationTypes(
            ApplicationIntegrationType.GuildInstall,
            ApplicationIntegrationType.UserInstall)
        .setType(ApplicationCommandType.Message)
}