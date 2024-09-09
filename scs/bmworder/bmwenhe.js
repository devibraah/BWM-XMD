jimport { createRequire } from 'module';
import config from '../../config.cjs';
import path from 'path';

const require = createRequire(import.meta.url);
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);
const reminiPath = path.resolve(__dirname, '../remini.cjs');
const { remini } = require(reminiPath);

const tohd = async (m, gss) => {
  const prefix = config.PREFIX;
const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
const text = m.body.slice(prefix.length + cmd.length).trim();
  const validCommands = ['hdr', 'hd', 'remini', 'enhance', 'upscale'];

  if (validCommands.includes(cmd)) {
    if (!m.quoted || m.quoted.mtype !== 'imageMessage') {
      return m.reply(`*Send/Reply with an Image to Enhance Your Picture Quality ${prefix + cmd}*`);
    }
    
    const media = await m.quoted.download();

    try {
        let proses = await remini(media, "enhance"); // Call remini directly
        gss.sendMessage(m.from, { image: proses, caption: `> *Hey ${m.pushName} Here Is Your Enhanced Image By BMW-MD*` }, { quoted: m });
      
    } catch (error) {
      console.error('Error processing media:', error);
      m.reply('Error processing media.');
    }
  }
};

export default tohd;
