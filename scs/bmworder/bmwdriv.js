import pkg from "nayan-media-downloader";
const { GDLink } = pkg;
import config from '../../config.cjs';

const gdriveDownload = async (m, Matrix) => {
  const prefix = config.PREFIX;
const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
const text = m.body.slice(prefix.length + cmd.length).trim();

  const validCommands = ['gdrive', 'gd', 'gddownload'];

  if (validCommands.includes(cmd)) {
    if (!text) return m.reply('Please provide a Google Drive URL.');

    try {
      await m.React('🕘');

      const gdriveUrl = text;
      const gdriveInfo = await GDLink(gdriveUrl);

      if (gdriveInfo && gdriveInfo.status && gdriveInfo.data) {
        const mediaUrl = gdriveInfo.data;
        const caption = `> © Powered By BMW-MD`;

        // Inferring the file type based on the file extension
        const extension = mediaUrl.split('.').pop().toLowerCase();

        // Send the media using Matrix.sendMedia
        await Matrix.sendMedia(m.from, mediaUrl, extension, caption, m);

        await m.React('✅');
      } else {
        throw new Error('Invalid response from Google Drive.');
      }
    } catch (error) {
      console.error('Error downloading Google Drive file:', error.message);
      m.reply('Error downloading Google Drive file.');
      await m.React('❌');
    }
  }
};

export default gdriveDownload;
