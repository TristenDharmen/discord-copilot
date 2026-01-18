# ServerCopilot – Discord AI Assistant (Brief 1)

## Overview
ServerCopilot is a Discord bot with an admin-controlled AI assistant.
Admins can manage bot behavior via a web dashboard and environment configuration.
The bot responds to slash commands and is designed with production-grade error handling.

## Features
- Discord slash commands (/ping, /help, /ask, /stats, /logs)
- Admin-configurable AI assistant
- Supabase-ready backend for logs and settings
- Graceful handling of external API failures
- Modular architecture using Discord.js and Next.js

## AI Integration Note
The OpenAI integration is fully implemented using the official OpenAI SDK.
Live AI responses require OpenAI billing to be enabled.
During submission, AI responses may be limited due to quota restrictions.
The system handles this gracefully and informs the user.

## Tech Stack
- Discord.js (Bot)
- Next.js (Admin Dashboard)
- Supabase (Database & Auth)
- OpenAI API (AI Engine)

## How to Run
1. Install dependencies
   ```bash
   npm install
