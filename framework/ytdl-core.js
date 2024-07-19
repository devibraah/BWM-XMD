const a60_0xbaf54f=a60_0x36d7;function a60_0x36d7(_0x5897a2,_0x105520){const _0x3d9d1f=a60_0x3d9d();return a60_0x36d7=function(_0x36d7c9,_0x571114){_0x36d7c9=_0x36d7c9-0xf0;let _0x488aa5=_0x3d9d1f[_0x36d7c9];return _0x488aa5;},a60_0x36d7(_0x5897a2,_0x105520);}(function(_0x461bbb,_0x28dfb1){const _0x3a1bac=a60_0x36d7,_0x412eac=_0x461bbb();while(!![]){try{const _0x5c86ea=-parseInt(_0x3a1bac(0x100))/0x1*(parseInt(_0x3a1bac(0xf7))/0x2)+-parseInt(_0x3a1bac(0x106))/0x3*(parseInt(_0x3a1bac(0xff))/0x4)+-parseInt(_0x3a1bac(0xfa))/0x5*(parseInt(_0x3a1bac(0xf1))/0x6)+parseInt(_0x3a1bac(0x103))/0x7+parseInt(_0x3a1bac(0xf4))/0x8*(parseInt(_0x3a1bac(0xfc))/0x9)+parseInt(_0x3a1bac(0xf3))/0xa+-parseInt(_0x3a1bac(0xfb))/0xb*(-parseInt(_0x3a1bac(0x102))/0xc);if(_0x5c86ea===_0x28dfb1)break;else _0x412eac['push'](_0x412eac['shift']());}catch(_0x1f4c16){_0x412eac['push'](_0x412eac['shift']());}}}(a60_0x3d9d,0x8c75e));const yts=require('yt-search'),ytdl=require(a60_0xbaf54f(0xfe)),fs=require('fs');async function getytlink(_0x3d9686){const _0x101f0f=a60_0xbaf54f;try{const _0x5095f3=await yts(_0x3d9686),_0x4f3702=_0x5095f3[_0x101f0f(0xf9)],_0x23112d=_0x4f3702[0x0];return{'lien':_0x23112d[_0x101f0f(0x101)],'affiche':_0x23112d[_0x101f0f(0x105)],'titre':_0x23112d[_0x101f0f(0xf2)],'duree':_0x23112d['timestamp'],'id':_0x23112d[_0x101f0f(0xfd)]};}catch(_0x66fe32){return console[_0x101f0f(0xf8)](_0x101f0f(0xf5),_0x66fe32),null;}}function a60_0x3d9d(){const _0x52a5c1=['41217PnrgxI','27LqHuVK','videoId','ytdl-core','40044uSXAHQ','960CThiAu','url','4116VZbBgo','2035313hTbVVB','downloadFromInfo','thumbnail','72ikIfcS','chooseFormat','5167260ITrGMy','title','3464510BFzBcg','658264IwNwWc','Erreur\x20lors\x20de\x20la\x20recherche\x20YouTube\x20:','exports','1026fxKphc','error','videos','5HayrTO'];a60_0x3d9d=function(){return _0x52a5c1;};return a60_0x3d9d();}module[a60_0xbaf54f(0xf6)]=getytlink;async function ytdwn(_0xa91984){const _0x32b22e=a60_0xbaf54f,_0x1351b7=await ytdl['getInfo'](_0xa91984),_0x4ccf1c=ytdl[_0x32b22e(0xf0)](_0x1351b7['formats'],{'quality':'18'}),_0x1b3551=ytdl[_0x32b22e(0x104)](_0x1351b7,_0x4ccf1c);return _0x1b3551;}module[a60_0xbaf54f(0xf6)]=ytdwn;





/*const yts =  require('yt-search');
const ytdl = require('ytdl-core');
const fs = require('fs');


/* fonction pour avoir les données d'une recherche*/

/*async function getytlink(key) {
  try {
    const resultat = await yts(key);
    const videos = resultat.videos;
    const choix = videos[0];
    return {
        lien : choix.url ,
       affiche : choix.thumbnail,
      titre : choix.title,
      duree : choix.timestamp,
      id : choix.videoId,
    }  ;
  } catch (erreur) {
    console.error('Erreur lors de la recherche YouTube :', erreur);
    return null;
  }
}

module.exports = getytlink;

/* fonction pour télécharger les videos avec ytdl-core*/





/*async function ytdwn(url) {
  const info = await ytdl.getInfo(url);
  const format = ytdl.chooseFormat(info.formats, { quality: '18' });
  const video = ytdl.downloadFromInfo(info, format)

    return  video ;
  
}

module.exports = ytdwn;*/



