import config from '../../config.cjs';

const joinGroup = async (m, gss) => {
  try {
    const botNumber = await gss.decodeJid(gss.user.id);
  const isCreator = [botNumber, config.OWNER_NUMBER + '@s.whatsapp.net'].includes(m.sender);
    const prefix = config.PREFIX;
const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
const text = m.body.slice(prefix.length + cmd.length).trim();
    const args = text.split(' ');

    const validCommands = ['join'];

    if (!validCommands.includes(cmd)) return;
    
    

    if (!isCreator) return m.reply("*📛 THIS IS AN OWNER COMMAND*");

    if (!text) throw '*Enter The Group Link!*';
    if (!isUrl(args[0]) && !args[0].includes('whatsapp.com')) throw '*INVALID LINK!*';

    m.reply('Please wait...');
    const result = args[0].split('https://chat.whatsapp.com/')[1];

    await gss.groupAcceptInvite(result)
      .then((res) => m.reply(`*📛 SUCCESSFULLY JOINED THE GROUP. ${JSON.stringify(res)}`))
      .catch((err) => m.reply(`*🚫 FAILED TO JOIN THE GROUP. ${JSON.stringify(err)}`));
  } catch (error) {
    console.error('Error:', error);
    m.reply('An error occurred while processing the command.');
  }
};

const isUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

export default joinGroup;
