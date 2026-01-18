import { SlashCommandBuilder } from 'discord.js';

export const commands = [
  new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Check if bot is alive'),

  new SlashCommandBuilder()
    .setName('help')
    .setDescription('Show all commands'),

  new SlashCommandBuilder()
    .setName('ask')
    .setDescription('Ask ServerCopilot')
    .addStringOption(option =>
      option.setName('question')
        .setDescription('Your question')
        .setRequired(true)
    ),

  new SlashCommandBuilder()
    .setName('stats')
    .setDescription('Show bot usage statistics'),

  new SlashCommandBuilder()
    .setName('logs')
    .setDescription('Show recent bot logs (Admin only)')
].map(cmd => cmd.toJSON());
