import Tesseract from 'tesseract.js';
import { writeFile, unlink } from 'fs/promises';
import config from '../../config.cjs';

const givetextCommand = async (m, Matrix) => {
  const prefix = config.PREFIX;
const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
const arg = m.body.slice(prefix.length + cmd.length).trim();

  const validCommands = ['givetext', 'extract'];

  if (validCommands.includes(cmd)) {
    if (!m.quoted || m.quoted.mtype !== 'imageMessage') {
      return m.reply(`Send/Reply with an image to extract text ${prefix + cmd}`);
    }

    let lang = 'eng'; 
    if (args.length > 0) {
      lang = args[0]; 
    }

    try {
      const media = await m.quoted.download(); 
      if (!media) throw new Error('Failed to download media.');

      const filePath = `./${Date.now()}.png`;
      await writeFile(filePath, media);

      const { data: { text } } = await Tesseract.recognize(filePath, lang, {
        logger: m => console.log(m)
      });

      const responseMessage = `Extracted Text:\n\n${text}`;
      await Matrix.sendMessage(m.from, { text: responseMessage }, { quoted: m }); 

      await unlink(filePath); 
    } catch (error) {
      console.error("Error extracting text from image:", error);
      await Matrix.sendMessage(m.from, { text: 'Error extracting text from image.' }, { quoted: m }); 
    }
  }
};

export default givetextCommand;
