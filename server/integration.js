const axios = require('axios');

async function getMessages(socket) {
  const res = await axios.default.get(
    `${process.env.DISCORD_BASE_URL}/channels/${process.env.DISCORD_CHANNEL_ID}/messages`,
    {
      headers: {
        Authorization: `Bot ${process.env.DISCORD_API_KEY}`
      }
    }
  );

  const out = Array.from(res.data)
    .filter(el => el.content.trim().length > 0)
    .map(el => ({
      id: el.id,
      username: el.author.username,
      content: el.content.trim(),
      votes: el.reactions?.find(item => item.emoji.name === '👍')?.count
    }))
    .sort((a, b) => b.votes - a.votes || -1);

  socket.send(JSON.stringify(out));
}

module.exports = { getMessages };
