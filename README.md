# QnABot

## Usage

Seems like a lot of stuff, but it really isn't.

### Pre-requisites

Before running anything, ensure you have:

- A working Node installation
- A Discord API key

This project was built using **pnpm**, but npm works just as well.

### Configuration

Your `/server/.env` file must have these properties in order to work

```yaml
DISCORD_API_KEY = # Your API key
DISCORD_BASE_URL = https://discord.com/api
DISCORD_CHANNEL_ID = # The Channel ID for your QnA discord channel
PORT = # Optional, defaults to 8585
```

In order to obtain the Channel ID, you'll need to first activate Developer Mode in Discord (`Settings -> Advanced -> Enable "Developer Mode"`), then right-click on the desired channel and "Copy Channel ID"

### Running the application

1. Clone the repo on your machine
2. Run `npm install` on both client and server folders
3. Run `npm start` on both server and client folders
4. Wait for the server instance to start up
5. Open your local frontend instance

And that should be it! It wasn't so bad, was it?

# Backend - [node.js](https://nodejs.org/)

Backend is a mix of direct calls to Discord's API (for querying the complete list of messages from a channel) and the [discord.js](https://discord.js.org/#/) library (for real-time sync)

# Frontend - [Vue.js](https://vuejs.org/)

Frontend is a simple Vue.js app. Vue.js is my framework of choice for 90% of all my projects, simply because of its ease of use and my familiarity with it.

# Real-time sync - [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)

Real-time sync is provided by WebSockets, a Web API that provides full-duplex (bidirectional) communication between clients and servers. Clients can send messages to the server and get event-driven responses back, without the need to poll the server for responses.

## How does it work?

Once the WebSocket connection is established between client and server, Node.js listens for new messages through `discord.js`, and requests the full message list from the channel whenever a new message or reaction is received.

These messages are processed to remove redundant info, ordered by vote count and sent to the frontend through the open socket. The frontend then renders the list reactively.

**This whole process is wildly inneficient for channels with a lot messages**, as this whole bot was put together in sort of a rush for a small event. It works nicely for those, though.
