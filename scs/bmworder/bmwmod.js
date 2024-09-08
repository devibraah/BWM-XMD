import config from '../../config.cjs';

const modeCommand = async (m, Matrix) => {
    const botNumber = await Matrix.decodeJid(Matrix.user.id);
    const isCreator = [botNumber, config.OWNER_NUMBER + '@s.whatsapp.net'].includes(m.sender);
    const prefix = config.PREFIX;
const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
const text = m.body.slice(prefix.length + cmd.length).trim();


    if (cmd === 'mode') {
        if (!isCreator) {
            await Matrix.sendMessage(m.from, { text: "*📛 THIS IS AN OWNER COMMAND*" }, { quoted: m });
            return;
        }

        if (['public', 'private'].includes(text)) {
            if (text === 'public') {
                Matrix.public = true;
               config.MODE = "public";
                m.reply('Mode has been changed to public.');
            } else if (text === 'private') {
                Matrix.public = false;
                config.MODE = "private";
                m.reply('Mode has been changed to private.');
            } else {
                m.reply("Usage:\n.Mode public/private");
            }
        } else {
            m.reply("Invalid mode. Please use 'public' or 'private'.");
        }
    }
};

export default modeCommand;
