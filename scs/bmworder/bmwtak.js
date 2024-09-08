import fs from 'fs/promises';
import config from '../../config.cjs';

const handleTakeCommand = async (m, gss) => {
  const prefix = config.PREFIX;
  const [cmd, ...args] = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ') : ['', ''];

  if (cmd !== 'take') return;

  const [providedPackname, providedAuthor] = args.join(' ').split('|');

  if (!providedPackname || !providedAuthor) {
    return m.reply('Usage: /take pkgname|author');
  }

  global.packname = providedPackname;
  global.author = providedAuthor;

  const quoted = m.quoted || {};

  if (!['imageMessage', 'videoMessage', 'stickerMessage'].includes(quoted.mtype)) {
    return m.reply(`Send/Reply with an image or video to use ${prefix + cmd}`);
  }

  const mediaBuffer = await quoted.download();
  if (!mediaBuffer) throw new Error('Failed to download media.');

  await gss.sendImageAsSticker(m.from, mediaBuffer, m, { packname: global.packname, author: global.author });
};

export default handleTakeCommand;
