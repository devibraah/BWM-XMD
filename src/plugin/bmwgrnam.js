import config from '../../config.cjs';

const setGroupName = async (m, gss) => {
  try {
    const botNumber = await gss.decodeJid(gss.user.id);
    const prefix = config.PREFIX;
const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
const text = m.body.slice(prefix.length + cmd.length).trim();

    const validCommands = ['setgroupname', 'setname'];

    if (!validCommands.includes(cmd)) return;

    if (!m.isGroup) return m.reply("*📛 THIS COMMAND CAN ONLY BE USED IN GROUPS*");
    const groupMetadata = await gss.groupMetadata(m.from);
    const participants = groupMetadata.participants;
    const botAdmin = participants.find(p => p.id === botNumber)?.admin;
    const senderAdmin = participants.find(p => p.id === m.sender)?.admin;

    if (!botAdmin) return m.reply("*📛 BOT MUST BE AN ADMIN TO USE THIS COMMAND*");
    if (!senderAdmin) return m.reply("*📛 YOU MUST BE AN ADMIN TO USE THIS COMMAND*");

    if (!text) return m.reply("*📛 PLEASE PROVIDE A NAME TO SET*");

    await gss.groupUpdateSubject(m.from, text);
    m.reply(`Group Name Has Been Set To: ${text}`);
  } catch (error) {
    console.error('Error:', error);
    m.reply('An error occurred while processing the command.');
  }
};

export default setGroupName;
