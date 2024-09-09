import Tesseract from 'tesseract.js';
import translate from 'translate-google-api';
import { writeFile } from 'fs/promises';
import config from '../../config.cjs';

const translateCommand = async (m, sock) => {
  const prefix = config.PREFIX;
const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
const args = m.body.slice(prefix.length + cmd.length).trim();
 

  const validCommands = ['translate', 'trt'];

   if (validCommands.includes(cmd)) {
    const targetLang = args[0];
    const text = args.slice(1).join(' ');

    if (m.quoted) {
      if (m.quoted.mtype === 'imageMessage') {
        try {
          const media = await m.quoted.download();
          if (!media) throw new Error('Failed to download media.');

          const filePath = `./${Date.now()}.png`;
          await writeFile(filePath, media);
          const { data: { text: extractedText } } = await Tesseract.recognize(filePath, 'eng', {
            logger: m => console.log(m)
          });

          const result = await translate(extractedText, { to: targetLang });
          const translatedText = result[0];

          const responseMessage = `${targetLang}:\n\n${translatedText}`;
          await sock.sendMessage(m.from, { text: responseMessage }, { quoted: m });
        } catch (error) {
          console.error("Error extracting and translating text from image:", error);
          await sock.sendMessage(m.from, { text: 'Error extracting and translating text from image.' }, { quoted: m }); 
        }
      } else if (m.quoted.text) {
        try {
          const quotedText = m.quoted.text;
          const result = await translate(quotedText, { to: targetLang });
          const translatedText = result[0];

          const responseMessage = `${targetLang}:\n\n${translatedText}`;
          await sock.sendMessage(m.from, { text: responseMessage }, { quoted: m }); 
        } catch (error) {
          console.error("Error translating quoted text:", error);
          await sock.sendMessage(m.from, { text: 'Error translating quoted text.' }, { quoted: m }); 
        }
      }
    } else if (text && targetLang) {
      try {
        const result = await translate(text, { to: targetLang });
        const translatedText = result[0];

        const responseMessage = `${targetLang}:\n\n${translatedText}`;
        await sock.sendMessage(m.from, { text: responseMessage }, { quoted: m });
      } catch (error) {
        console.error("Error translating text:", error);
        await sock.sendMessage(m.from, { text: 'Error translating text.' }, { quoted: m });
      }
    } else {
      const responseMessage = "Usage: /translate <target_lang> <text>\nExample: /translate en कैसे हो भाई\nOr reply to an image/text message with /translate <target_lang>";
      await sock.sendMessage(m.from, { text: responseMessage }, { quoted: m });
    }
  }
};

export default translateCommand;
