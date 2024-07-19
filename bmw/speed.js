"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { zokou } = require("../framework/zokou");
zokou({ nomCom: "repo", reaction: "📂", nomFichier: __filename }, async (dest, zk, commandeOptions) => {


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

const gitdata = `𝐁𝐌𝐖 𝐌𝐃 𝐆𝐈𝐓𝐇𝐔𝐁 𝐈𝐍𝐅𝐎𝐌𝐄𝐓𝐈𝐎𝐍.  \n𝐂𝐑𝐄𝐓𝐄𝐃 𝐁𝐘 𝐈𝐁𝐑𝐀𝐇𝐈𝐌 𝐀𝐃𝐀𝐌𝐒.

𝐒𝐓𝐀𝐑⭐ 𝐓𝐇𝐄 𝐑𝐄𝐏𝐎 𝐓𝐇𝐄𝐍 𝐅𝐎𝐑𝐊🍴

📂 Repository Name: *BMW-MD*
📝 Last Update: ${repoInfo.lastUpdate}
👤 Owner: *Ibrahim Adams*
⭐ Stars: ${repoInfo.stars}
🍴 Forks: ${repoInfo.forks}
🌐 Repo: ${data.html_url}
⭕ For More Info : https://github.com/IBRAHIM-TECH-AI/IBRAHIM-ADAMS-INFO⁠
`;


await zk.sendMessage(dest, { image: { url: img }, caption: gitdata });

} else {
console.log("Could not fetch data")

}


});

zokou({ nomCom: "git", reaction: "📂", nomFichier: __filename }, async (dest, zk, commandeOptions) => {


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

const gitdata = `𝐁𝐌𝐖 𝐌𝐃 𝐆𝐈𝐓𝐇𝐔𝐁 𝐈𝐍𝐅𝐎𝐌𝐄𝐓𝐈𝐎𝐍.  \n𝐂𝐑𝐄𝐓𝐄𝐃 𝐁𝐘 𝐈𝐁𝐑𝐀𝐇𝐈𝐌 𝐀𝐃𝐀𝐌𝐒.

𝐒𝐓𝐀𝐑⭐ 𝐓𝐇𝐄 𝐑𝐄𝐏𝐎 𝐓𝐇𝐄𝐍 𝐅𝐎𝐑𝐊🍴

📂 Repository Name: *BMW-MD*
📝 Last Update: ${repoInfo.lastUpdate}
👤 Owner: *Ibrahim Adams*
⭐ Stars: ${repoInfo.stars}
🍴 Forks: ${repoInfo.forks}
🌐 Repo: ${data.html_url}
⭕ For More Info : https://github.com/IBRAHIM-TECH-AI/IBRAHIM-ADAMS`;


await zk.sendMessage(dest, { image: { url: img }, caption: gitdata });

} else {
console.log("Could not fetch data")

}


});

zokou({ nomCom: "sc", reaction: "📂", nomFichier: __filename }, async (dest, zk, commandeOptions) => {


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

const gitdata = `𝐁𝐌𝐖 𝐌𝐃 𝐆𝐈𝐓𝐇𝐔𝐁 𝐈𝐍𝐅𝐎𝐌𝐄𝐓𝐈𝐎𝐍.  \n𝐂𝐑𝐄𝐓𝐄𝐃 𝐁𝐘 𝐈𝐁𝐑𝐀𝐇𝐈𝐌 𝐀𝐃𝐀𝐌𝐒.

𝐒𝐓𝐀𝐑⭐ 𝐓𝐇𝐄 𝐑𝐄𝐏𝐎 𝐓𝐇𝐄𝐍 𝐅𝐎𝐑𝐊🍴

📂 Repository Name: *BMW-MD*
📝 Last Update: ${repoInfo.lastUpdate}
👤 Owner: *Ibrahim Adams*
⭐ Stars: ${repoInfo.stars}
🍴 Forks: ${repoInfo.forks}
🌐 Repo: ${data.html_url}
⭕ For More Info : https://github.com/IBRAHIM-TECH-AI/IBRAHIM-ADAMS-INFO⁠
`;


await zk.sendMessage(dest, { image: { url: img }, caption: gitdata });

} else {
console.log("Could not fetch data")

}


});

zokou({ nomCom: "script", reaction: "📂", nomFichier: __filename }, async (dest, zk, commandeOptions) => {


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

const gitdata = `𝐁𝐌𝐖 𝐌𝐃 𝐆𝐈𝐓𝐇𝐔𝐁 𝐈𝐍𝐅𝐎𝐌𝐄𝐓𝐈𝐎𝐍.  \n𝐂𝐑𝐄𝐓𝐄𝐃 𝐁𝐘 𝐈𝐁𝐑𝐀𝐇𝐈𝐌 𝐀𝐃𝐀𝐌𝐒.

𝐒𝐓𝐀𝐑⭐ 𝐓𝐇𝐄 𝐑𝐄𝐏𝐎 𝐓𝐇𝐄𝐍 𝐅𝐎𝐑𝐊🍴

📂 Repository Name: *BMW-MD*
📝 Last Update: ${repoInfo.lastUpdate}
👤 Owner: *Ibrahim Adams*
⭐ Stars: ${repoInfo.stars}
🍴 Forks: ${repoInfo.forks}
🌐 Repo: ${data.html_url}
⭕ For More Info : https://github.com/IBRAHIM-TECH-AI/IBRAHIM-ADAMS-INFO⁠
`;


await zk.sendMessage(dest, { image: { url: img }, caption: gitdata });

} else {
console.log("Could not fetch data")

}


});


