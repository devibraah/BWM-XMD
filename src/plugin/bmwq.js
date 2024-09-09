import axios from 'axios';
import config from '../../config.cjs';

const quotedChat = async (m, gss) => {
  try {
    const prefix = config.PREFIX;
const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
const text = m.body.slice(prefix.length + cmd.length).trim();
    
    const validCommands = ['qc'];

    if (!validCommands.includes(cmd)) return;

    if (!text) {
      return m.reply('Please provide text for the quote.');
    }

    if (text.length > 30) {
      return m.reply('Please provide text with a maximum of 30 characters.');
    }

    let profilePicture;

    try {
      profilePicture = await gss.profilePictureUrl(m.quoted ? m.quoted.sender : m.sender, 'image');
    } catch {
      profilePicture = 'https://srv.neoxr.tk/files/z8hI5T.jpg';
    }

    const quoteObject = {
      type: "quote",
      format: "png",
      backgroundColor: "#FFFFFF",
      width: 512,
      height: 768,
      scale: 2,
      messages: [{
        entities: [],
        avatar: true,
        from: {
          id: 1,
          name: m.quoted ? (await gss.getContact(m.quoted.sender)).notify || m.quoted.sender.split('@')[0] : m.pushName,
          photo: {
            url: profilePicture
          }
        },
        text: text,
        replyMessage: {}
      }]
    };

    try {
      const response = await axios.post('https://bot.lyo.su/quote/generate', quoteObject, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const buffer = Buffer.from(response.data.result.image, 'base64');

      await gss.sendImageAsSticker(m.from, buffer, m, {
        packname: "",
        author: "> BMW-MD"
      });
    } catch (error) {
      console.error('Error during HTTP request:', error);
      return m.reply('Error generating sticker. Please try again later.');
    }
  } catch (error) {
    console.error('Unexpected error in sticker case:', error);
    m.reply('An unexpected error occurred.');
  }
};

export default quotedChat;

