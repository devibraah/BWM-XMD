import pkg, { prepareWAMessageMedia } from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto } = pkg;
import axios from 'axios';

const searchRepo = async (m, Matrix) => {
  const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';

  const validCommands = ['menu', 'help', 'list'];

  if (validCommands.includes(cmd)) {
    const repoUrl = `https://api.github.com/repos/devibraah/BWM-XMD`;
    
    await handleRepoCommand(m, Matrix, repoUrl);
  }
};

const handleRepoCommand = async (m, Matrix, repoUrl) => {
  try {
    const response = await axios.get(repoUrl);
    const repoData = response.data;

    const {
      full_name,
      name,
      forks_count,
      stargazers_count,
      created_at,
      updated_at,
      owner,
    } = repoData;

    const messageText = `╭─────═━┈┈━═──━┈⊷
┇ _ʙᴏᴛ ɴᴀᴍᴇ_ : *_ʙᴍᴡ ᴍᴅ_*
┇ _ᴠᴇʀꜱɪᴏɴ_ : *_7.1.0_*     
┇ _ᴘʟᴀᴛғᴏʀᴍ_ : *_ʟɪɴᴜx_*
┇ _ᴅᴇᴠ_ : *_sɪʀ ɪʙʀᴀʜɪᴍ_*
┇ _ʀᴀᴍ_ : *_20GB.14GB_*
┇ _ᴅᴀɪʟʏ ᴜsᴇʀs_ : *${forks_count}*
┇ _ᴄʀᴇᴀᴛᴇᴅ ᴏɴ_ : *${new Date(created_at).toLocaleDateString()}*
╰─────═━┈┈━═──━┈⊷ 
    `;

    const repoMessage = generateWAMessageFromContent(m.from, {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2,
          },
          interactiveMessage: proto.Message.InteractiveMessage.create({
            body: proto.Message.InteractiveMessage.Body.create({
              text: messageText,
            }),
            footer: proto.Message.InteractiveMessage.Footer.create({
              text: '🌏𝐁𝐄𝐒𝐓 𝐖𝐇𝐀𝐓𝐒𝐀𝐏𝐏 𝐁𝐎𝐓🌏\n\n𝐌𝐀𝐃𝐄 𝐁𝐘 𝐈𝐁𝐑𝐀𝐇𝐈𝐌 𝐀𝐃𝐀𝐌𝐒',
            }),
            header: proto.Message.InteractiveMessage.Header.create({
              ...(await prepareWAMessageMedia({
                image: {
                  url: 'https://telegra.ph/file/0c225f7da5616cdcbec80.jpg',
                },
              }, { upload: Matrix.waUploadToServer })),
              title: '',
              gifPlayback: true,
              subtitle: '',
              hasMediaAttachment: false,
            }),
            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
              buttons: [
                {
                  name: 'quick_reply',
                  buttonParamsJson: JSON.stringify({
                    display_text: "Commands",
                    id: ".command",
                  }),
                },
                {
                  name: 'quick_reply',
                  buttonParamsJson: JSON.stringify({
                    display_text: "Owner",
                    id: ".owner",
                  }),
                },
                {
                  name: 'quick_reply',
                  buttonParamsJson: JSON.stringify({
                    display_text: "Ping",
                    id: ".ping",
                  }),
                },
                {
                  name: 'cta_url',
                  buttonParamsJson: JSON.stringify({
                    display_text: "Bmw Repo",
                    url: 'https://github.com/devibraah/BWM-XMD',
                  }),
                },
                {
                  name: 'cta_url',
                  buttonParamsJson: JSON.stringify({
                    display_text: "Follow Wachannel",
                    url: 'https://whatsapp.com/channel/0029VaZuGSxEawdxZK9CzM0Y',
                  }),
                },
              ],
            }),
            contextInfo: {
              mentionedJid: [m.sender],
              forwardingScore: 9999,
              isForwarded: true,
            },
          }),
        },
      },
    }, {});

    await Matrix.relayMessage(repoMessage.key.remoteJid, repoMessage.message, {
      messageId: repoMessage.key.id,
    });
    await m.React('🚘');
  } catch (error) {
    console.error('Error processing your request:', error);
    m.reply('Error processing your request.');
    await m.React('🚘');
  }
};

export default searchRepo;
