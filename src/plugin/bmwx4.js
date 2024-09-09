import config from '../../config.cjs';

const autoblockCommand = async (m, Matrix) => {
  const botNumber = await Matrix.decodeJid(Matrix.user.id);
  const isCreator = [botNumber, config.OWNER_NUMBER + '@s.whatsapp.net'].includes(m.sender);
  const prefix = config.PREFIX;
const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
const text = m.body.slice(prefix.length + cmd.length).trim();

  if (cmd === 'autoblock') {
    if (!isCreator) return m.reply("*THIS IS AN OWNER COMMAND*");
    let responseMessage;

    if (text === 'on') {
      config.AUTO_BLOCK = true;
      responseMessage = "Auto-Block has been enabled.";
    } else if (text === 'off') {
      config.AUTO_BLOCK = false;
      responseMessage = "Auto-Block has been disabled.";
    } else {
      responseMessage = "Usage:\n- `autoblock on`: Enable Auto-Block\n- `autoblock off`: Disable Auto-Block";
    }
    try {
      await Matrix.sendMessage(m.from, { text: responseMessage }, { quoted: m });
    } catch (error) {
      console.error("Error processing your request:", error);
      await Matrix.sendMessage(m.from, { text: 'Error processing your request.' }, { quoted: m });
    }
  }
};

export default autoblockCommand;
