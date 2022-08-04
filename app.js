const dotenv = require("dotenv");
dotenv.config();

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
    await postMessageFileSpam("Peach.png", "Peach");
    //
    rtm.disconnect();
  } catch (err) {
    console.log("An error occurred and messages could not be sent");
    console.error(err);
    rtm.disconnect();
  }
});
