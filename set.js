const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSUEwanI0Z09vTWtoVG5wbkRjVGIwSGg2M3VqeTMyaFF4ZzFQZENueVFYST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic1FOZ3dRMkxpOW9wVW8xdkprOU5CUzI4QXNDTFZNcm5uTy8ydjRvQ2Vnbz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIySzRzYTcxbkZXUnlYZXFmM05HOHh1U0RzMlFaMUorNGg1Y1pwNzZpbkg4PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBNkgwOC9tQTBka2J5cnppcEI5czNla2YzbTVrMGZZa1NoQzFYdFJLY0NvPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1QSEpzcnpJWDJ0TmxnUzF4Q1V2N0JJbzlCaUdmcDc1dlB6ODJOVlZXR3M9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImdwWFJoVTNodTZ3b1Bvb3FiTFFHbWZLdnpValc4K3dOOFBYZmc0cmhUVjQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicU9nQ2Y3MGg0NHVjY24rU3JyUlBtcW5kWElPcng1Z0hGSlpJOE15ZWVrMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ0lJQ2U3WkdDMXFVaEV4YlFxK2t3dnRYUktlSU1FSGFzWW9qdDVwOE1YND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlGYk8wdFpCamZoaHZKNjB5SXphTm1uQWFESFVXZUpmSEFNdEVOU1E1ZWdLbmVOTDBKWEkveDc4bWhpcFVOK3BpNXp6eGhrckpQMUJ5azVqRHZwaGd3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NDYsImFkdlNlY3JldEtleSI6InhDZldudkxiVkdTK3lrd3p4NEFMNER0Rnd3QVM4ejBqelkvZXRHYUMvSmc9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6InRlblBMMGFLUzVlRjNHR0hXVkRDWkEiLCJwaG9uZUlkIjoiZjZjYzJkMTItN2ZjYi00OTNkLWJkMWMtNjBlY2RmMzBmZTE0IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InkrdHZKTTU1TFZ2WDN6V3crRld6T0V0ZVFWND0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJlaXhYSWs1Qlp6UVluY0VFQ0wzV3ltNUxkeTA9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiQlZWNUJNSEIiLCJtZSI6eyJpZCI6IjkyMzE5MTgzMzU2OTo2NkBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJQTEFZLUJPWfCfpbXwn5GF8J+SpiJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTHVjN2NrSEVKZlduN1VHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiMFdaYTk5TGJCN2xNK1U1QTRrUW9aWVIwamlVUnNjZFhmM1JWK294OUh6Yz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiZ01PbXpXSmJqYUZoVVRCNnlMZndpMGZ0RE1Idzd2U1VKTzRCU3JMdEt0M254Qjk0TVdUOEg1dnZOWUVHNGxVeEhlWWJZRW5WbVRUK1FiY3FjVmNpQ1E9PSIsImRldmljZVNpZ25hdHVyZSI6InRXK1dncUpqNXpOOVJ0cFNveUxQMlV3akpWcjc1MDl3eExDREJ4TlZXUXRJWC9oaUpadHZPMlUrL3NZd0ptUDB4NmttU2FMNGtzeDhDMG5LOW5zVmhnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTIzMTkxODMzNTY5OjY2QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmRGbVd2ZlMyd2U1VFBsT1FPSkVLR1dFZEk0bEViSEhWMzkwVmZxTWZSODMifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjIyODA3MzksIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBQmFvIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "PLAY-BOY",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " PLAY-BOY",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'yes',
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

