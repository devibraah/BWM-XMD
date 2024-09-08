import fs from 'fs/promises';
import config from '../../config.cjs';

const stickerCommand = async (m, gss) => {
  const prefix = config.PREFIX;
  const [cmd, arg] = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ') : ['', ''];

  const packname = global.packname || "BMW-MD";
  const author = global.author || "🥵💫👿";

  const validCommands = ['sticker', 's', 'autosticker'];

  if (cmd === 'autosticker') {
    if (arg === 'on') {
      config.AUTO_STICKER = true;
      await m.reply('Auto-sticker is now enabled.');
    } else if (arg === 'off') {
      config.AUTO_STICKER = false;
      await m.reply('Auto-sticker is now disabled.');
    } else {
      await m.reply('Usage: /autosticker on|off');
    }
    return;
  }

  // Auto sticker functionality using config
  if (config.AUTO_STICKER && !m.key.fromMe) {
    if (m.type === 'imageMessage') {
      let mediac = await m.download();
      await gss.sendImageAsSticker(m.from, mediac, m, { packname, author });
      console.log(`Auto sticker detected`);
      return;
    } else if (m.type === 'videoMessage' && m.msg.seconds <= 11) {
      let mediac = await m.download();
      await gss.sendVideoAsSticker(m.from, mediac, m, { packname, author });
      return;
    }
  }

  if (validCommands.includes(cmd)) {
    const quoted = m.quoted || {};

    if (!quoted || (quoted.mtype !== 'imageMessage' && quoted.mtype !== 'videoMessage')) {
      return m.reply(`Send/Reply with an image or video to convert into a sticker ${prefix + cmd}`);
    }

    const media = await quoted.download();
    if (!media) throw new Error('Failed to download media.');

    const filePath = `./${Date.now()}.${quoted.mtype === 'imageMessage' ? 'png' : 'mp4'}`;
    await fs.writeFile(filePath, media);

    if (quoted.mtype === 'imageMessage') {
      const stickerBuffer = await fs.readFile(filePath);
      await gss.sendImageAsSticker(m.from, stickerBuffer, m, { packname, author });
    } else if (quoted.mtype === 'videoMessage') {
      await gss.sendVideoAsSticker(m.from, filePath, m, { packname, author });
    }
  }
};

export default stickerCommand;
