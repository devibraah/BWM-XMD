const { adams } = require("../Ibrahim/adams");
const yts = require('yt-search');
//const ytdl = require('ytdl-core');
const fs = require('fs');
const yt=require("../Ibrahim/dl/ytdl-core.js")
const ffmpeg = require("fluent-ffmpeg");
const yts1 = require("youtube-yts");
adams({
  nomCom: "play2",
categorie: "Search",
reaction: "🎧"
}, async (origineMessage, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;

 if (!arg[0]) {
    return repondre(" Please provide song name.*");
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

      const songDetails = `*Bmw is downloading your song...*`;

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
      repondre('Failed to download audio. Please try again later.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
});
adams({
  nomCom: "song2",
  categorie: "Search",
  reaction: "🎸"
}, async (origineMessage, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;
     
  if (!arg[0]) {
    repondre("Please provide song name.*.");
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
          caption: `*Bmw is downloading your song....`
        };

        zk.sendMessage(origineMessage, infoMess, { quoted: ms });

        // Send the audio file using the audio URL
        zk.sendMessage(origineMessage, { audio: { url: audioUrl }, mimetype: 'audio/mp4' }, { quoted: ms, ptt: false });
        console.log("Sending audio file completed!");

        await ms.React('✅');
        repondre('Download Success...');
      } else {
        repondre('Failed to download audio. Please try again later.');
      }
    } else {
      repondre('No videos found.');
    }
  } catch (error) {
    console.error('Error from API:', error);
  }
});













