
const {zokou } = require("../framework/zokou");
const axios = require('axios');
const cheerio = require('cheerio');
let func = require('../framework/mesfonctions') ;
let hdb = require('../bdd/hentai') ;


zokou({
  nomCom: "hwaifu",
  categorie: "Hentai",
  reaction: "🍑"
},
async (origineMessage, zk, commandeOptions) => {
  const { repondre, ms ,verifGroupe , superUser} = commandeOptions;

   if (!verifGroupe && !superUser ) { repondre(`This command is reserved for groups only.`) ; return ;}
   
    let isHentaiGroupe = await hdb.checkFromHentaiList(origineMessage) ;

    if(!isHentaiGroupe && !superUser) { repondre(`This group is not a group of perverts, calm down my friend.`) ; return ;}

  const url = 'https://api.waifu.pics/nsfw/waifu'; // Remplace avec ton lien réel

  try { for (let i = 0 ; i < 5 ; i++ ) {
    const response = await axios.get(url);
    const imageUrl = response.data.url;

    zk.sendMessage(origineMessage, { image: { url: imageUrl } }, { quoted: ms }); }
  } catch (error) {
    repondre('Error occurred while retrieving the data. : ' +error);
  }
});


  /////////////// hneko //////////
zokou({
  nomCom: "trap",
  categorie: "Hentai",
  reaction: "🍑"
},
async (origineMessage, zk, commandeOptions) => {
  
  const { repondre, ms ,verifGroupe , superUser} = commandeOptions;

   if (!verifGroupe && !superUser ) { repondre(`This command is reserved for groups only.`) ; return ;}
   
  let isHentaiGroupe = await hdb.checkFromHentaiList(origineMessage) ;

  if(!isHentaiGroupe && !superUser) { repondre(`This group is not a group of perverts, calm down my friend.`) ; return ;}


  const url = 'https://api.waifu.pics/nsfw/trap'; // Remplace avec ton lien réel

  try { for (let i = 0 ; i < 5 ; i++ ) {
    const response = await axios.get(url);
    const imageUrl = response.data.url;

    zk.sendMessage(origineMessage, { image: { url: imageUrl } }, { quoted: ms }); }
  } catch (error) {
    repondre('Error occurred while retrieving the data. :', error);
  }
});

zokou({
  nomCom: "hneko",
  categorie: "Hentai",
  reaction: "🍑"
},
async (origineMessage, zk, commandeOptions) => {
  
  const { repondre, ms ,verifGroupe , superUser} = commandeOptions;

  if (!verifGroupe && !superUser ) { repondre(`This command is reserved for groups only.`) ; return ;}
   
  let isHentaiGroupe = await hdb.checkFromHentaiList(origineMessage) ;

  if(!isHentaiGroupe && !superUser) { repondre(`This group is not a group of perverts, calm down my friend.`) ; return ;}

  const url = 'https://api.waifu.pics/nsfw/neko'//apiWaifu("neko"); // Remplace avec ton lien réel

  try { for (let i = 0 ;i < 5 ; i++) {
    const response = await axios.get(url);
    const imageUrl = response.data.url;

    zk.sendMessage(origineMessage, { image: { url: imageUrl } }, { quoted: ms }); }
  } catch (error) {
    repondre('Error occurred while retrieving the data. :', error);
  }
});


zokou({
  nomCom: "blowjob",
  categorie: "Hentai",
  reaction: "🍑"
},
async (origineMessage, zk, commandeOptions) => {
  
  const { repondre, ms ,verifGroupe , superUser} = commandeOptions;

  if (!verifGroupe && !superUser ) { repondre(`This command is reserved for groups only.`) ; return ;}
   
  let isHentaiGroupe = await hdb.checkFromHentaiList(origineMessage) ;

  if(!isHentaiGroupe && !superUser) { repondre(`This group is not a group of perverts, calm down my friend.`) ; return ;}

  const url = 'https://api.waifu.pics/nsfw/blowjob'; // Remplace avec ton lien réel

  try { for (let i = 0 ; i < 5 ; i++ ) {
    const response = await axios.get(url);
    const imageUrl = response.data.url;

    zk.sendMessage(origineMessage, { image: { url: imageUrl } }, { quoted: ms }); }
  } catch (error) {
    repondre('Error occurred while retrieving the data. :', error);
  }
});



zokou({
  nomCom: "hentaivid",
  categorie: "Hentai",
  reaction: "🍑"
},
async (origineMessage, zk, commandeOptions) => {
  const { repondre, ms ,verifGroupe , superUser} = commandeOptions;

  if (!verifGroupe && !superUser ) { repondre(`This command is reserved for groups only.`) ; return ;}
   
  let isHentaiGroupe = await hdb.checkFromHentaiList(origineMessage) ;

  if(!isHentaiGroupe && !superUser) { repondre(`This group is not a group of perverts, calm down my friend.`) ; return ;}

  try {

      let videos = await hentai()

       let length ;

        if (videos.length > 10) {
            length = 10
        } else {
            length = videos.length ;
        }

      

       let i = Math.floor(Math.random() * length) ;

      zk.sendMessage(origineMessage,{video :{url : videos[i].video_1}, caption : `*Title :* ${videos[i].title} \n *Category :* ${videos[i].category}`},{quoted : ms})


  } catch (error) {
    console.log(error)
  }
});







async function hentai() {	
  return new Promise((resolve, reject) => {	
      const page = Math.floor(Math.random() * 1153)	
      axios.get('https://sfmcompile.club/page/'+page)	
      .then((data) => {	
          const $ = cheerio.load(data.data)	
          const hasil = []	
          $('#primary > div > div > ul > li > article').each(function (a, b) {	
              hasil.push({	
                  title: $(b).find('header > h2').text(),	
                  link: $(b).find('header > h2 > a').attr('href'),	
                  category: $(b).find('header > div.entry-before-title > span > span').text().replace('in ', ''),	
                  share_count: $(b).find('header > div.entry-after-title > p > span.entry-shares').text(),	
                  views_count: $(b).find('header > div.entry-after-title > p > span.entry-views').text(),	
                  type: $(b).find('source').attr('type') || 'image/jpeg',	
                  video_1: $(b).find('source').attr('src') || $(b).find('img').attr('data-src'),	
                   video_2: $(b).find('video > a').attr('href') || ''	
              })	
          })	
          resolve(hasil) 	
      })	
  })	
}
