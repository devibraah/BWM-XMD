"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { zokou } = require("../framework/zokou");
zokou({ nomCom: "botrepo", reaction: "🌟", nomFichier: __filename }, async (dest, zk, commandeOptions) => {


const githubRepo = 'https://api.github.com/repos/devibraah/BWM-XMD';
const img = 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg';


    const response = await fetch(githubRepo); 
        const data = await response.json(); 
 
        if (data) {
            const repoInfo = {
                stars: data.stargazers_count,
                forks: data.forks_count,
                lastUpdate: data.updated_at,
                owner: data.owner.login,
               
            };
const releaseDate = new Date(data.created_at).toLocaleDateString('en-GB');
            const lastUpdateDate = new Date(data.updated_at).toLocaleDateString('en-GB');

const gitdata = `👋Hello, This is Bmw-Md. \nA Multidevice Whatsapp User Bot.

Fork and give a star🌟 to our Respiratory. 


✨STARS: ${repoInfo.stars} 
🍴FORKS: ${repoInfo.forks} 
📅RELEASE: ${releaseDate}
🗒️Repo: ${data.html_url}
🕐UPDATE ON: ${repoInfo.lastUpdate}
📲YouTube : _https://www.youtube.com/@ibrahimaotech_
👨‍💻OWNER: *Ibrahim Adams*
__________________________________
      Made on Earth by Ibrahim Adams`;


await zk.sendMessage(dest, { image: { url: img }, caption: gitdata });

} else {
console.log("Could not fetch data")

}


});

