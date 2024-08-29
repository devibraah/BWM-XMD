const {adams} = require("../Ibrahim/adams");
const conf = require("../config")
const {jidDecode}=require("@whiskeysockets/baileys")


adams( {
  nomCom : "profile",
 categorie : "Fun",
   },
      async(dest,zk, commandeOptions)=> {

        const {ms , arg, repondre,auteurMessage,nomAuteurMessage, msgRepondu , auteurMsgRepondu} = commandeOptions ;
        let jid = null 
          let nom = null ;

          



        if (!msgRepondu) {
            jid = auteurMessage;
           nom = nomAuteurMessage;

           try { ppUrl = await zk.profilePictureUrl(jid , 'image') ; } catch { ppUrl = conf.IMAGE_MENU};
          const status = await zk.fetchStatus(jid) ;

           mess = {
            image : { url : ppUrl },
            caption : '*Nom :* '+ nom + '\n*Status :*\n' + status.status
        }
          
        } else {
            jid = auteurMsgRepondu;
            nom ="@"+auteurMsgRepondu.split("@")[0] ;

            try { ppUrl = await zk.profilePictureUrl(jid , 'image') ; } catch { ppUrl = conf.IMAGE_MENU};
          const status = await zk.fetchStatus(jid) ;

             mess = {
              image : { url : ppUrl },
              caption : '*Name :* '+ nom + '\n*Status :*\n' + status.status,
               mentions:[auteurMsgRepondu]
          }
            
        } ;

     
      
      
         
            zk.sendMessage(dest,mess,{quoted : ms})
      });