/**
function _0x5150(){const _0x4f46d=['log','url','sendMessage','download','join','Bmw\x20md\x20is\x20downloading\x20your\x20song......','574NkTHYj','314874jPwUrk','Error\x20:','length','data','error','7nNvVHX','quality','Sending\x20audio\x20file\x20completed!','Song\x20downloaded\x20successfully\x20✅.','Error:','52535NNHiuG','628290fQYmEp','2742jsiDWj','success\x20✅','thumbnail','play2','json','150UAapZo','Failed\x20to\x20download\x20audio.\x20Please\x20try\x20again\x20later.','audio/mp4','yt-search','song2','React','178380LYaUiQ','Insert\x20a\x20song\x20name','status','title','Search','audio/mpeg','1648024omPEgN','../framework/zokou','https://api.prabath-md.tech/api/ytmp3?url=','2886570oLqwWm'];_0x5150=function(){return _0x4f46d;};return _0x5150();}const _0x49477a=_0x1255;function _0x1255(_0x24d525,_0x4dba52){const _0x5150c7=_0x5150();return _0x1255=function(_0x125575,_0x3bf2ff){_0x125575=_0x125575-0x17a;let _0x5d28db=_0x5150c7[_0x125575];return _0x5d28db;},_0x1255(_0x24d525,_0x4dba52);}(function(_0x2229fa,_0x2ed1c7){const _0x1efefe=_0x1255,_0x22f5b0=_0x2229fa();while(!![]){try{const _0x22611a=parseInt(_0x1efefe(0x17d))/0x1+parseInt(_0x1efefe(0x17c))/0x2*(-parseInt(_0x1efefe(0x189))/0x3)+parseInt(_0x1efefe(0x194))/0x4+parseInt(_0x1efefe(0x187))/0x5*(-parseInt(_0x1efefe(0x18e))/0x6)+parseInt(_0x1efefe(0x182))/0x7*(parseInt(_0x1efefe(0x19a))/0x8)+-parseInt(_0x1efefe(0x188))/0x9+parseInt(_0x1efefe(0x19d))/0xa;if(_0x22611a===_0x2ed1c7)break;else _0x22f5b0['push'](_0x22f5b0['shift']());}catch(_0x3f1a1f){_0x22f5b0['push'](_0x22f5b0['shift']());}}}(_0x5150,0x3f4fe));const {zokou}=require(_0x49477a(0x19b));constts=require(_0x49477a(0x191)),zokou({'nomCom':_0x49477a(0x192),'categorie':'Search','reaction':'🎸'},async(_0x26233f,_0xa13c92,_0x24f682)=>{const _0x1d1ba8=_0x49477a,{ms:_0x55bd20,repondre:_0x29c626,arg:_0x11cfb8}=_0x24f682;if(!_0x11cfb8[0x0]){_0x29c626('Please\x20insert\x20a\x20song\x20name.');return;}try{let _0x1785fa=_0x11cfb8[_0x1d1ba8(0x17a)]('\x20');const _0x585e54=await yts(_0x1785fa),_0x5c8581=_0x585e54['videos'];if(_0x5c8581&&_0x5c8581[_0x1d1ba8(0x17f)]>0x0&&_0x5c8581[0x0]){const _0x31211d=_0x5c8581[0x0][_0x1d1ba8(0x19f)],_0x423444=await fetch(_0x1d1ba8(0x19c)+encodeURIComponent(_0x31211d)),_0x2d46c9=await _0x423444[_0x1d1ba8(0x18d)]();if(_0x2d46c9['status']===_0x1d1ba8(0x18a)){const _0x20b598=_0x2d46c9[_0x1d1ba8(0x180)][_0x1d1ba8(0x1a1)],_0x4bec8d={'title':_0x2d46c9[_0x1d1ba8(0x180)][_0x1d1ba8(0x197)],'fileSize':_0x2d46c9[_0x1d1ba8(0x180)]['file_size'],'quality':_0x2d46c9[_0x1d1ba8(0x180)]['quality']};let _0xdf372d={'image':{'url':_0x5c8581[0x0][_0x1d1ba8(0x18b)]},'caption':_0x1d1ba8(0x17b)};_0xa13c92[_0x1d1ba8(0x1a0)](_0x26233f,_0xdf372d,{'quoted':_0x55bd20}),_0xa13c92[_0x1d1ba8(0x1a0)](_0x26233f,{'audio':{'url':_0x20b598},'mimetype':_0x1d1ba8(0x190)},{'quoted':_0x55bd20,'ptt':![]}),console['log'](_0x1d1ba8(0x184)),await _0x55bd20[_0x1d1ba8(0x193)]('✅'),_0x29c626('Download\x20Success...');}else _0x29c626('Failed\x20to\x20download.');}else _0x29c626('No\x20videos\x20found.');}catch(_0x3bae6d){console[_0x1d1ba8(0x181)](_0x1d1ba8(0x17e),_0x3bae6d),_0x29c626('Search\x20⏳');}}),zokou({'nomCom':_0x49477a(0x18c),'categorie':_0x49477a(0x198),'reaction':'🎧'},async(_0x57e962,_0x3dd446,_0x34b179)=>{const _0xef2e60=_0x49477a,{ms:_0x465d99,repondre:_0x48440b,arg:_0x25db9d}=_0x34b179;if(!_0x25db9d[0x0])return _0x48440b(_0xef2e60(0x195));try{const _0x38da18=_0x25db9d[_0xef2e60(0x17a)]('\x20'),_0x13c2cd=await yts(_0x38da18),_0x178895=_0x13c2cd['videos'];if(!_0x178895||_0x178895['length']<=0x0)return _0x48440b('No\x20matching\x20videos:\x20*'+_0x38da18+'*!!');const _0x3a352e=_0x178895[0x0][_0xef2e60(0x19f)],_0xfe1f1e=await fetch(_0xef2e60(0x19c)+encodeURIComponent(_0x3a352e)),_0x44ad30=await _0xfe1f1e[_0xef2e60(0x18d)]();if(_0x44ad30[_0xef2e60(0x196)]==='success\x20✅'){const _0x57d0e6=_0x44ad30[_0xef2e60(0x180)][_0xef2e60(0x1a1)],_0x480b46={'title':_0x44ad30[_0xef2e60(0x180)][_0xef2e60(0x197)],'fileSize':_0x44ad30[_0xef2e60(0x180)]['file_size'],'quality':_0x44ad30[_0xef2e60(0x180)][_0xef2e60(0x183)]},_0xcb103c='Bmw\x20md\x20is\x20downloading\x20your\x20song....';await _0x3dd446[_0xef2e60(0x1a0)](_0x57e962,{'text':_0xcb103c},{'quoted':_0x465d99}),await _0x3dd446['sendMessage'](_0x57e962,{'document':{'url':_0x57d0e6},'mimetype':_0xef2e60(0x199),'fileName':_0x480b46[_0xef2e60(0x197)]+'.mp3'},{'quoted':_0x465d99}),console[_0xef2e60(0x19e)](_0xef2e60(0x184)),_0x48440b('Download\x20Success...');}else _0x48440b(_0xef2e60(0x18f));}catch(_0x52e476){console[_0xef2e60(0x181)](_0xef2e60(0x186),_0x52e476),_0x48440b(_0xef2e60(0x185));}});

const {
  zokou
} = require("../framework/zokou");
constts = require("yt-search");
zokou({
  'nomCom': "song2",
  'categorie': "Search",
  'reaction': '🎸'
}, async (_0xb6f0ef, _0x1fc117, _0x418675) => {
  const {
    ms: _0x12dc22,
    repondre: _0xa4a4d4,
    arg: _0x1973c4
  } = _0x418675;
  if (!_0x1973c4[0]) {
    _0xa4a4d4("Please insert a song name.");
    return;
  }
  try {
    let _0x3b2458 = _0x1973c4.join(" ");
    const _0x81433 = await yts(_0x3b2458);
    const _0x26e24c = _0x81433.videos;
    if (_0x26e24c && _0x26e24c.length > 0 && _0x26e24c[0]) {
      const _0x65ebb8 = _0x26e24c[0].url;
      const _0x5857b3 = await fetch("https://api.prabath-md.tech/api/ytmp3?url=" + encodeURIComponent(_0x65ebb8));
      const _0x3ad9f7 = await _0x5857b3.json();
      if (_0x3ad9f7.status === "success ✅") {
        const _0x43bd14 = _0x3ad9f7.data.download;
        const _0x38e86d = {
          'title': _0x3ad9f7.data.title,
          'fileSize': _0x3ad9f7.data.file_size,
          'quality': _0x3ad9f7.data.quality
        };
        let _0x455609 = {
          'image': {
            'url': _0x26e24c[0].thumbnail
          },
          'caption': "Bmw md is downloading your song......"
        };
        _0x1fc117.sendMessage(_0xb6f0ef, _0x455609, {
          'quoted': _0x12dc22
        });
        _0x1fc117.sendMessage(_0xb6f0ef, {
          'audio': {
            'url': _0x43bd14
          },
          'mimetype': "audio/mp4"
        }, {
          'quoted': _0x12dc22,
          'ptt': false
        });
        console.log("Sending audio file completed!");
        await _0x12dc22.React('✅');
        _0xa4a4d4("Download Success...");
      } else {
        _0xa4a4d4("Failed to download.");
      }
    } else {
      _0xa4a4d4("No videos found.");
    }
  } catch (_0x1713c4) {
    console.error("Error :", _0x1713c4);
    _0xa4a4d4("Search ⏳");
  }
});

zokou({
  'nomCom': "play2",
  'categorie': "Search",
  'reaction': '🎧'
}, async (_0x25dfef, _0x464ffe, _0x766495) => {
  const {
    ms: _0x5b6b7f,
    repondre: _0x5114fc,
    arg: _0x535f1a
  } = _0x766495;
  if (!_0x535f1a[0]) {
    return _0x5114fc("Insert a song name");
  }
  try {
    const _0x18de93 = _0x535f1a.join(" ");
    const _0x5952cf = await yts(_0x18de93);
    const _0x40ab21 = _0x5952cf.videos;
    if (!_0x40ab21 || _0x40ab21.length <= 0) {
      return _0x5114fc("No matching videos: *" + _0x18de93 + "*!!");
    }
    const _0x4deb30 = _0x40ab21[0].url;
    const _0x5360a5 = await fetch("https://api.prabath-md.tech/api/ytmp3?url=" + encodeURIComponent(_0x4deb30));
    const _0x16c0be = await _0x5360a5.json();
    if (_0x16c0be.status === "success ✅") {
      const _0x3d7447 = _0x16c0be.data.download;
      const _0x28cd68 = {
        'title': _0x16c0be.data.title,
        'fileSize': _0x16c0be.data.file_size,
        'quality': _0x16c0be.data.quality
      };
      const _0x4c4d45 = "Bmw md is downloading your song....";
      await _0x464ffe.sendMessage(_0x25dfef, {
        'text': _0x4c4d45
      }, {
        'quoted': _0x5b6b7f
      });
      await _0x464ffe.sendMessage(_0x25dfef, {
        'document': {
          'url': _0x3d7447
        },
        'mimetype': "audio/mpeg",
        'fileName': _0x28cd68.title + ".mp3"
      }, {
        'quoted': _0x5b6b7f
      });
      console.log("Sending audio file completed!");
      _0x5114fc("Download Success...");
    } else {
      _0x5114fc("Failed to download audio. Please try again later.");
    }
  } catch (_0x1e96fe) {
    console.error("Error:", _0x1e96fe);
    _0x5114fc("Song downloaded successfully ✅.");
  }
});

**/
