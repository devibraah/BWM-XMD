
const {
  mediafireDl
} = require("../Ibrahim/dl/Function");
const {
  adams
} = require("../Ibrahim/adams");
const getFBInfo = require("@xaviabot/fb-downloader");
adams({
  'nomCom': "gitclone",
  'categorie': "Download"
}, async (_0x1c2fd1, _0x45058e, _0x4f56d8) => {
  const {
    ms: _0x4ec678,
    repondre: _0x3f8a54,
    arg: _0x18d6ab
  } = _0x4f56d8;
  const _0x4bab3c = _0x18d6ab.join(" ");
  if (!_0x4bab3c) {
    return _0x3f8a54("Please provide a valid github link.");
  }
  if (!_0x4bab3c.includes("github.com")) {
    return _0x3f8a54("Is that a GitHub repo link ?!");
  }
  let [, _0x3acdad, _0x3f9933] = _0x4bab3c.match(/(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i) || [];
  _0x3f9933 = _0x3f9933.replace(/.git$/, '');
  let _0x394ebd = "https://api.github.com/repos/" + _0x3acdad + '/' + _0x3f9933 + "/zipball";
  let _0x5c6799 = (await fetch(_0x394ebd, {
    'method': "HEAD"
  })).headers.get("content-disposition").match(/attachment; filename=(.*)/)[1];
  _0x45058e.sendMessage(_0x1c2fd1, {
    'document': {
      'url': _0x394ebd
    },
    'fileName': _0x5c6799 + ".zip",
    'mimetype': "application/zip"
  }, {
    'quoted': _0x4ec678
  })["catch"](_0x2c3dbe => _0x3f8a54("error"));
});
adams({
  'nomCom': "tiktok",
  'categorie': "Download"
}, async (_0x42b1bf, _0x3a058d, _0x11f9d9) => {
  const {
    ms: _0x333a0e,
    repondre: _0x1a32e5,
    arg: _0x1b0b51
  } = _0x11f9d9;
  let _0x21bd31 = _0x1b0b51.join(" ");
  if (!_0x1b0b51[0]) {
    return _0x1a32e5("Please insert a tiktok video link!");
  }
  const _0x5d8397 = await fetch("https://api.prabath-md.tech/api/tiktokdl?url=" + _0x21bd31);
  const _0x38d5e1 = await _0x5d8397.json();
  await _0x1a32e5("A moment, *BMW-MD* is Downloading that...");
  const _0x504587 = _0x38d5e1.data.no_wm;
  await _0x3a058d.sendMessage(_0x42b1bf, {
    'video': {
      'url': _0x504587
    },
    'caption': "_╰►VIDEO DOWNLOADED BY_ *BMW-MD*",
    'gifPlayback': false
  }, {
    'quoted': _0x333a0e
  });
});
adams({
  'nomCom': "image-dl",
  'categorie': "Download"
}, async (_0x38d623, _0x42db7e, _0x1281b3) => {
  const {
    ms: _0x529878,
    repondre: _0x226795,
    arg: _0x2f8336
  } = _0x1281b3;
  let _0x3fc64a = _0x2f8336.join(" ");
  if (!_0x2f8336[0]) {
    _0x226795("Give me any social media image link!");
    return;
  }
  try {
    const _0x13451d = await fetch("https://aiodownloader.onrender.com/download?url=" + _0x3fc64a);
    const _0xb125b5 = await _0x13451d.json();
    const _0x9cb53 = _0xb125b5.result;
    _0x42db7e.sendMessage(_0x38d623, {
      'image': {
        'url': _0x9cb53
      },
      'caption': "_╰►IMAGE DOWNLOADED BY_ *BMW-MD*",
      'gifPlayback': false
    }, {
      'quoted': _0x529878
    });
  } catch (_0x53d9be) {
    _0x226795("A fatal error has occured... \n " + _0x53d9be);
  }
});
adams({
  'nomCom': "instagram",
  'categorie': "Download"
}, async (_0xf2a010, _0x3c01ae, _0x488f66) => {
  const {
    ms: _0x324321,
    repondre: _0x1eddf6,
    arg: _0x57528e
  } = _0x488f66;
  if (!_0x57528e[0]) {
    _0x1eddf6("provide an instragam link ");
    return;
  }
  ;
  try {
    let _0xfb5ca8 = await fetch("https://www.guruapi.tech/api/igdlv1?url=${link}");
    if (_0xfb5ca8.data.data.data[0].type == "video") {
      _0x3c01ae.sendMessage(_0xf2a010, {
        'video': {
          'url': _0xfb5ca8.data.data.data[0].url_download
        },
        'caption': "Here is your Instagram video.\nPowered by *BMW-MD*",
        'gifPlayback': false
      }, {
        'quoted': _0x324321
      });
    } else {
      _0x3c01ae.sendMessage(_0xf2a010, {
        'image': {
          'url': _0xfb5ca8.data.data.data[0].url_download
        },
        'caption': "Here is your Instagram image.\nPowered by *BMW-MD*"
      });
    }
  } catch (_0x4fdba6) {
    _0x1eddf6("An error Occurred while downloading your media.\n*KEEP USING BMW-MD*" + _0x4fdba6);
  }
});
adams({
  'nomCom': "video-dl",
  'categorie': "Download"
}, async (_0x46a8a0, _0x17b453, _0x2b60f2) => {
  const {
    ms: _0x589c36,
    repondre: _0x574033,
    arg: _0x23ec22
  } = _0x2b60f2;
  let _0x5e9106 = _0x23ec22.join(" ");
  if (!_0x23ec22[0]) {
    _0x574033("Give me any social media video link!");
    return;
  }
  try {
    const _0x22af05 = await fetch("https://www.noobs-api.000.pe/dipto/alldl?url=" + _0x5e9106);
    const _0x170f9e = await _0x22af05.json();
    const _0x3c3efe = _0x170f9e.result;
    _0x17b453.sendMessage(_0x46a8a0, {
      'video': {
        'url': _0x3c3efe
      },
      'caption': "_╰►VIDEO DOWNLOADED BY_ *BMW-MD*",
      'gifPlayback': false
    }, {
      'quoted': _0x589c36
    });
  } catch (_0x1cf0b8) {
    _0x574033("A fatal error has occured... \n " + _0x1cf0b8);
  }
});
adams({
  'nomCom': "twitter",
  'categorie': "Download"
}, async (_0x40d611, _0x29f4c2, _0x216827) => {
  const {
    ms: _0x178e4c,
    repondre: _0x330fea,
    arg: _0x1091be
  } = _0x216827;
  let _0x35e7e3 = _0x1091be.join(" ");
  if (!_0x1091be[0]) {
    _0x330fea("Please insert a *TWITTER or X Video Link* for *BMW-MD* to download ");
    return;
  }
  try {
    const _0x1e0844 = await fetch("https://api.maher-zubair.tech/download/twitter?url=" + _0x35e7e3);
    const _0x1e3a2f = await _0x1e0844.json();
    if (_0x1e3a2f && _0x1e3a2f.data && _0x1e3a2f.data.HD) {
      const _0x32bc4e = _0x1e3a2f.data.HD;
      _0x29f4c2.sendMessage(_0x40d611, {
        'video': {
          'url': _0x32bc4e
        },
        'caption': "Here is your Twitter Video.\n _Downloaded by_ *BMW-MD*",
        'gifPlayback': false
      }, {
        'quoted': _0x178e4c
      });
    }
  } catch (_0x19fce0) {
    _0x330fea("I am unable to download your media. \n " + _0x19fce0);
  }
});
adams({
  'nomCom': "mediafire",
  'categorie': "Download"
}, async (_0x12d48b, _0x1a75ba, _0x253e26) => {
  const {
    ms: _0x1cac40,
    repondre: _0x56acc0,
    arg: _0x4f5641
  } = _0x253e26;
  let _0x404891 = _0x4f5641.join(" ");
  if (!_0x4f5641[0]) {
    _0x56acc0("Provide mediafire link\n\nmediafire <valid mediafire link>");
    return;
  }
  ;
  try {
    const _0x5c499c = await mediafireDl(_0x404891);
    if (_0x5c499c[0].size.split('MB')[0] >= 100) {
      return m.reply("File tooooo big");
    }
    await _0x1a75ba.sendMessage(_0x12d48b, {
      'document': {
        'url': _0x5c499c[0].link
      },
      'fileName': _0x5c499c[0].nama,
      'mimetype': _0x5c499c[0].mime,
      'caption': "Downloaded by FLASH-MD: " + _0x5c499c[0].nama
    }, {
      'quoted': _0x1cac40
    });
  } catch (_0x572051) {
    _0x56acc0("I am unable to download the file. \n " + _0x572051);
  }
});
adams({
  'nomCom': 'fb',
  'categorie': "Download",
  'reaction': "📽️"
}, async (_0x3a78a5, _0xc18979, _0xf0a7a0) => {
  const {
    repondre: _0x3c875a,
    ms: _0x2e8d37,
    arg: _0xd0f2d0
  } = _0xf0a7a0;
  if (!_0xd0f2d0[0]) {
    _0x3c875a("Insert a public facebook video link!");
    return;
  }
  const _0x5938f0 = _0xd0f2d0.join(" ");
  try {
    getFBInfo(_0x5938f0).then(_0x44be8d => {
      let _0x76640a = "\n *Title:* " + _0x44be8d.title + "\n\n \n *Direct Link:* " + _0x44be8d.url + "\n ";
      _0xc18979.sendMessage(_0x3a78a5, {
        'image': {
          'url': _0x44be8d.thumbnail
        },
        'caption': _0x76640a
      }, {
        'quoted': _0x2e8d37
      });
      _0xc18979.sendMessage(_0x3a78a5, {
        'video': {
          'url': _0x44be8d.hd
        },
        'caption': "_╰►VIDEO DOWNLOADED BY_ *BMW-MD*"
      }, {
        'quoted': _0x2e8d37
      });
    })["catch"](_0x41d84f => {
      console.log("Error:", _0x41d84f);
      _0x3c875a("try fb2 on this link");
    });
  } catch (_0x1d71c9) {
    console.error("An error occurred while *BMW-MD* was downloading your media:", _0x1d71c9);
    _0x3c875a("An error occurred while downloading your media.", _0x1d71c9);
  }
});
adams({
  'nomCom': "fb2",
  'categorie': "Download",
  'reaction': "📽️"
}, async (_0xcad438, _0x341fa4, _0x1bf24c) => {
  const {
    repondre: _0x55e155,
    ms: _0x41f279,
    arg: _0x2b5eb7
  } = _0x1bf24c;
  if (!_0x2b5eb7[0]) {
    _0x55e155("Insert a public facebook video link! !");
    return;
  }
  const _0x1fd99e = _0x2b5eb7.join(" ");
  try {
    getFBInfo(_0x1fd99e).then(_0x2bbae1 => {
      let _0x8231c = "\n *Title:* " + _0x2bbae1.title + "\n\n \n *Direct Link:* " + _0x2bbae1.url + "\n ";
      _0x341fa4.sendMessage(_0xcad438, {
        'image': {
          'url': _0x2bbae1.thumbnail
        },
        'caption': _0x8231c
      }, {
        'quoted': _0x41f279
      });
      _0x341fa4.sendMessage(_0xcad438, {
        'video': {
          'url': _0x2bbae1.sd
        },
        'caption': "_╰►VIDEO DOWNLOADED BY_ *BMW-MD*"
      }, {
        'quoted': _0x41f279
      });
    })["catch"](_0x3eb21d => {
      console.log("Error:", _0x3eb21d);
      _0x55e155(_0x3eb21d);
    });
  } catch (_0x2b1e09) {
    console.error("An error occurred while Bmw-Md was downloading your media:", _0x2b1e09);
    _0x55e155("An error occurred while Bmw-Md was downloading your media.", _0x2b1e09);
  }
});

/**
const {adams} = require('../Ibrahim/adams');
const fs = require('fs');
const getFBInfo = require("@xaviabot/fb-downloader");
const { default: axios } = require('axios');

adams({nomCom : "instagram" , categorie : "Download"},async (dest , zk , commandeOptions)=>{
  const {ms,repondre,arg} = commandeOptions ;

  let link = arg.join(' ')

  if (!arg[0]) { repondre('Veillez insérer un lien video instagramme');return}; 

  try {
     
    let igvid = await axios('https://vihangayt.me/download/instagram?url='+link)

    if (igvid.data.data.data[0].type == 'video') {
    zk.sendMessage(dest,{video : {url : igvid.data.data.data[0].url},caption : "ig video downloader powered by *Bmw-Md*",gifPlayback : false },{quoted : ms}) 
    }
    else {
        zk.sendMessage(dest,{image : {url : igvid.data.data.data[0].url},caption : "ig image downloader powered by *Bmw-Md*"})
    }
  
  } catch (e) {repondre("erreur survenue lors du téléchargement \n " + e)}
  
});


adams({
  nomCom: "facabook",
  categorie: "Download",
  reaction: "📽️"
},
async (dest, zk, commandeOptions) => {
  const { repondre, ms, arg } = commandeOptions;

  if (!arg[0]) {
    repondre('Insert a public facebook video link!');
    return;
  }

  const queryURL = arg.join(" ");

  try {
     getFBInfo(queryURL)
    .then((result) => {
       let caption = `
        titre: ${result.title}
        Lien: ${result.url}
      `;
       zk.sendMessage(dest,{image : { url : result.thumbnail}, caption : caption},{quoted : ms}) ;
       zk.sendMessage(dest, { video: { url: result.hd  }, caption: 'facebook video downloader powered by *Bmw-MD*' }, { quoted: ms });
      
    })
    .catch((error) => {console.log("Error:", error)
                      repondre('try fbdl2 on this link')});


   
  } catch (error) {
    console.error('Erreur lors du téléchargement de la vidéo :', error);
    repondre('Erreur lors du téléchargement de la vidéo.' , error);
  }
});



adams({ nomCom: "tiktok", categorie: "Download", reaction: "🎵" }, async (dest, zk, commandeOptions) => {
  const { arg, ms, prefixe,repondre } = commandeOptions;
  if (!arg[0]) {
    repondre(`how to use this command:\n ${prefixe}tiktok tiktok_video_link`);
    return;
  }

  const videoUrl = arg.join(" ");

 let data = await axios.get('https://vihangayt.me/download/tiktok?url='+ videoUrl) ;

  let tik = data.data.data

      // Envoi du message avec le thumbnail de la vidéo
      const caption = `
Author: ${tik.author}
Description: ${tik.desc}
      `;

         
      zk.sendMessage(dest, { video: { url: tik.links[0].a} , caption : caption },{quoted : ms});    

  
});

adams({
  nomCom: "facebook2",
  categorie: "Download",
  reaction: "📽️"
},
async (dest, zk, commandeOptions) => {
  const { repondre, ms, arg } = commandeOptions;

  if (!arg[0]) {
    repondre('Insert a public facebook video link! !');
    return;
  }

  const queryURL = arg.join(" ");

  try {
     getFBInfo(queryURL)
    .then((result) => {
       let caption = `
        titre: ${result.title}
        Lien: ${result.url}
      `;
       zk.sendMessage(dest,{image : { url : result.thumbnail}, caption : caption},{quoted : ms}) ;
       zk.sendMessage(dest, { video: { url: result.sd  }, caption: 'facebook video downloader powered by *Bmw-MD*' }, { quoted: ms });
      
    })
    .catch((error) => {console.log("Error:", error)
                      repondre(error)});


   
  } catch (error) {
    console.error('Erreur lors du téléchargement de la vidéo :', error);
    repondre('Erreur lors du téléchargement de la vidéo.' , error);
  }
});
**/
