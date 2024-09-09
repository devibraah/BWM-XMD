import { toAudio } from '../../lib/converter.cjs';
import config from '../../config.cjs';

const tomp3 = async (m, gss) => {
  try {
    const prefix = config.PREFIX;
const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
const text = m.body.slice(prefix.length + cmd.length).trim();

    const validCommands = ['tomp3', 'mp3'];

    if (!validCommands.includes(cmd)) return;

    if (!m.quoted || m.quoted.mtype !== 'videoMessage') {
      return m.reply(`Send/Reply with Video to convert into MP3 with caption ${prefix + cmd}`);
    }

    m.reply('Converting to MP3, please wait...');
    const media = await m.quoted.download();
    const audio = await toAudio(media, 'mp4'); // Correctly importing toAudio function

    await gss.sendMessage(m.from, { document: audio, mimetype: 'audio/mpeg', fileName: `Converted By ${gss.user.name}.mp3` }, { quoted: m });
  } catch (error) {
    console.error('Error:', error);
    m.reply('An error occurred while processing the command.');
  }
};

export default tomp3;
