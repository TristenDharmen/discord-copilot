import 'dotenv/config';
import { Client, GatewayIntentBits, Events } from 'discord.js';
import OpenAI from 'openai';

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

client.once(Events.ClientReady, () => {
  console.log(`🤖 Logged in as ${client.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.commandName;

  try {
    // -------- PING --------
    if (command === 'ping') {
      return interaction.reply('🏓 Pong!');
    }

    // -------- HELP --------
    if (command === 'help') {
      return interaction.reply({
        content: `
📌 **ServerCopilot Commands**
• /ping – Bot status
• /help – Show commands
• /ask – Ask AI
• /stats – Usage statistics
• /logs – Admin logs
        `,
      });
    }

    // -------- ASK (AI) --------
    if (command === 'ask') {
      const question = interaction.options.getString('question');

      await interaction.deferReply(); // IMPORTANT

      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: question },
        ],
      });

      const answer = completion.choices[0].message.content;

      return interaction.editReply(`🤖 **Answer:**\n${answer}`);
    }

    // -------- STATS --------
    if (command === 'stats') {
      return interaction.reply('📊 Stats module ready');
    }

    // -------- LOGS --------
    if (command === 'logs') {
      return interaction.reply('📁 Logs module ready');
    }

  }catch (err) {
  console.error(err);

  // Handle OpenAI quota error cleanly
  if (err.code === 'insufficient_quota') {
    if (interaction.deferred || interaction.replied) {
      return interaction.editReply(
        '⚠️ AI quota exhausted. Admin needs to add billing or replace API key.'
      );
    } else {
      return interaction.reply(
        '⚠️ AI quota exhausted. Admin needs to add billing or replace API key.'
      );
    }
  }

  // Fallback for any other error
  if (interaction.deferred || interaction.replied) {
    return interaction.editReply('❌ Error processing command');
  } else {
    return interaction.reply('❌ Error processing command');
  }
}

});

client.login(process.env.DISCORD_TOKEN);
