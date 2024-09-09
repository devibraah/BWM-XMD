import config from '../../config.cjs';

const deleteMessage = async (m, gss) => {
  try {
    const botNumber = await gss.decodeJid(gss.user.id);
    const isCreator = [botNumber, config.OWNER_NUMBER + '@s.whatsapp.net'].includes(m.sender);
    const prefix = config.PREFIX;
const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
const text = m.body.slice(prefix.length + cmd.length).trim();

    const validCommands = ['del', 'delete'];

    if (validCommands.includes(cmd)) {
      if (!isCreator) {
        return m.reply("*📛 THIS IS AN OWNER COMMAND*");
      }

      if (!m.quoted) {
        return m.reply('✳️ Reply to the message you want to delete');
      }

      const key = {
        remoteJid: m.from,
        id: m.quoted.key.id,
        participant: m.quoted.key.participant || m.quoted.key.remoteJid
      };

      await gss.sendMessage(m.from, { delete: key });
    }
  } catch (error) {
    console.error('Error deleting message:', error);
    m.reply('An error occurred while trying to delete the message.');
  }
};

export default deleteMessage;
