require("dotenv").config();

const { RTMClient } = require("@slack/rtm-api");

const {
  postMessage,
  postMessegaSpam,
  postMessageFileSpam,
  postMessageFile,
} = require("./src/send");

const SLACK_OAUTH_TOKEN = process.env.SLACK_OAUTH_TOKEN;

const rtm = new RTMClient(SLACK_OAUTH_TOKEN);

//start the bot
rtm.start().catch(console.error);

rtm.on("ready", async () => {
  console.log("Bot started");
  try {
    // AQUI ES DONDE TIENES QUE MODIFICAR LAS FUNCIONES
    
    // postMessageFile("bot.png","testing","U02QYT47LG7,U02GE8J1QMV,U03K0T65R5L","Hola")
    // postMessageFileSpam("bot.png", "testing")
    postMessageFile("Diwali.png", "HappyDiwali", "C034YEBPBB4")

    rtm.disconnect();
  } catch (err) {
    console.log("An error occurred and messages could not be sent");
    console.error(err);
    rtm.disconnect();
  }
});
