import axios from 'axios';
import config from '../../config.cjs';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const imageCommand = async (m, sock) => {
  const prefix = config.PREFIX;
const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
const arg = m.body.slice(prefix.length + cmd.length).trim();
  const query = args;

  const validCommands = ['pintrest', 'pintrestdl'];

  if (validCommands.includes(cmd)) {
    if (!query) {
      return sock.sendMessage(m.from, { text: `Usage: ${prefix + cmd} naruto` });
    }

    try {
      await m.React("📥");
      const response = await axios.get(`https://pinteresimage.nepcoderdevs.workers.dev/?query=${encodeURIComponent(query)}&limit=5`);
      const results = response.data.results;

      if (results.length === 0) {
        return sock.sendMessage(m.from, { text: 'No images found for your search query.' });
      }

      for (const result of results) {
        await sleep(500);
        const imageUrl = result.imageUrl;
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const imageBuffer = Buffer.from(response.data, 'binary');

        await sock.sendMessage(m.from, { image: imageBuffer, caption: result.title }, { quoted: m });
        await m.React("✅");
      }
    } catch (error) {
      console.error("Error fetching images:", error);
      await sock.sendMessage(m.from, { text: 'Error fetching images.' });
    }
  }
};

export default imageCommand;
