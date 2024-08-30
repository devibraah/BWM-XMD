const { adams } = require("../Ibrahim/adams");
const yts = require('yt-search');
//const ytdl = require('ytdl-core');
//const fs = require('fs');
//const yt=require("../framework/dl/ytdl-core.js")
//const ffmpeg = require("fluent-ffmpeg");
//const yts1 = require("youtube-yts");
adams({
  nomCom: "play6",
  categorie: "Search",
  reaction: "🎧"
}, async (origineMessage, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;
     
  if (!arg[0]) {
    repondre("Please provide song name, eg *.p");
    return;
  }

  try {
    let topo = arg.join(" ");
    const search = await yts(topo);
    const videos = search.videos;

    if (videos && videos.length > 0 && videos[0]) {
      const urlElement = videos[0].url;
      const apiResponse = await fetch(`https://prabath-md-api.up.railway.app/api/ytmp4?url=${encodeURIComponent(urlElement)}+ &apikey= + prabath-api_5f6557`);
      const apiResult = await apiResponse.json();

      if (apiResult.status === 'Downloded Successfully ✅') {
        const audioUrl = apiResult.data.download;
        const fileInfo = {
          title: apiResult.data.title,
          fileSize: apiResult.data.file_size,
          quality: apiResult.data.quality
        };

        let infoMess = {
          image: { url: videos[0].thumbnail },
         caption:  `Bmw is downloading ${fileInfo.title} by  ${videos[0].author.name}\n Time : ${videos[0].timestamp}\n\nYou can use telegram bot. Tap on the link
> https://t.me/Ibraah_adams_bot

> ©Ibrahim Adams`

        };

        zk.sendMessage(origineMessage, infoMess, { quoted: ms });

        // Send the audio file using the audio URL
        zk.sendMessage(origineMessage, { audio: { url: audioUrl }, mimetype: 'audio/mp4' }, { quoted: ms, ptt: false });
        console.log("Sending audio file completed!");

        await ms.React('✅');
        repondre('Downloded Successfully ✅');
      } else {
        repondre('Searching...⏳');
      }
    } else {
      repondre('No videos found.');
    }
  } catch (error) {
    console.error('Error from  API:', error);
  }
});
adams({
  nomCom: "play6",
categorie: "Search",
reaction: "🎧"
}, async (origineMessage, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;

 if (!arg[0]) {
    return repondre("Please provide song name.*");
  }

  try {
    const topo = arg.join(" ");
    const search = await yts(topo);
    const videos = search.videos;

    if (!videos || videos.length <= 0) {
      return repondre(`No matching videos found for: *${topo}*!!`);
    }

    const urlYt = videos[0].url;
    const apiResponse = await fetch(`https://prabath-md-api.up.railway.app/api/ytmp4?url=${encodeURIComponent(urlElement)}+ &apikey= + prabath-api_5f6557`);
    const apiResult = await apiResponse.json();

    if (apiResult.status === 'success ✅') {
      const audioUrl = apiResult.data.download;
      const fileInfo = {
        title: apiResult.data.title,
        fileSize: apiResult.data.file_size,
        quality: apiResult.data.quality
      };

      const songDetails =` Bmw is downloading ${fileInfo.title} by ${videos[0].author.name}\n \n Time : ${videos[0].timestamp}\n\nYou can use telegram bot. Tap on the link
> https://t.me/Ibraah_adams_bot

> ©Ibrahim Adams`
      ;

      await zk.sendMessage(origineMessage, { text: songDetails }, { quoted: ms });

      // Send the audio file with the correct name and mimetype
      await zk.sendMessage(
        origineMessage, 
        { 
          document: { url: audioUrl }, 
          mimetype: 'audio/mpeg', 
          fileName: `${fileInfo.title}.mp3` 
        }, 
        { quoted: ms }
      );

      console.log("Sending audio file completed!");

      await ms.React('✅');
      repondre('Downloded Successfully ✅);
    } else {
      repondre('Searching...⏳.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
});
adams({
  nomCom: "song6",
  categorie: "Search",
  reaction: "🎸"
}, async (origineMessage, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;
     
  if (!arg[0]) {
    repondre("Please provide song name");
    return;
  }

  try {
    let topo = arg.join(" ");
    const search = await yts(topo);
    const videos = search.videos;

    if (videos && videos.length > 0 && videos[0]) {
      const urlElement = videos[0].url;
      const apiResponse = await fetch(`https://prabath-md-api.up.railway.app/api/ytmp4?url=${encodeURIComponent(urlElement)}+ &apikey= + prabath-api_5f6557`);
      const apiResult = await apiResponse.json();

      if (apiResult.status === 'success ✅') {
        const audioUrl = apiResult.data.download;
        const fileInfo = {
          title: apiResult.data.title,
          fileSize: apiResult.data.file_size,
          quality: apiResult.data.quality
        };

        let infoMess = {
          image: { url: videos[0].thumbnail },
          caption: `Bmw is downloading ${fileInfo.title} by  ${videos[0].author.name}\n Time : ${videos[0].timestamp}\n\nYou can use telegram bot. Tap on the link
> https://t.me/Ibraah_adams_bot

> ©Ibrahim Adams`

        };

        zk.sendMessage(origineMessage, infoMess, { quoted: ms });

        // Send the audio file using the audio URL
        zk.sendMessage(origineMessage, { audio: { url: audioUrl }, mimetype: 'audio/mp4' }, { quoted: ms, ptt: false });
        console.log("Sending audio file completed!");

        await ms.React('✅');
        repondre('Downloded Successfully ✅');
      } else {
        repondre('Searching...⏳');
      }
    } else {
      repondre('No videos found.');
    }
  } catch (error) {
    console.error('Error from  API:', error);
  }
});
