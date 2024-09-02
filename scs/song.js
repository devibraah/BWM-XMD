const { adams } = require("../Ibrahim/adams");
const yts = require('yt-search');


adams({
  nomCom: "sing",
  categorie: "Search",
  reaction: "🎥"
}, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;

  if (!arg[0]) {
    repondre("Please insert a song/video name.");
    return;
  }

  try {
    let topo = arg.join(" ");
    let videos = [];

    // Perform YouTube search
    const search = await yts(topo);
    videos = search.videos;

    if (videos && videos.length > 0) {
      const videoUrl = videos[0].url;
//repondre(videoUrl)

      
      // Call the API endpoint with the video URL to fetch the video download URL
      const apiResponse = await fetch(`https://prabath-md-api.up.railway.app/api/ytmp3?url=${encodeURIComponent(videoUrl)}&apikey=prabath-api_9d4fdb`);
      const apiResult = await apiResponse.json();

        
      if (apiResult.status === 200 && apiResult.success) {
        const audioDlUrl = apiResult.result.download_url;

        // Prepare the message with video details
        const infoMess = {
          image: { url: videos[0].thumbnail },
          caption: `*BMW-MD SONG PLAYER*\n\n*©Ibrahim Adams*`

        };

        // Send video details
        await zk.sendMessage(dest, infoMess, { quoted: ms });

        // Send the video as a URL (direct download link)
        await zk.sendMessage(dest, {
          video: { url: videoDlUrl },
          mimetype: 'video/mp4'
        }, { quoted: ms });

        repondre('*Error*');
    } else {
      repondre('No videos found.');
    }
    } else {
  
    repondre('An error occurred while searching or downloading the video.' + error);
  }
});
