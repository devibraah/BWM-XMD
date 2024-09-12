import { downloadContentFromMessage } from '@whiskeysockets/baileys';
import fs from 'fs';
import config from '../../config.cjs';

const rvo = async (m, sock) => {
  try {
    console.log('Quoted message:', m.quoted);

    const prefix = config.PREFIX;
const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
const text = m.body.slice(prefix.length + cmd.length).trim();

    const validCommands = ['rvo', 'vv', 'readviewonce'];
    if (!validCommands.includes(cmd)) return;

    // Check if the quoted message is a view-once message
    if (!m.quoted || m.quoted.type !== 'view_once' || (m.quoted.mtype !== 'imageMessage' && m.quoted.mtype !== 'videoMessage')) {
      return m.reply('This is not a view once message');
    }

    // Extract the message and its type
    const msg = m.quoted.message;
    const type = Object.keys(msg)[0];
    
    const originalCaption = msg[type].caption || '';
    const newCaption = `${originalCaption}\n\n> © Powered By BMW-MD`;


    // Download the media content
    const mediaStream = await downloadContentFromMessage(msg[type], type === 'imageMessage' ? 'image' : 'video');
    let buffer = Buffer.from([]);
    for await (const chunk of mediaStream) {
      buffer = Buffer.concat([buffer, chunk]);
    }

    // Send the media back to the chat
    if (/video/.test(type)) {
      await sock.sendMessage(m.from, {
        video: buffer,
        caption: newCaption,
        contextInfo: {
          mentionedJid: [m.sender],
          forwardingScore: 9999,
          isForwarded: true,
        }
      }, { quoted: m });
    } else if (/image/.test(type)) {
      await sock.sendMessage(m.from, {
        image: buffer,
        caption: newCaption,
        contextInfo: {
          mentionedJid: [m.sender],
          forwardingScore: 9999,
          isForwarded: true,
        }
      }, { quoted: m });
    }
  } catch (e) {
    console.error('Error:', e);
    m.reply('An error occurred while processing the command.');
  }
};

export default rvo;
