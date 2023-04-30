const { Configuration, OpenAIApi } = require("openai");
const {Server } = require('socket-be')

const configuration = new Configuration({
  apiKey: "API_KEY",
});
const openai = new OpenAIApi(configuration);

const server = new Server({
  port: 3000,
  timezone: 'Asia/Tokyo',
});

server.events.on('playerChat', async (event) => {
  const { sender, message, world } = event;
  if (sender === '外部') return;
  if (message.startsWith('!gpt')){
    (async () => {
      await world.sendMessage(`§bリクエストを送信しました`);
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message.replace('!gpt','') }],
      });
      await world.sendMessage(`§6ChatGPT\n§a${completion.data.choices[0].message.content}`);
    })();
  }
})
