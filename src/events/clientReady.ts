import {
    Client,
    Events
} from "discord.js";
import type { EventData } from "../event";

export async function execute(client: Client<true>) {
    console.log(`Ready! Logged in as ${client.user.tag}`);
}

export const event: EventData = {
    enabled: true,
    type: Events.ClientReady,
    once: true
}