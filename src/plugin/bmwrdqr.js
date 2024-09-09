import Jimp from 'jimp';
import jsQR from 'jsqr';
import jpeg from 'jpeg-js';
import config from '../../config.cjs';

const readqr = async (m, gss) => {
  try {
    const prefix = config.PREFIX;
const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
const text = m.body.slice(prefix.length + cmd.length).trim();
    
    const validCommands = ['readqr'];

    if (!validCommands.includes(cmd)) return;

    if (!m.quoted || m.quoted.mtype !== 'imageMessage') {
      return m.reply('Please quote an image containing a QR code with a caption.');
    }

    const buffer = await m.quoted.download();
    const image = await Jimp.read(buffer);
    const { data, width, height } = image.bitmap;
    
    const code = jsQR(data, width, height);

    if (!code) {
      return m.reply('QR code not found or could not be decoded.');
    }

    m.reply(`Decoded QR code: ${code.data}`);
  } catch (error) {
    console.error('Error:', error);
    m.reply('An error occurred while processing the command.');
  }
};

export default readqr;
