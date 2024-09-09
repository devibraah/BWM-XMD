import { UploadFileUgu, TelegraPh } from '../uploader.js';
import { writeFile, unlink } from 'fs/promises';
import config from '../../config.cjs';
const MAX_FILE_SIZE_MB = 60;

const tourl = async (m, gss) => {
  const prefix = config.PREFIX;
const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
const text = m.body.slice(prefix.length + cmd.length).trim();
  const validCommands = ['tourl', 'url'];

  if (validCommands.includes(cmd)) {
    if (!m.quoted || !['imageMessage', 'videoMessage', 'audioMessage'].includes(m.quoted.mtype)) {
      return m.reply(`Send/Reply with an image, video, or audio to upload ${prefix + cmd}`);
    }

    try {
      const loadingMessages = [
        "*「▰▰▰▱▱▱▱▱▱▱」*",
        "*「▰▰▰▰▱▱▱▱▱▱」*",
        "*「▰▰▰▰▰▱▱▱▱▱」*",
        "*「▰▰▰▰▰▰▱▱▱▱」*",
        "*「▰▰▰▰▰▰▰▱▱▱」*",
        "*「▰▰▰▰▰▰▰▰▱▱」*",
        "*「▰▰▰▰▰▰▰▰▰▱」*",
        "*「▰▰▰▰▰▰▰▰▰▰」*",
      ];

      const loadingMessageCount = loadingMessages.length;
      let currentMessageIndex = 0;

      const { key } = await gss.sendMessage(m.from, { text: loadingMessages[currentMessageIndex] }, { quoted: m });

      const loadingInterval = setInterval(() => {
        currentMessageIndex = (currentMessageIndex + 1) % loadingMessageCount;
        gss.relayMessage(m.from, {
          protocolMessage: {
            key: key,
            type: 14,
            editedMessage: {
              conversation: loadingMessages[currentMessageIndex],
            },
          },
        }, {});
      }, 500);

      const media = await m.quoted.download(); // Download the media from the quoted message
      if (!media) throw new Error('Failed to download media.');

      const fileSizeMB = media.length / (1024 * 1024); // Calculate file size in megabytes
      if (fileSizeMB > MAX_FILE_SIZE_MB) {
        clearInterval(loadingInterval);
        return m.reply(`File size exceeds the limit of ${MAX_FILE_SIZE_MB}MB.`);
      }

      const extension = getFileExtension(m.quoted.mtype);
      if (!extension) throw new Error('Unknown media type.');

      const filePath = `./${Date.now()}.${extension}`; // Save the media with proper extension
      await writeFile(filePath, media);

      let response;
      if (m.quoted.mtype === 'imageMessage') {
        response = await TelegraPh(filePath); // Pass the file path to TelegraPh
      } else {
        response = await UploadFileUgu(filePath); // Pass the file path to UploadFileUgu
      }

      clearInterval(loadingInterval);

      // Replace loading animation with "Loading complete" message
      await gss.relayMessage(m.from, {
        protocolMessage: {
          key: key,
          type: 14,
          editedMessage: {
            conversation: '✅ Loading complete.',
          },
        },
      }, {});

      const mediaUrl = response.url || response; // Extract the URL from the response

      // Only send the URL as a reply
      await m.reply(`*Hey ${m.pushName} Here Is Your Media*\n*url:* ${mediaUrl}`);

      await unlink(filePath); // Delete the downloaded media file
    } catch (error) {
      console.error('Error processing media:', error);
      m.reply('Error processing media.');
    }
  }
};

// Function to get the file extension based on media type
const getFileExtension = (mtype) => {
  switch (mtype) {
    case 'imageMessage':
      return 'jpg';
    case 'videoMessage':
      return 'mp4';
    case 'audioMessage':
      return 'mp3';
    default:
      return null;
  }
};

// Function to get the media type for messaging
const getMediaType = (mtype) => {
  switch (mtype) {
    case 'imageMessage':
      return 'image';
    case 'videoMessage':
      return 'video';
    case 'audioMessage':
      return 'audio';
    default:
      return null;
  }
};

export default tourl;
