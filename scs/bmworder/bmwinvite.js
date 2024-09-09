import config from '../../config.cjs';

const invite = async (m, gss) => {
  try {
    const prefix = config.PREFIX;
const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
const text = m.body.slice(prefix.length + cmd.length).trim();

    const validCommands = ['invite', 'add'];

    if (!validCommands.includes(cmd)) return;
    
    if (!m.isGroup) return m.reply("*🚫 THIS COMMAND CAN ONLY BE USED IN GROUPS*");

    const text = m.body.slice(prefix.length + cmd.length).trim();
    
    const botNumber = await gss.decodeJid(gss.user.id);
    const isBotAdmins = groupMetadata.participants.find(p => p.id === botNumber)?.admin;

    if (!isBotAdmins) {
      return m.reply('*📛 BOT MUST BE AN ADMIN TO USE THIS COMMAND.*');
    }

    if (!text) return m.reply(`*📛 ENTER THE NUMBER YOU WANT TO INVITE TO THE GROUP*\n\nExample:\n*${prefix + cmd}* 254xxxxxxx`);
    if (text.includes('+')) return m.reply(`*📛 ENTER THE NUMBER TOGETHER WITHOUT *+*`);
    if (isNaN(text)) return m.reply(`*📛 ENTER ONLY THE NUMBERS PLUS YOUR COUNTRY CODE WITHOUT SPACES`);

    const group = m.from;
    const groupMetadata = await gss.groupMetadata(group);
    const link = 'https://chat.whatsapp.com/' + await gss.groupInviteCode(group);
    const inviteMessage = `≡ *GROUP INVITATION*\n\nA USER INVITES YOU TO JOIN THE GROUP "${groupMetadata.subject}".\n\nInvite Link: ${link}\n\nINVITED BY: @${m.sender.split('@')[0]}`;

    await gss.sendMessage(`${text}@s.whatsapp.net`, { text: inviteMessage, mentions: [m.sender] });
    m.reply(`*☑ AN INVITE LINK IS SENT TO THE USER.*`);

  } catch (error) {
    console.error('Error:', error);
    m.reply('An error occurred while processing the command.');
  }
};

export default invite;
