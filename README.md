# Portfolio AI Chatbot

A modern portfolio chatbot for a graphic design website. It uses a responsive glassmorphism UI, local history storage, and an Express backend connected to the OpenAI API.

## Features
- Responsive design with floating chat button
- Glassmorphism chat UI
- Dark/light mode support
- Smooth animations and typing indicator
- User and AI chat bubbles with timestamps
- Auto-scroll to latest message
- Send using Enter or Send button
- Clear chat history button
- LocalStorage chat persistence
- OpenAI-powered `/chat` endpoint

## Folder structure
- `chatbot.html` — chatbot page
- `chatbot.css` — UI styles
- `chatbot.js` — client chat logic
- `server.js` — Express backend and OpenAI integration
- `package.json` — Node dependencies and scripts
- `.env.example` — environment variable template

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy the env template:
   ```bash
   copy .env.example .env
   ```

3. Add your OpenAI API key in `.env`:
   ```text
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. Start the server:
   ```bash
   npm start
   ```

5. Open the chatbot in your browser:
   ```text
## Notes
- The backend uses the OpenAI Chat Completions API.
- The server serves static files from the project root, so `chatbot.html` and supporting files load correctly.
- Chat history is saved in browser `localStorage` so conversations persist between reloads.
