const { adams } = require("../Ibrahim/adams");
const yts = require('yt-search');
//const ytdl = require('ytdl-core');
const fs = require('fs');
const yt=require("../framework/dl/ytdl-core.js")
const ffmpeg = require("fluent-ffmpeg");
const yts1 = require("youtube-yts");
 adams({
  nomCom: "somg2",
  categorie: "Search",
  reaction: "🎧"
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
      const apiResponse = await fetch(`https://api.prabath-md.tech/api/ytmp3?url=${encodeURIComponent(urlElement)}`);
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
          caption: `Bmw is downloading your song....,Song by ${videos[0].author.name},Duration: ${videos[0].timestamp}

          
                                                                                                 
        *_Made by : ©Ibrahim Adams_*`                                                                                                                                                                   
        };

        zk.sendMessage(origineMessage, infoMess, { quoted: ms });

        // Send the audio file using the audio URL
        zk.sendMessage(origineMessage, { audio: { url: audioUrl }, mimetype: 'audio/mp4' }, { quoted: ms, ptt: false });
        console.log("Sending audio file completed!");

        await ms.React('✅');
        repondre('Download Success...');
      } else {
        repondre('Failed to download.');
      }
    } else {
      repondre('No videos found.');
    }
  } catch (error) {
    console.error('Error :', error);
  }
});

adams({
  nomCom: "video2",
  categorie: "Search",
  reaction: "🎥"
}, async (origineMessage, zk, commandeOptions) => {
  const { arg, ms, repondre } = commandeOptions;

  if (!arg[0]) {
    repondre("Please provide video name");
    return;
  }

  const topo = arg.join(" ");
  try {
    const search = await yts(topo);
    const videos = search.videos;

    if (videos && videos.length > 0 && videos[0]) {
      const Element = videos[0];
      const apiResponse = await fetch(`https://api.prabath-md.tech/api/ytmp3?url=${encodeURIComponent(Element.url)}`);
      const apiResult = await apiResponse.json();

      if (apiResult.status === 'success ✅') {
        const videoUrl = apiResult.data.download;
        const fileInfo = {
          title: apiResult.data.title,
          fileSize: apiResult.data.file_size,
          quality: apiResult.data.quality
        };

        let InfoMess = {
          image: { url: videos[0].thumbnail },
          caption: `Bmw is downloading your video....,Video Name ${fileInfo.title},Duration ${Element.timestamp}

*_Made by Ibrahim Adams._*
 `
        };

        zk.sendMessage(origineMessage, InfoMess, { quoted: ms });

        // Send the video file using the video URL
        zk.sendMessage(origineMessage, { video: { url: videoUrl }, mimetype: 'video/mp4' caption: "*Here is your video downloaded successfully ✅", gifPlayback: false }, { quoted: ms });
        console.log("Sending video file completed!");

        await ms.React('✅');
        repondre('Download Success...');
      } else {
        repondre('Failed to download.');
      }
    } else {
      repondre('No video found.');
    }
  } catch (error) {
    console.error('Error ', error);
  }
});

adams({
  nomCom: "play2",
categorie: "Search",
reaction: 🎸"
}, async (origineMessage, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;

 if (!arg[0]) {
    return repondre("Please provide song name");
  }

  try {
    const topo = arg.join(" ");
    const search = await yts(topo);
    const videos = search.videos;

    if (!videos || videos.length <= 0) {
      return repondre(`No matching videos found for: *${topo}*!!`);
    }

    const urlYt = videos[0].url;
    const apiResponse = await fetch(`https://api.prabath-md.tech/api/ytmp3?url=${encodeURIComponent(urlYt)}`);
    const apiResult = await apiResponse.json();

    if (apiResult.status === 'success ✅') {
      const audioUrl = apiResult.data.download;
      const fileInfo = {
        title: apiResult.data.title,
        fileSize: apiResult.data.file_size,
        quality: apiResult.data.quality
      };

      const songDetails = `Bmw is downloading your song....,Song by ${fileInfo.title},Duration: ${videos[0].timestamp}

          
                                                                                                 
         *_Made by : ©Ibrahim Adams_*`


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
      repondre('Download Success...');
    } else {
      repondre('Failed to download.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
});
