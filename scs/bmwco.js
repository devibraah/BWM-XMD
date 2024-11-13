//adams code

const { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter');
const { adams } = require("../Ibrahim/adams");
const traduire = require("../Ibrahim/traduction");
const { downloadMediaMessage, downloadContentFromMessage } = require('@whiskeysockets/baileys');
const fs = require("fs-extra");
const axios = require('axios');
const { exec } = require("child_process");
const ffmpeg = require("fluent-ffmpeg");
const FormData = require('form-data');
const { Catbox } = require('node-catbox'); // Import Catbox

const catbox = new Catbox();

async function uploadToCatbox(Path) {
    if (!fs.existsSync(Path)) {
        throw new Error("Fichier non existant");
    }

    try {
        // Use Catbox to upload the file
        const response = await catbox.uploadFile({
            path: Path // Provide the path to the file
        });

        if (response) {
            return response; // returns the uploaded file URL
        } else {
            throw new Error("Erreur lors de la récupération du lien du fichier");
        }
    } catch (err) {
        throw new Error(String(err));
    }
}

adams({ nomCom: "url", categorie: "General", reaction: "👨🏿‍💻" }, async (origineMessage, zk, commandeOptions) => {
  const { msgRepondu, repondre } = commandeOptions;

  if (!msgRepondu) {
      repondre('mention a image or video');
      return;
  }

  let mediaPath, mediaType;

  if (msgRepondu.videoMessage) {
      const videoSize = msgRepondu.videoMessage.fileLength;  // Get the video size in bytes

      // Check if the video size exceeds the limit (e.g., 50MB = 50 * 1024 * 1024 bytes)
      if (videoSize > 50 * 1024 * 1024) {
          repondre('The video is too long. Please send a smaller video.');
          return;
      }

      mediaPath = await zk.downloadAndSaveMediaMessage(msgRepondu.videoMessage);
      mediaType = 'video';
  } else if (msgRepondu.imageMessage) {
      mediaPath = await zk.downloadAndSaveMediaMessage(msgRepondu.imageMessage);
      mediaType = 'image';
  } else {
      repondre('reply to an image or video');
      return;
  }

  try {
      const catboxUrl = await uploadToCatbox(mediaPath);
      fs.unlinkSync(mediaPath);  // Supprime le fichier après utilisation

      // Respond with a custom message based on media type
      if (mediaType === 'image') {
          repondre(`Below is your image URL:\n${catboxUrl}`);
      } else if (mediaType === 'video') {
          repondre(`Below is your video URL:\n${catboxUrl}`);
      }
  } catch (error) {
      console.error('Error while creating your url:', error);
      repondre('Oops error');
  }
});

adams({nomCom:"sticker",categorie: "Conversion", reaction: "👨🏿‍💻"},async(origineMessage,zk,commandeOptions)=>{

let {ms,mtype,arg,repondre,nomAuteurMessage}=commandeOptions
  var txt=JSON.stringify(ms.message)

  var mime=mtype === "imageMessage" || mtype === "videoMessage";
  var tagImage = mtype==="extendedTextMessage" && txt.includes("imageMessage")
  var tagVideo = mtype==="extendedTextMessage" && txt.includes("videoMessage")

const alea = (ext) => {
  return `${Math.floor(Math.random() * 10000)}${ext}`;};


  const stickerFileName = alea(".webp");


            // image
  if (mtype === "imageMessage" ||tagImage) {
    let downloadFilePath;
    if (ms.message.imageMessage) {
      downloadFilePath = ms.message.imageMessage;
    } else {
      // picture mentioned
      downloadFilePath =
        ms.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage;
    }
    // picture
    const media = await downloadContentFromMessage(downloadFilePath, "image");
    let buffer = Buffer.from([]);
    for await (const elm of media) {
      buffer = Buffer.concat([buffer, elm]);
    }

    sticker = new Sticker(buffer, {
      pack:"BMW-MD",
      author: nomAuteurMessage,
      type:
        arg.includes("crop") || arg.includes("c")
          ? StickerTypes.CROPPED
          : StickerTypes.FULL,
      quality: 100,
    });
  } else if (mtype === "videoMessage" || tagVideo) {
    // videos
    let downloadFilePath;
    if (ms.message.videoMessage) {
      downloadFilePath = ms.message.videoMessage;
    } else {
      downloadFilePath =
        ms.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage;
    }
    const stream = await downloadContentFromMessage(downloadFilePath, "video");
    let buffer = Buffer.from([]);
    for await (const elm of stream) {
      buffer = Buffer.concat([buffer, elm]);
    }

    sticker = new Sticker(buffer, {
      pack:"BMW-MD", // pack stick
      author:  nomAuteurMessage, // name of the author of the stick
      type:
        arg.includes("-r") || arg.includes("-c")
          ? StickerTypes.CROPPED
          : StickerTypes.FULL,
      quality: 40,
    });
  } else {
    repondre("Please mention an image or video!");
    return;
  }

  await sticker.toFile(stickerFileName);
  await zk.sendMessage(
    origineMessage,
    {
      sticker: fs.readFileSync(stickerFileName),
    },
    { quoted: ms }
  );

try{
  fs.unlinkSync(stickerFileName)
}catch(e){console.log(e)}





  
});

adams({nomCom:"scrop",categorie: "Conversion", reaction: "👨🏿‍💻"},async(origineMessage,zk,commandeOptions)=>{
   const {ms , msgRepondu,arg,repondre,nomAuteurMessage} = commandeOptions ;

  if(!msgRepondu) { repondre( 'make sure to mention the media' ) ; return } ;
  if(!(arg[0])) {
       pack = nomAuteurMessage
  } else {
    pack = arg.join(' ')
  } ;
  if (msgRepondu.imageMessage) {
     mediamsg = msgRepondu.imageMessage
  } else if(msgRepondu.videoMessage) {
mediamsg = msgRepondu.videoMessage
  } 
  else if (msgRepondu.stickerMessage) {
    mediamsg = msgRepondu.stickerMessage ;
  } else {
    repondre('Uh media please'); return
  } ;

  var stick = await zk.downloadAndSaveMediaMessage(mediamsg)

     let stickerMess = new Sticker(stick, {
            pack: Bmw-Md,
            
            type: StickerTypes.CROPPED,
            categories: ["🤩", "🎉"],
            id: "12345",
            quality: 70,
            background: "transparent",
          });
          const stickerBuffer2 = await stickerMess.toBuffer();
          zk.sendMessage(origineMessage, { sticker: stickerBuffer2 }, { quoted: ms });

});

adams({nomCom:"take",categorie: "Conversion", reaction: "👨🏿‍💻"},async(origineMessage,zk,commandeOptions)=>{
   const {ms , msgRepondu,arg,repondre,nomAuteurMessage} = commandeOptions ;

  if(!msgRepondu) { repondre( 'make sure to mention the media' ) ; return } ;
  if(!(arg[0])) {
       pack = nomAuteurMessage
  } else {
    pack = arg.join(' ')
  } ;
  if (msgRepondu.imageMessage) {
     mediamsg = msgRepondu.imageMessage
  } else if(msgRepondu.videoMessage) {
mediamsg = msgRepondu.videoMessage
  } 
  else if (msgRepondu.stickerMessage) {
    mediamsg = msgRepondu.stickerMessage ;
  } else {
    repondre('Uh a media please'); return
  } ;

  var stick = await zk.downloadAndSaveMediaMessage(mediamsg)

     let stickerMess = new Sticker(stick, {
            pack: BMW-MD,
            
            type: StickerTypes.FULL,
            categories: ["🤩", "🎉"],
            id: "12345",
            quality: 70,
            background: "transparent",
          });
          const stickerBuffer2 = await stickerMess.toBuffer();
          zk.sendMessage(origineMessage, { sticker: stickerBuffer2 }, { quoted: ms });

});



adams({ nomCom: "write", categorie: "Conversion", reaction: "👨🏿‍💻" }, async (origineMessage, zk, commandeOptions) => {
  const { ms, msgRepondu, arg, repondre, nomAuteurMessage } = commandeOptions;

  if (!msgRepondu) {
    repondre('Please mention an image');
    return;
  }

  if (!msgRepondu.imageMessage) {
    repondre('The command only works with images');
    return;
  } ;
  text = arg.join(' ') ;
  
  if(!text || text === null) {repondre('Make sure to insert text') ; return } ;
 
  
  const mediamsg = msgRepondu.imageMessage;
  const image = await zk.downloadAndSaveMediaMessage(mediamsg);

  //Create a FormData object
  const data = new FormData();
  data.append('image', fs.createReadStream(image));

  //Configure headers
  const clientId = 'b40a1820d63cd4e'; // Replace with your Imgur client ID
  const headers = {
    'Authorization': `Client-ID ${clientId}`,
    ...data.getHeaders()
  };

  // Configure the query
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api.imgur.com/3/image',
    headers: headers,
    data: data
  };

  try {
    const response = await axios(config);
    const imageUrl = response.data.data.link;
    console.log(imageUrl)

    //Use imageUrl however you want (meme creation, etc.)
    const meme = `https://api.memegen.link/images/custom/-/${text}.png?background=${imageUrl}`;

    // Create the sticker
    const stickerMess = new Sticker(meme, {
      pack: nomAuteurMessage,
      author: 'BMW-MD',
      type: StickerTypes.FULL,
      categories: ["🤩", "🎉"],
      id: "12345",
      quality: 70,
      background: "transparent",
    });

    const stickerBuffer2 = await stickerMess.toBuffer();
    zk.sendMessage(
      origineMessage,
      { sticker: stickerBuffer2 },
      { quoted: ms }
    );

  } catch (error) {
    console.error('Error uploading to Imgur :', error);
    repondre('An error occurred while creating the meme.');
  }
});



