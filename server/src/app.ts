import { Client, Intents, Message } from 'deps';

const client = new Client();

client.on('ready', () => {
  console.log('Ready!');
});

client.on('raw', (evt, payload, shard) => {
  console.log(evt, payload, shard);
});

client.on('messageCreate', (message: Message) => {
  if (message.content == '!ping') {
    message.reply('Pong!');
  }
});

client.connect(Deno.env.get('DISCORD_BOT_TOKEN'), Intents.None);
