import config from '../../config.cjs';

const alwaysonlineCommand = async (m, Matrix) => {
  const botNumber = await Matrix.decodeJid(Matrix.user.id);
  const isCreator = [botNumber, config.OWNER_NUMBER + '@s.whatsapp.net'].includes(m.sender);
  const prefix = config.PREFIX;
const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
const text = m.body.slice(prefix.length + cmd.length).trim();

  if (cmd === 'alwaysonline') {
    if (!isCreator) return m.reply("*Only adamin*");
    let responseMessage;

    if (text === 'on') {
      config.ALWAYS_ONLINE = true;
      responseMessage = "Always Online has been enabled.";
    } else if (text === 'off') {
      config.ALWAYS_ONLINE = false;
      responseMessage = "Always Online has been disabled.";
    } else {
      responseMessage = "Usage:\n- `alwaysonline on`: Enable Always Online\n- `alwaysonline off`: Disable Always Online";
    }

    try {
      await Matrix.sendMessage(m.from, { text: responseMessage }, { quoted: m });
    } catch (error) {
      console.error("Error processing your request:", error);
      await Matrix.sendMessage(m.from, { text: 'Error processing your request.' }, { quoted: m });
    }
  }
};

export default alwaysonlineCommand;
