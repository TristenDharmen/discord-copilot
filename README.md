# ServerCopilot – Discord AI Assistant (Brief 1)

## Overview
ServerCopilot is a Discord bot with an admin-controlled AI assistant.  
Admins can manage bot behavior via a web-based admin dashboard, while users interact with the bot using Discord slash commands.

The system is designed with modular architecture, production-grade error handling, and graceful fallback behavior for external API limitations.

---

## Features
- Discord slash commands:
  - `/ping` – Bot health check
  - `/help` – List available commands
  - `/ask` – Ask the AI a question
  - `/stats` – Usage statistics
  - `/logs` – Admin-only logs
- Admin dashboard (Next.js)
- Supabase backend for logs & settings
- OpenAI-powered AI assistant
- Graceful handling of API errors and quota limits
- Modular architecture using Discord.js & Next.js

---

## AI Integration Note
- The OpenAI integration is implemented using the official OpenAI SDK.
- Live AI responses require **OpenAI billing to be enabled**.
- During evaluation, if billing is not enabled or quota is exceeded, the bot:
  - Displays a friendly error message
  - Continues functioning without crashing
- This behavior is intentional and handled gracefully.

---

## Tech Stack
- **Discord.js** – Discord Bot
- **Next.js** – Admin Dashboard
- **Supabase** – Database & Authentication
- **OpenAI API** – AI Engine
- **Vercel** – Dashboard Deployment

---

## Admin Dashboard
The admin dashboard allows:
- Viewing logs stored in Supabase
- Monitoring usage statistics
- Checking system status
- Managing bot configuration (future extensibility)

---

## Environment Variables
Create a `.env` file using the template below:

```env
DISCORD_TOKEN=your_discord_bot_token
CLIENT_ID=your_discord_client_id
GUILD_ID=your_test_guild_id

OPENAI_API_KEY=your_openai_api_key

SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
