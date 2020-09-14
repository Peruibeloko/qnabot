require('dotenv').config();
const express = require('express');
const ws = require('ws');
const http = require('http');
const Discord = require('discord.js');
const integration = require('./integration');

// Server setup
const app = express();
const server = http.createServer(app);
const wss = new ws.Server({ server });
const port = process.env.PORT || 8585;

// Discord integration
const dClient = new Discord.Client();
dClient.once('ready', () => {
  console.log('Discord realtime integration initialized');
  server.listen(port, () => {
    console.log(`Listening on ${port}`);
  });
});
dClient.login(process.env.DISCORD_API_KEY);

// Listeners setup
wss.on('connection', socket => {
  socket.on('message', data => {
    if (data === 'pong') {
      console.log('connection healthy, populating messages');
      integration.getMessages(socket);
    }
  });

  console.log('client connected, sending ping');
  socket.send('ping');

  dClient.on('raw', packet => {
    if (
      [
        'MESSAGE_CREATE',
        'MESSAGE_DELETE',
        'MESSAGE_REACTION_ADD',
        'MESSAGE_REACTION_REMOVE',
        'MESSAGE_UPDATE'
      ].includes(packet.t) &&
      packet.d.channel_id === `${process.env.DISCORD_CHANNEL_ID}`
    ) {
      integration.getMessages(socket);
    }
  });
});
