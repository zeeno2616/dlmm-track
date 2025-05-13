require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const { getDLMMReport } = require('./dlmm');

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Send your private key to monitor DLMM positions. Never share this with anyone else.');
});

bot.on('message', async (msg) => {
  if (msg.text.startsWith('/start')) return;

  const chatId = msg.chat.id;
  const privateKey = msg.text.trim();

  try {
    const report = await getDLMMReport(privateKey);
    bot.sendMessage(chatId, report);
  } catch (e) {
    console.error(e);
    bot.sendMessage(chatId, 'Failed to fetch DLMM positions. Try again.');
  }
});

