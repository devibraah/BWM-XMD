import config from '../../config.cjs';

const leaveGroup = async (m, gss) => {
  try {
    const botNumber = await gss.decodeJid(gss.user.id);
  const isCreator = [botNumber, config.OWNER_NUMBER + '@s.whatsapp.net'].includes(m.sender);
    const prefix = config.PREFIX;
const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
const text = m.body.slice(prefix.length + cmd.length).trim();
    
    const validCommands = ['leave', 'exit', 'left'];

    if (!validCommands.includes(cmd)) return;
    
    if (!m.isGroup) return m.reply("*📛 THIS COMMAND CAN ONLY BE USED IN GROUPS*");

    if (!isCreator) return m.reply("*📛 THIS IS AN OWNER COMMAND*");

    await gss.groupLeave(m.from);
  } catch (error) {
    console.error('Error:', error);
  }
};

export default leaveGroup;
