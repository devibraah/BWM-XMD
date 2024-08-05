const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia01ZTGx1TWRFNk5tYmNsc0lyNDJIblFKZUZjdS9MdXlRWXNWYUhYRVkxdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY1FaR1I4TTBwZTdRMXRraUxKMmV5aUdLRzduQ0Qrbm84NnNFKzFjLzdRST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIyQjNoWm5Fa2s1cXJzWGU2dzM2Wjk0bWhpb0ZCYkd6T0Jtak1Xc3ZEcWwwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJjRTVuNjVHL3IvSGhQWHlzMUwyeU13a3hHcHBoVjQyYzBuZnY4ZDNrQVJBPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IldEOVRUeUVpR1d0QkRnT2VzbmpSZElNWGVRN0kxYm9CajM0NE93azdIMXc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImhyU2xCbllNd1JBcTIvSi9lRk9KQlFnVjV4Qm5qaHhxQ2tNYitSTDZPMFk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia0dLS2dXcytNU21laERtOWt0REJUSW80cG1hSExUM0lGdGhIZUp5aFdFdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUUo4Y1RPalcwWnRVbmhyL2lNY3EyaVNERVBUZTBNK01wbWtWRXhZbVoxdz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjVKQzdVUFVnTmIwYTZTNCtsZjBieHFmQjZsYTlXZ2NnT1E3eUI4UUtYREJheWRhS05wZm5mQU5xMmlIRnd4UDBGYVo2L3pwSVQ5MVJjYnFCQmNicEN3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTMzLCJhZHZTZWNyZXRLZXkiOiJGUWZiNTQ0T0tnY1dnajJkSXBEeTBRNVZiSjlWWEVpcHZTcXZhT1ZESUcwPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJkWXJtUEFRYVE3eVg5eHh5anY4dVlRIiwicGhvbmVJZCI6IjJmOGYwZDg0LThmY2EtNGJkMi04Zjg5LWQ2MjViNjdmZjFhNyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhaUtzL1hYTno4MU02WC95Qk1SNFpNQUJIb3c9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVXhWYy9sNWFkNSs5OTlsNitPa2hjMEVwUTRvPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjgzNUNSWUhOIiwibWUiOnsiaWQiOiIyMzQ4MDMxMTExMjk3OjQ2QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IlRyZWFzdXJlIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNMZUx4ZmNGRU96cndiVUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJMOFBQSlBQYzBEK1BDSHczZWc4ekJYZGJ6cnp5VzEvWWpkMTI1dmtYR2tjPSIsImFjY291bnRTaWduYXR1cmUiOiIxQUhvY0JXU3Irc3dnelNTVXA0K3RBVUJxV21WajBUV1FNNHlpbHY1MEc4TlYrVy9FTnp0MlA0S3ErZDJ1UnkyZ1FhNUZSUm5qMFMvem5EbzhaSTFBUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoianFXZjVqWlRnTUxEUjR4djU5cWYwNzMvMml1VlhpbklvRWlHdDh2UU4za21EVzBwQk96d2VyNkNQT3ZzaDFhamVRZ0w1a003NE1CMnFHZjlYMSszREE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ4MDMxMTExMjk3OjQ2QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlMvRHp5VHozTkEvandoOE4zb1BNd1YzVzg2ODhsdGYySTNkZHViNUZ4cEgifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjI4NDA1NzB9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Bolt kuma",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Bolt Kuma",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "No",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

