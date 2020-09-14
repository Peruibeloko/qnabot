const axios = require('axios');

async function getMessages(socket) {
  let res;

  try {
    res = await axios.default.get(
      `${process.env.DISCORD_BASE_URL}/channels/${process.env.DISCORD_CHANNEL_ID}/messages`,
      {
        headers: {
          Authorization: `Bot ${process.env.DISCORD_API_KEY}`
        }
      }
    );
  } catch (err) {
    console.error('oh fuck ', err);
  }

  let list = Array.from(res.data);

  list = list.map(el => {
    let votes = 0;

    if (el.reactions && el.reactions.some(item => item.emoji.name === '✅')) {
      votes = el.reactions.filter(item => item.emoji.name === '✅')[0].count;
    }

    return {
      id: el.id,
      username: el.author.username,
      content: el.content,
      votes
    };
  });

  list = list.filter(el => el.content.trim().length > 0).sort((a, b) => b.votes - a.votes);

  socket.send(JSON.stringify(list));
}

module.exports = { getMessages };
