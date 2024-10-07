import {
    ApplicationIntegrationType,
    CommandInteraction,
    EmbedBuilder,
    InteractionContextType,
    SlashCommandBuilder,
} from "discord.js";
import cyn from '../../assets/cyn_quotes.json'
import type { CommandData } from "../command";
import { randomInt } from "../utils";

export async function execute(interaction: CommandInteraction) {
    var quoteOption = interaction.options.get("cyn")?.value?.toString()!;

    var quote: string | { text: string; image: string; } | null | undefined = null
    if (quoteOption == null || cyn.findIndex(item => item.text == quoteOption) == -1) {
        quote = cyn[randomInt(0, cyn.length - 1)];
    } else {
        quote = cyn.find(item => item.text == quoteOption);
    }

    await interaction.reply({
        embeds: [
            new EmbedBuilder()
                .setTitle("<:cyn:1292206046731042877> " + quote.text)
                .setImage(quote.image == "" ? interaction.client.user.displayAvatarURL() : quote.image)
        ]
    });
}

export const command: CommandData = {
    enabled: true,
    slash: new SlashCommandBuilder()
        .setName("cyn")
        .setDescription("Im sure you do this everyday.")
        .addStringOption(option => option
            .setName("cyn")
            .setDescription("cyn")) // TODO: get all quotes and put in choices
        .setContexts(
            InteractionContextType.Guild,
            InteractionContextType.BotDM,
            InteractionContextType.PrivateChannel)
        .setIntegrationTypes(
            ApplicationIntegrationType.GuildInstall,
            ApplicationIntegrationType.UserInstall)
}