import config from '../../config.cjs';

const tagall = async (m, gss) => {
  try {
    const botNumber = await gss.decodeJid(gss.user.id);
    const prefix = config.PREFIX;
const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
const text = m.body.slice(prefix.length + cmd.length).trim();
    
    const validCommands = ['hidetag'];
    if (!validCommands.includes(cmd)) return;


    const groupMetadata = await gss.groupMetadata(m.from);
    const participants = groupMetadata.participants;
    const botAdmin = participants.find(p => p.id === botNumber)?.admin;
    const senderAdmin = participants.find(p => p.id === m.sender)?.admin;
    
        if (!m.isGroup) return m.reply("*📛 THIS COMMAND CAN ONLY BE USED IN GROUPS*");

    if (!botAdmin) return m.reply("*📛 BOT MUST BE AN ADMIN TO USE THIS COMMAND*");
    if (!senderAdmin) return m.reply("*📛 YOU MUST BE AN ADMIN TO USE THIS COMMAND*");
    // Extract the message to be sent
    let message = `乂 *Attention Everyone* 乂\n\n*Message:* ${m.body.slice(prefix.length + cmd.length).trim() || 'no message'}\n\n`;
        


    for (let participant of participants) {
      message += `❒ @${participant.id.split('@')[0]}\n`;
    }

    gss.sendMessage(m.from, { text: m.quoted.text ? m.quoted.text : '', mentions: participants.map(a => a.id) }, { quoted: m });
  } catch (error) {
    console.error('Error:', error);
    await m.reply('An error occurred while processing the command.');
  }
};

export default tagall;