adams({nomCom:"photo",categorie: "Conversion", reaction: "👨🏿‍💻"},async(dest,zk,commandeOptions)=>{
   const {ms , msgRepondu,arg,repondre,nomAuteurMessage} = commandeOptions ;

  if(!msgRepondu) { repondre( 'make sure to mention the media' ) ; return } ;
 
   if (!msgRepondu.stickerMessage) {
      repondre('Um mention a non-animated sticker'); return
  } ;

 let mediaMess = await zk.downloadAndSaveMediaMessage(msgRepondu.stickerMessage);

  const alea = (ext) => {
  return `${Math.floor(Math.random() * 10000)}${ext}`;};
  
  let ran = await alea(".png");

  
        exec(`ffmpeg -i ${mediaMess} ${ran}`, (err) => {
          fs.unlinkSync(mediaMess);
          if (err) {
            zk.sendMessage(
              dest,
              {
                text: 'A non-animated sticker please',
              },
              { quoted: ms }
            );
            return;
          }
          let buffer = fs.readFileSync(ran);
          zk.sendMessage(
            dest,
            { image: buffer },
            { quoted: ms }
          );
          fs.unlinkSync(ran);
        });
});

adams({ nomCom: "trt", categorie: "Conversion", reaction: "👨🏿‍💻" }, async (dest, zk, commandeOptions) => {

  const { msgRepondu, repondre , arg } = commandeOptions;

  
   if(msgRepondu) {
     try {
      
     

       if(!arg || !arg[0]) { repondre('(eg : trt en)') ; return }
   

         let texttraduit = await traduire(msgRepondu.conversation , {to : arg[0]}) ;

         repondre(texttraduit)

        } catch (error) {
          
          repondre('Mention a texte Message') ;
      
        }

   } else {
     
     repondre('Mention a texte Message')
   }



}) ;
