import nodeFetch from 'node-fetch';
import config from '../../config.cjs';

const flirting = async (m, Matrix) => {
  const prefix = config.PREFIX;
const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
const text = m.body.slice(prefix.length + cmd.length).trim();
  const validCommands = ['flirt'];

  if (validCommands.includes(cmd)) {
    try {
      const apiKey = 'shizo';

      const response = await nodeFetch(`https://shizoapi.onrender.com/api/texts/flirt?apikey=${apiKey}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch flirt message: ${await response.text()}`);
      }

      const json = await response.json();
      const result = json.result;
      await Matrix.sendMessage(m.from, { text: result, mentions: [m.sender] }, { quoted: m });
    } catch (error) {
      console.error('Error fetching flirt message:', error);
      await Matrix.sendMessage(m.from, { text: "Failed to retrieve flirt message. Please try again later." });
    }
  }
};

export default flirting;
