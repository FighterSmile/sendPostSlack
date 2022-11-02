const { WebClient } = require("@slack/web-api");
const { templateMsg } = require("./message");
const fs = require("fs");
const path = `${__dirname}/../media`;

const SLACK_OAUTH_TOKEN = process.env.SLACK_OAUTH_TOKEN;

const web = new WebClient(SLACK_OAUTH_TOKEN);
const { accessSpreadsheet } = require("./GoogleSheets");
const { getTypeFile } = require("./DownFiles");
const { arrToString } = require("./helpers");

const sendMessage = async (channel, msg) => {
  await web.chat.postMessage({
    channel: channel,
    text: msg,
  });
  console.log(`Message enviado`);
};

const postMessage = async (channel_id) => {
  const message = templateMsg();
  sendMessage(channel_id, message);
};

const postMessegaSpam = async () => {
  const channel_id = await accessSpreadsheet();
  let count = 0;
  for (let i = 0; channel_id.length > i; i++) {
    const message = templateMsg(channel_id[i][2]);
    sendMessage(channel_id[i][2], message);
    count++;
  }
  console.log(`Se enviaron ${count} Messages`);
};

const postMessageFileSpam = async (file, title) => {
  try {
    const fileType = getTypeFile(file);
    const pathFile = `${path}/${file}`;
    const titleFile = title;
    let channel_id = await accessSpreadsheet();
    let count = channel_id.length
    channel_id = arrToString(channel_id)
    const message = templateMsg()
    console.log(channel_id);
    await uploadFile(
      pathFile,
      titleFile,
      message,
      channel_id,
      fileType
    )
    // for (let i = 0; channel_id.length > i; i++) {
    //   const message = replateID(channel_id[i][2]);
    //   await uploadFile(
    //     pathFile,
    //     titleFile,
    //     message,
    //     channel_id[i][2],
    //     fileType
    //   );
    //   count++;
    // }
    console.log(`Se enviaron ${count} Messages with img`);
  } catch (error) {
    console.log(error.message);
  }
};

const postMessageFile = async (file, title, channelID) => {
  try {
    const filetype = getTypeFile(file);
    const pathFile = `${path}/${file}`;
    const message = templateMsg(channelID);
    // const message = msg;
    await uploadFile(pathFile, title, message, channelID, filetype);

    console.log("Mensaje con File enviado ");
  } catch (error) {
    console.log("Mensaje No puso ser ");
  }
};

const uploadFile = async (path, title, msg, channelID, fileType) => {
  try {
    const result = await web.files.upload({
      file: fs.createReadStream(path),
      filetype: "post",
      title: title,
      initial_comment: msg,
      channels: channelID,
      filetype: fileType,
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  postMessage,
  postMessegaSpam,
  postMessageFileSpam,
  postMessageFile,
};
