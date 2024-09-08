import generateProfilePicture from '../generateProfilePicture.js';
import { writeFile, unlink } from 'fs/promises';
import config from '../../config.cjs';

const setProfilePicture = async (m, gss) => {
  const botNumber = await gss.decodeJid(gss.user.id);
  const isCreator = [botNumber, config.OWNER_NUMBER + '@s.whatsapp.net'].includes(m.sender);
  const prefix = config.PREFIX;
const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
const text = m.body.slice(prefix.length + cmd.length).trim();

  const validCommands = ['setppfull', 'setfullprofilepic', 'fullpp', 'setppbot'];

  if (validCommands.includes(cmd)) {
    if (!isCreator) return m.reply("*📛 THIS IS AN OWNER COMMAND*");
    if (!m.quoted || m.quoted.mtype !== 'imageMessage') {
      return m.reply(`Send/Reply with an image to set your profile picture ${prefix + cmd}`);
    }

    try {
      const media = await m.quoted.download(); // Download the media from the quoted message
      if (!media) throw new Error('Failed to download media.');

      const filePath = `./${Date.now()}.png`;
      await writeFile(filePath, media);

      try {
        const { img } = await generateProfilePicture(media); // Generate profile picture
        await gss.query({
          tag: 'iq',
          attrs: {
            to: botNumber,
            type: 'set',
            xmlns: 'w:profile:picture'
          },
          content: [{
            tag: 'picture',
            attrs: {
              type: 'image'
            },
            content: img
          }]
        });
        m.reply('Profile picture updated successfully.');
      } catch (err) {
        throw err;
      } finally {
        await unlink(filePath); // Clean up the downloaded file
      }
    } catch (error) {
      console.error('Error setting profile picture:', error);
      m.reply('Error setting profile picture.');
    }
  }
};

export default setProfilePicture;
