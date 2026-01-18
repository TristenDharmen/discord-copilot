import 'dotenv/config';
import { REST, Routes } from 'discord.js';
import { commands } from './commands.js';

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log('⏳ Deploying commands...');
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );
    console.log('✅ Commands deployed');
  } catch (err) {
    console.error(err);
  }
})();
