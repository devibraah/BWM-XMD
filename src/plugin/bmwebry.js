import { eBinary } from '../../lib/binary.cjs';
import config from '../../config.cjs';

const ebinary = async (m, gss) => {
const prefix = config.PREFIX;
const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
const text = m.body.slice(prefix.length + cmd.length).trim();

  const validCommands = ['ebinary'];

   if (validCommands.includes(cmd)) {
         if (!text) return m.reply('Please provide a question.');
         let db = await eBinary(text)
         m.reply(db)
   }
};

export default ebinary;
