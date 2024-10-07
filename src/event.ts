import type { Events } from "discord.js"

export interface EventData {
    enabled: boolean
    type: Events,
    once: boolean
}