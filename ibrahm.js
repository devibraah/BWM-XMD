'use strict';

var __createBinding = this && this.__createBinding || (Object.create ? function (_0x379262, _0x2bd444, _0x257e22, _0xd4bde1) {
  if (_0xd4bde1 === undefined) {
    _0xd4bde1 = _0x257e22;
  }
  var _0x47c8dd = Object.getOwnPropertyDescriptor(_0x2bd444, _0x257e22);
  if (!_0x47c8dd || ("get" in _0x47c8dd ? !_0x2bd444.__esModule : _0x47c8dd.writable || _0x47c8dd.configurable)) {
    _0x47c8dd = {
      'enumerable': true,
      'get': function () {
        return _0x2bd444[_0x257e22];
      }
    };
  }
  Object.defineProperty(_0x379262, _0xd4bde1, _0x47c8dd);
} : function (_0x4b2714, _0x37ad19, _0xd2067a, _0x207708) {
  if (_0x207708 === undefined) {
    _0x207708 = _0xd2067a;
  }
  _0x4b2714[_0x207708] = _0x37ad19[_0xd2067a];
});
var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (_0x543b3a, _0x24e231) {
  Object.defineProperty(_0x543b3a, "default", {
    'enumerable': true,
    'value': _0x24e231
  });
} : function (_0x94a519, _0x166cd8) {
  _0x94a519['default'] = _0x166cd8;
});
var __importStar = this && this.__importStar || function (_0x4eaf4e) {
  if (_0x4eaf4e && _0x4eaf4e.__esModule) {
    return _0x4eaf4e;
  }
  var _0x5f1ed5 = {};
  if (_0x4eaf4e != null) {
    for (var _0x26ed23 in _0x4eaf4e) if (_0x26ed23 !== "default" && Object.prototype.hasOwnProperty.call(_0x4eaf4e, _0x26ed23)) {
      __createBinding(_0x5f1ed5, _0x4eaf4e, _0x26ed23);
    }
  }
  __setModuleDefault(_0x5f1ed5, _0x4eaf4e);
  return _0x5f1ed5;
};
var __importDefault = this && this.__importDefault || function (_0x1b8e1c) {
  return _0x1b8e1c && _0x1b8e1c.__esModule ? _0x1b8e1c : {
    'default': _0x1b8e1c
  };
};
Object.defineProperty(exports, "__esModule", {
  'value': true
});
const baileys_1 = __importStar(require("@whiskeysockets/baileys"));
const logger_1 = __importDefault(require("@whiskeysockets/baileys/lib/Utils/logger"));
const logger = logger_1["default"].child({});
logger.level = "silent";
const pino = require('pino');
const boom_1 = require("@hapi/boom");
const conf = require("./set");
let fs = require("fs-extra");
let path = require("path");
const FileType = require("file-type");
const {
  Sticker,
  createSticker,
  StickerTypes
} = require("wa-sticker-formatter");
const {
  verifierEtatJid,
  recupererActionJid
} = require("./bdd/antilien");
const {
  atbverifierEtatJid,
  atbrecupererActionJid
} = require("./data/antibot");
let evt = require(__dirname + "/framework/zokou");
const {
  isUserBanned,
  addUserToBanList,
  removeUserFromBanList
} = require("./bdd/banUser");
const {
  addGroupToBanList,
  isGroupBanned,
  removeGroupFromBanList
} = require("./bdd/banGroup");
const {
  isGroupOnlyAdmin,
  addGroupToOnlyAdminList,
  removeGroupFromOnlyAdminList
} = require("./bdd/onlyAdmin");
let {
  reagir
} = require(__dirname + "/framework/app");
var session = conf.session.replace(/BMW-MD-WA-BOT;;;=>/g, '');
const prefixe = conf.PREFIXE;
async function authentification() {
  try {
    if (__dirname + "/auth/creds.json")) {
      console.log("connection in progress ...");
      await fs.writeFileSync(__dirname + "/auth/creds.json", atob(session), "utf8");
    } else if (fs.existsSync(__dirname + "/auth/creds.json") && session != "zokk") {
      await fs.writeFileSync(__dirname + "/auth/creds.json", atob(session), "utf8");
    }
  } catch (_0x1ad874) {
    console.log("Session Invalid " + _0x1ad874);
    return;
  }
}
authentification();
0x0;
const store = baileys_1.makeInMemoryStore({
  'logger': pino().child({
    'level': "silent",
    'stream': "store"
  })
});
setTimeout(() => {
  async function _0x21e2d3() {
    0x0;
    const {
      version: _0x3c4c72,
      isLatest: _0x26fe13
    } = await baileys_1.fetchLatestBaileysVersion();
    0x0;
    const {
      state: _0x4368e1,
      saveCreds: _0x4449a5
    } = await baileys_1.useMultiFileAuthState(__dirname + "/auth");
    0x0;
    const _0x3df655 = {
      'version': _0x3c4c72,
      'logger': pino({
        'level': "silent"
      }),
      'browser': ["BMW-Md", 'safari', "1.0.0"],
      'printQRInTerminal': true,
      'fireInitQueries': false,
      'shouldSyncHistoryMessage': true,
      'downloadHistory': true,
      'syncFullHistory': true,
      'generateHighQualityLinkPreview': true,
      'markOnlineOnConnect': false,
      'keepAliveIntervalMs': 0x7530,
      'auth': {
        'creds': _0x4368e1.creds,
        'keys': baileys_1.makeCacheableSignalKeyStore(_0x4368e1.keys, logger)
      },
      'getMessage': async _0x142e1 => {
        if (store) {
          const _0x32bbe2 = await store.loadMessage(_0x142e1.remoteJid, _0x142e1.id, undefined);
          return _0x32bbe2.message || undefined;
        }
        return {
          'conversation': "An Error Occurred, Repeat Command!"
        };
      }
    };
    0x0;
    const _0x29ce6c = baileys_1["default"](_0x3df655);
    store.bind(_0x29ce6c.ev);
    setInterval(() => {
      store.writeToFile('store.json');
    }, 0xbb8);
    _0x29ce6c.ev.on("messages.upsert", async _0x301c96 => {
      const {
        messages: _0x23d680
      } = _0x301c96;
      const _0x19bc4f = _0x23d680[0x0];
      if (!_0x19bc4f.message) {
        return;
      }
      const _0x29a103 = _0x109d12 => {
        if (!_0x109d12) {
          return _0x109d12;
        }
        if (/:\d+@/gi.test(_0x109d12)) {
          0x0;
          let _0x1463ee = baileys_1.jidDecode(_0x109d12) || {};
          return _0x1463ee.user && _0x1463ee.server && _0x1463ee.user + '@' + _0x1463ee.server || _0x109d12;
        } else {
          return _0x109d12;
        }
      };
      0x0;
      var _0xf350b4 = baileys_1.getContentType(_0x19bc4f.message);
      var _0x5df310 = _0xf350b4 == "conversation" ? _0x19bc4f.message.conversation : _0xf350b4 == "imageMessage" ? _0x19bc4f.message.imageMessage?.['caption'] : _0xf350b4 == "videoMessage" ? _0x19bc4f.message.videoMessage?.["caption"] : _0xf350b4 == "extendedTextMessage" ? _0x19bc4f.message?.["extendedTextMessage"]?.["text"] : _0xf350b4 == "buttonsResponseMessage" ? _0x19bc4f?.["message"]?.["buttonsResponseMessage"]?.["selectedButtonId"] : _0xf350b4 == "listResponseMessage" ? _0x19bc4f.message?.["listResponseMessage"]?.["singleSelectReply"]?.["selectedRowId"] : _0xf350b4 == "messageContextInfo" ? _0x19bc4f?.["message"]?.["buttonsResponseMessage"]?.["selectedButtonId"] || _0x19bc4f.message?.["listResponseMessage"]?.["singleSelectReply"]?.["selectedRowId"] || _0x19bc4f.text : '';
      var _0x18215e = _0x19bc4f.key.remoteJid;
      var _0x3d5b12 = _0x29a103(_0x29ce6c.user.id);
      var _0x1d3bfc = _0x3d5b12.split('@')[0x0];
      const _0x4cc032 = _0x18215e?.['endsWith']("@g.us");
      var _0x5135bc = _0x4cc032 ? await _0x29ce6c.groupMetadata(_0x18215e) : '';
      var _0x4af620 = _0x4cc032 ? _0x5135bc.subject : '';
      var _0xbba80b = _0x19bc4f.message.extendedTextMessage?.["contextInfo"]?.["quotedMessage"];
      var _0x128b5d = _0x29a103(_0x19bc4f.message?.["extendedTextMessage"]?.["contextInfo"]?.["participant"]);
      var _0x79eeda = _0x4cc032 ? _0x19bc4f.key.participant ? _0x19bc4f.key.participant : _0x19bc4f.participant : _0x18215e;
      if (_0x19bc4f.key.fromMe) {
        _0x79eeda = _0x3d5b12;
      }
      var _0x72944 = _0x4cc032 ? _0x19bc4f.key.participant : '';
      const {
        getAllSudoNumbers: _0x2fa71e
      } = require("./data/sudo");
      const _0x3e1533 = _0x19bc4f.pushName;
      const _0x9acc6c = await _0x2fa71e();
      const _0x164485 = [_0x1d3bfc, "923184474176", "254742063632", "254757835036", "254750948696", "254751284190", conf.OWNER_NUMBER].map(_0x460885 => _0x460885.replace(/[^0-9]/g) + "@s.whatsapp.net");
      const _0x3b814e = _0x164485.concat(_0x9acc6c);
      const _0x545f4b = _0x3b814e.includes(_0x79eeda);
      var _0x276a52 = ["254742063632", "923184474176", "254757835036", "254750948696", "254751284190"].map(_0x1c1bf0 => _0x1c1bf0.replace(/[^0-9]/g) + "@s.whatsapp.net").includes(_0x79eeda);
      function _0x9fe7a5(_0x3d3b12) {
        _0x29ce6c.sendMessage(_0x18215e, {
          'text': _0x3d3b12
        }, {
          'quoted': _0x19bc4f
        });
      }
      console.log("\t [][]...{FLASH-MD}...[][]");
      console.log("=========== New message ===========");
      if (_0x4cc032) {
        console.log("message from the group : " + _0x4af620);
      }
      console.log("message sent By : [" + _0x3e1533 + " : " + _0x79eeda.split("@s.whatsapp.net")[0x0] + " ]");
      console.log("message type : " + _0xf350b4);
      console.log("------ message content ------");
      console.log(_0x5df310);
      function _0x152320(_0x4ea683) {
        let _0x1a3532 = [];
        for (_0x301c96 of _0x4ea683) {
          if (_0x301c96.admin == null) {
            continue;
          }
          _0x1a3532.push(_0x301c96.id);
        }
        return _0x1a3532;
      }
      var _0xff1352 = conf.PRESENCE;
      if (_0xff1352 == "online") {
        await _0x29ce6c.sendPresenceUpdate("available", _0x18215e);
      } else {
        if (_0xff1352 == "typing") {
          await _0x29ce6c.sendPresenceUpdate("composing", _0x18215e);
        } else if (_0xff1352 == "recording") {
          await _0x29ce6c.sendPresenceUpdate("recording", _0x18215e);
        } else {
          await _0x29ce6c.sendPresenceUpdate("unavailable", _0x18215e);
        }
      }
      const _0x3a21b6 = _0x4cc032 ? await _0x5135bc.participants : '';
      let _0x295d23 = _0x4cc032 ? _0x152320(_0x3a21b6) : '';
      const _0xe7bf46 = _0x4cc032 ? _0x295d23.includes(_0x79eeda) : false;
      var _0x1c5f28 = _0x4cc032 ? _0x295d23.includes(_0x3d5b12) : false;
      const _0x43aa36 = _0x5df310 ? _0x5df310.trim().split(/ +/).slice(0x1) : null;
      const _0x14e31c = _0x5df310 ? _0x5df310.startsWith(prefixe) : false;
      const _0x571a7e = _0x14e31c ? _0x5df310.slice(0x1).trim().split(/ +/).shift().toLowerCase() : false;
      const _0x51fd69 = conf.URL.split(',');
      function _0x33483b() {
        const _0x22f4e3 = Math.floor(Math.random() * _0x51fd69.length);
        const _0x2e09b6 = _0x51fd69[_0x22f4e3];
        return _0x2e09b6;
      }
      var _0x1d86cc = {
        'superUser': _0x545f4b,
        'dev': _0x276a52,
        'verifGroupe': _0x4cc032,
        'mbre': _0x3a21b6,
        'membreGroupe': _0x72944,
        'verifAdmin': _0xe7bf46,
        'infosGroupe': _0x5135bc,
        'nomGroupe': _0x4af620,
        'auteurMessage': _0x79eeda,
        'nomAuteurMessage': _0x3e1533,
        'idBot': _0x3d5b12,
        'verifZokouAdmin': _0x1c5f28,
        'prefixe': prefixe,
        'arg': _0x43aa36,
        'repondre': _0x9fe7a5,
        'mtype': _0xf350b4,
        'groupeAdmin': _0x152320,
        'msgRepondu': _0xbba80b,
        'auteurMsgRepondu': _0x128b5d,
        'ms': _0x19bc4f,
        'mybotpic': _0x33483b
      };
      if (_0x18215e === _0x79eeda && conf.AUTOREAD_MESSAGES === 'on') {
        _0x29ce6c.readMessages([_0x19bc4f.key]);
      }
      if (!_0x545f4b && _0x18215e === _0x79eeda && conf.A_REACT === 'on') {
        const _0x89fbdb = ['❤', '💕', '😻', '🧡', '💛', '💚', '💙', '💜', '🖤', '❣', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '♥', '💌', '🙂', '🤗', '😌', '😉', '🤗', '😊', '🎊', '🎉', '🎁', '🎈', '👋'];
        const _0x28b750 = _0x89fbdb[Math.floor(Math.random() * _0x89fbdb.length)];
        _0x29ce6c.sendMessage(_0x18215e, {
          'react': {
            'text': _0x28b750,
            'key': _0x19bc4f.key
          }
        });
      }
      if (_0x18215e === _0x79eeda && conf.CHATBOT === 'on') {
        const _0x485c4d = await fetch("http://api.brainshop.ai/get?bid=181821&key=ltFzFIXrtj2SVMTX&uid=[uid]&msg=" + _0x5df310);
        const _0x4042b7 = await _0x485c4d.json();
        await _0x9fe7a5(_0x4042b7.cnt);
      }
      if (_0x19bc4f.message.protocolMessage && _0x19bc4f.message.protocolMessage.type === 0x0 && conf.ADM === 'on') {
        if (_0x19bc4f.key.fromMe || _0x19bc4f.message.protocolMessage.key.fromMe) {
          console.log("Delete message about me");
          return;
        }
        console.log("Message supprimer");
        let _0x2b6461 = _0x19bc4f.message.protocolMessage.key;
        try {
          const _0x6f5a1d = fs.readFileSync("./store.json", "utf8");
          const _0x11636e = JSON.parse(_0x6f5a1d);
          let _0xde0898 = _0x11636e.messages[_0x2b6461.remoteJid];
          let _0x3bfe6f;
          for (let _0x1b2e1f = 0x0; _0x1b2e1f < _0xde0898.length; _0x1b2e1f++) {
            if (_0xde0898[_0x1b2e1f].key.id === _0x2b6461.id) {
              _0x3bfe6f = _0xde0898[_0x1b2e1f];
              break;
            }
          }
          if (_0x3bfe6f === null || !_0x3bfe6f || _0x3bfe6f === "undefined") {
            console.log("Message not found");
            return;
          }
          await _0x29ce6c.sendMessage(_0x3d5b12, {
            'image': {
              'url': "./media/deleted-message.jpg"
            },
            'caption': "        😈Anti-delete-message😈\n Message from @" + _0x3bfe6f.key.participant.split('@')[0x0] + '​',
            'mentions': [_0x3bfe6f.key.participant]
          }).then(() => {
            _0x29ce6c.sendMessage(_0x3d5b12, {
              'forward': _0x3bfe6f
            }, {
              'quoted': _0x3bfe6f
            });
          });
        } catch (_0x9d5c82) {
          console.log(_0x9d5c82);
        }
      }
      if (_0x19bc4f.key && _0x19bc4f.key.remoteJid === "status@broadcast" && conf.AUTO_READ_STATUS === 'on') {
        await _0x29ce6c.readMessages([_0x19bc4f.key]);
      }
      if (_0x19bc4f.key && _0x19bc4f.key.remoteJid === "status@broadcast" && conf.AUTO_DOWNLOAD_STATUS === 'on') {
        if (_0x19bc4f.message.extendedTextMessage) {
          var _0x3a8003 = _0x19bc4f.message.extendedTextMessage.text;
          await _0x29ce6c.sendMessage(_0x3d5b12, {
            'text': _0x3a8003
          }, {
            'quoted': _0x19bc4f
          });
        } else {
          if (_0x19bc4f.message.imageMessage) {
            var _0x39366f = _0x19bc4f.message.imageMessage.caption;
            var _0xd14ab3 = await _0x29ce6c.downloadAndSaveMediaMessage(_0x19bc4f.message.imageMessage);
            await _0x29ce6c.sendMessage(_0x3d5b12, {
              'image': {
                'url': _0xd14ab3
              },
              'caption': _0x39366f
            }, {
              'quoted': _0x19bc4f
            });
          } else {
            if (_0x19bc4f.message.videoMessage) {
              var _0x39366f = _0x19bc4f.message.videoMessage.caption;
              var _0x4958b3 = await _0x29ce6c.downloadAndSaveMediaMessage(_0x19bc4f.message.videoMessage);
              await _0x29ce6c.sendMessage(_0x3d5b12, {
                'video': {
                  'url': _0x4958b3
                },
                'caption': _0x39366f
              }, {
                'quoted': _0x19bc4f
              });
            }
          }
        }
      }
      if (!_0x276a52 && _0x18215e == "120363244435092946@g.us") {
        return;
      }
      if (_0x5df310 && _0x79eeda.endsWith("s.whatsapp.net")) {
        const {
          ajouterOuMettreAJourUserData: _0x258898
        } = require("./data/level");
        try {
          await _0x258898(_0x79eeda);
        } catch (_0x25ac25) {
          console.error(_0x25ac25);
        }
      }
      try {
        if (_0x19bc4f.message[_0xf350b4].contextInfo.mentionedJid && (_0x19bc4f.message[_0xf350b4].contextInfo.mentionedJid.includes(_0x3d5b12) || _0x19bc4f.message[_0xf350b4].contextInfo.mentionedJid.includes(conf.OWNER_NUMBER + "@s.whatsapp.net"))) {
          if (_0x18215e == "120363158701337904@g.us") {
            return;
          }
          ;
          if (_0x545f4b) {
            console.log('hummm');
            return;
          }
          let _0x5786fb = require("./data/mention");
          let _0x3c64f5 = await _0x5786fb.recupererToutesLesValeurs();
          let _0x4eb248 = _0x3c64f5[0x0];
          if (_0x4eb248.status === 'non') {
            console.log("mention pas actifs");
            return;
          }
          let _0x352f05;
          if (_0x4eb248.type.toLocaleLowerCase() === 'image') {
            _0x352f05 = {
              'image': {
                'url': _0x4eb248.url
              },
              'caption': _0x4eb248.message
            };
          } else {
            if (_0x4eb248.type.toLocaleLowerCase() === 'video') {
              _0x352f05 = {
                'video': {
                  'url': _0x4eb248.url
                },
                'caption': _0x4eb248.message
              };
            } else {
              if (_0x4eb248.type.toLocaleLowerCase() === "sticker") {
                let _0x1857f2 = new Sticker(_0x4eb248.url, {
                  'pack': conf.OWNER_NAME,
                  'type': StickerTypes.FULL,
                  'categories': ['🤩', '🎉'],
                  'id': "12345",
                  'quality': 0x46,
                  'background': "transparent"
                });
                const _0x33372e = await _0x1857f2.toBuffer();
                _0x352f05 = {
                  'sticker': _0x33372e
                };
              } else if (_0x4eb248.type.toLocaleLowerCase() === "audio") {
                _0x352f05 = {
                  'audio': {
                    'url': _0x4eb248.url
                  },
                  'mimetype': 'audio/mp4'
                };
              }
            }
          }
          _0x29ce6c.sendMessage(_0x18215e, _0x352f05, {
            'quoted': _0x19bc4f
          });
        }
      } catch (_0x279fe8) {}
      try {
        const _0x1a0aec = await verifierEtatJid(_0x18215e);
        if (_0x5df310.includes("chat.whatsapp.com") && _0x4cc032 && _0x1a0aec) {
          console.log("lien detecté");
          var _0xb73e77 = _0x4cc032 ? _0x295d23.includes(_0x3d5b12) : false;
          if (_0x545f4b || _0xe7bf46 || !_0xb73e77) {
            console.log("je fais rien");
            return;
          }
          ;
          const _0x456b0b = {
            'remoteJid': _0x18215e,
            'fromMe': false,
            'id': _0x19bc4f.key.id,
            'participant': _0x79eeda
          };
          var _0x5363e5 = "link detected, \n";
          var _0x26c9ed = new Sticker("https://raw.githubusercontent.com/djalega8000/Zokou-MD/main/media/remover.gif", {
            'pack': 'BMW-Md',
            'author': conf.OWNER_NAME,
            'type': StickerTypes.FULL,
            'categories': ['🤩', '🎉'],
            'id': '12345',
            'quality': 0x32,
            'background': "#000000"
          });
          await _0x26c9ed.toFile("st1.webp");
          var _0x191119 = await recupererActionJid(_0x18215e);
          if (_0x191119 === "remove") {
            _0x5363e5 += "message deleted \n @" + _0x79eeda.split('@')[0x0] + " removed from group.";
            await _0x29ce6c.sendMessage(_0x18215e, {
              'sticker': fs.readFileSync("st1.webp")
            });
            0x0;
            baileys_1.delay(0x320);
            await _0x29ce6c.sendMessage(_0x18215e, {
              'text': _0x5363e5,
              'mentions': [_0x79eeda]
            }, {
              'quoted': _0x19bc4f
            });
            try {
              await _0x29ce6c.groupParticipantsUpdate(_0x18215e, [_0x79eeda], "remove");
            } catch (_0x361100) {
              console.log("antiien ") + _0x361100;
            }
            await _0x29ce6c.sendMessage(_0x18215e, {
              'delete': _0x456b0b
            });
            await fs.unlink("st1.webp");
          } else {
            if (_0x191119 === "delete") {
              _0x5363e5 += "Goodbye \n @" + _0x79eeda.split('@')[0x0] + " Sending other group links here is prohibited!.";
              await _0x29ce6c.sendMessage(_0x18215e, {
                'text': _0x5363e5,
                'mentions': [_0x79eeda]
              }, {
                'quoted': _0x19bc4f
              });
              await _0x29ce6c.sendMessage(_0x18215e, {
                'delete': _0x456b0b
              });
              await fs.unlink("st1.webp");
            } else {
              if (_0x191119 === "warn") {
                const {
                  getWarnCountByJID: _0xf8ca3e,
                  ajouterUtilisateurAvecWarnCount: _0x3c0d7f
                } = require("./data/warn");
                let _0x30ab9e = await _0xf8ca3e(_0x79eeda);
                let _0x13248d = conf.WARN_COUNT;
                if (_0x30ab9e >= _0x13248d) {
                  var _0x2e9a4c = "link detected , you will be remove because of reaching warn-limit";
                  await _0x29ce6c.sendMessage(_0x18215e, {
                    'text': _0x2e9a4c,
                    'mentions': [_0x79eeda]
                  }, {
                    'quoted': _0x19bc4f
                  });
                  await _0x29ce6c.groupParticipantsUpdate(_0x18215e, [_0x79eeda], "remove");
                  await _0x29ce6c.sendMessage(_0x18215e, {
                    'delete': _0x456b0b
                  });
                } else {
                  var _0x32e4cf = _0x13248d - _0x30ab9e;
                  var _0x278e46 = "Link detected , your warn_count was upgrade ;\n rest : " + _0x32e4cf + " ";
                  await _0x3c0d7f(_0x79eeda);
                  await _0x29ce6c.sendMessage(_0x18215e, {
                    'text': _0x278e46,
                    'mentions': [_0x79eeda]
                  }, {
                    'quoted': _0x19bc4f
                  });
                  await _0x29ce6c.sendMessage(_0x18215e, {
                    'delete': _0x456b0b
                  });
                }
              }
            }
          }
        }
      } catch (_0x258605) {
        console.log("bdd err " + _0x258605);
      }
      try {
        const _0x5b72ed = await verifierEtatJid(_0x18215e);
        if (_0x5df310.includes("Fuck") && _0x4cc032 && _0x5b72ed) {
          console.log("bad word detected");
          var _0xb73e77 = _0x4cc032 ? _0x295d23.includes(_0x3d5b12) : false;
          if (_0x545f4b || _0xe7bf46 || !_0xb73e77) {
            console.log("je fais rien");
            return;
          }
          ;
          const _0x457230 = {
            'remoteJid': _0x18215e,
            'fromMe': false,
            'id': _0x19bc4f.key.id,
            'participant': _0x79eeda
          };
          var _0x5363e5 = "badword detected, \n";
          var _0x26c9ed = new Sticker("https://raw.githubusercontent.com/djalega8000/Zokou-MD/main/media/remover.gif", {
            'pack': "BMW-Md",
            'author': conf.OWNER_NAME,
            'type': StickerTypes.FULL,
            'categories': ['🤩', '🎉'],
            'id': "12345",
            'quality': 0x32,
            'background': "#000000"
          });
          await _0x26c9ed.toFile("st1.webp");
          var _0x191119 = await recupererActionJid(_0x18215e);
          if (_0x191119 === 'remove') {
            _0x5363e5 += "message deleted \n @" + _0x79eeda.split('@')[0x0] + " removed from group.";
            await _0x29ce6c.sendMessage(_0x18215e, {
              'sticker': fs.readFileSync("st1.webp")
            });
            0x0;
            baileys_1.delay(0x320);
            await _0x29ce6c.sendMessage(_0x18215e, {
              'text': _0x5363e5,
              'mentions': [_0x79eeda]
            }, {
              'quoted': _0x19bc4f
            });
            try {
              await _0x29ce6c.groupParticipantsUpdate(_0x18215e, [_0x79eeda], "remove");
            } catch (_0x3a1d57) {
              console.log("antiword") + _0x3a1d57;
            }
            await _0x29ce6c.sendMessage(_0x18215e, {
              'delete': _0x457230
            });
            await fs.unlink('st1.webp');
          } else {
            if (_0x191119 === 'delete') {
              _0x5363e5 += "Goodbye \n @" + _0x79eeda.split('@')[0x0] + " using bad words here is prohibited!.";
              await _0x29ce6c.sendMessage(_0x18215e, {
                'text': _0x5363e5,
                'mentions': [_0x79eeda]
              }, {
                'quoted': _0x19bc4f
              });
              await _0x29ce6c.sendMessage(_0x18215e, {
                'delete': _0x457230
              });
              await fs.unlink('st1.webp');
            } else {
              if (_0x191119 === "warn") {
                const {
                  getWarnCountByJID: _0x5ef7d9,
                  ajouterUtilisateurAvecWarnCount: _0x5afaec
                } = require("./data/warn");
                let _0x278e6d = await _0x5ef7d9(_0x79eeda);
                let _0xbc662b = conf.WARN_COUNT;
                if (_0x278e6d >= _0xbc662b) {
                  var _0x2e9a4c = "bad word detected , you will be remove because of reaching warn-limit";
                  await _0x29ce6c.sendMessage(_0x18215e, {
                    'text': _0x2e9a4c,
                    'mentions': [_0x79eeda]
                  }, {
                    'quoted': _0x19bc4f
                  });
                  await _0x29ce6c.groupParticipantsUpdate(_0x18215e, [_0x79eeda], 'remove');
                  await _0x29ce6c.sendMessage(_0x18215e, {
                    'delete': _0x457230
                  });
                } else {
                  var _0x32e4cf = _0xbc662b - _0x278e6d;
                  var _0x278e46 = "bad word detected , your warn_count was upgrade ;\n rest : " + _0x32e4cf + " ";
                  await _0x5afaec(_0x79eeda);
                  await _0x29ce6c.sendMessage(_0x18215e, {
                    'text': _0x278e46,
                    'mentions': [_0x79eeda]
                  }, {
                    'quoted': _0x19bc4f
                  });
                  await _0x29ce6c.sendMessage(_0x18215e, {
                    'delete': _0x457230
                  });
                }
              }
            }
          }
        }
      } catch (_0x54ed36) {
        console.log("bdd err " + _0x54ed36);
      }
      try {
        const _0x57cb69 = await verifierEtatJid(_0x18215e);
        if (_0x5df310.includes('fuck') && _0x4cc032 && _0x57cb69) {
          console.log("bad word detected");
          var _0xb73e77 = _0x4cc032 ? _0x295d23.includes(_0x3d5b12) : false;
          if (_0x545f4b || _0xe7bf46 || !_0xb73e77) {
            console.log("je fais rien");
            return;
          }
          ;
          const _0x147374 = {
            'remoteJid': _0x18215e,
            'fromMe': false,
            'id': _0x19bc4f.key.id,
            'participant': _0x79eeda
          };
          var _0x5363e5 = "badword detected, \n";
          var _0x26c9ed = new Sticker("https://raw.githubusercontent.com/djalega8000/Zokou-MD/main/media/remover.gif", {
            'pack': 'BMW-Md',
            'author': conf.OWNER_NAME,
            'type': StickerTypes.FULL,
            'categories': ['🤩', '🎉'],
            'id': '12345',
            'quality': 0x32,
            'background': "#000000"
          });
          await _0x26c9ed.toFile("st1.webp");
          var _0x191119 = await recupererActionJid(_0x18215e);
          if (_0x191119 === "remove") {
            _0x5363e5 += "message deleted \n @" + _0x79eeda.split('@')[0x0] + " removed from group.";
            await _0x29ce6c.sendMessage(_0x18215e, {
              'sticker': fs.readFileSync("st1.webp")
            });
            0x0;
            baileys_1.delay(0x320);
            await _0x29ce6c.sendMessage(_0x18215e, {
              'text': _0x5363e5,
              'mentions': [_0x79eeda]
            }, {
              'quoted': _0x19bc4f
            });
            try {
              await _0x29ce6c.groupParticipantsUpdate(_0x18215e, [_0x79eeda], "remove");
            } catch (_0x591497) {
              console.log('antiword') + _0x591497;
            }
            await _0x29ce6c.sendMessage(_0x18215e, {
              'delete': _0x147374
            });
            await fs.unlink("st1.webp");
          } else {
            if (_0x191119 === "delete") {
              _0x5363e5 += "Goodbye \n @" + _0x79eeda.split('@')[0x0] + " using bad words here is prohibited!.";
              await _0x29ce6c.sendMessage(_0x18215e, {
                'text': _0x5363e5,
                'mentions': [_0x79eeda]
              }, {
                'quoted': _0x19bc4f
              });
              await _0x29ce6c.sendMessage(_0x18215e, {
                'delete': _0x147374
              });
              await fs.unlink("st1.webp");
            } else {
              if (_0x191119 === "warn") {
                const {
                  getWarnCountByJID: _0x18d3e7,
                  ajouterUtilisateurAvecWarnCount: _0x2ca8a8
                } = require("./data/warn");
                let _0x1edcdb = await _0x18d3e7(_0x79eeda);
                let _0x571c2d = conf.WARN_COUNT;
                if (_0x1edcdb >= _0x571c2d) {
                  var _0x2e9a4c = "bad word detected , you will be remove because of reaching warn-limit";
                  await _0x29ce6c.sendMessage(_0x18215e, {
                    'text': _0x2e9a4c,
                    'mentions': [_0x79eeda]
                  }, {
                    'quoted': _0x19bc4f
                  });
                  await _0x29ce6c.groupParticipantsUpdate(_0x18215e, [_0x79eeda], "remove");
                  await _0x29ce6c.sendMessage(_0x18215e, {
                    'delete': _0x147374
                  });
                } else {
                  var _0x32e4cf = _0x571c2d - _0x1edcdb;
                  var _0x278e46 = "bad word detected , your warn_count was upgrade ;\n rest : " + _0x32e4cf + " ";
                  await _0x2ca8a8(_0x79eeda);
                  await _0x29ce6c.sendMessage(_0x18215e, {
                    'text': _0x278e46,
                    'mentions': [_0x79eeda]
                  }, {
                    'quoted': _0x19bc4f
                  });
                  await _0x29ce6c.sendMessage(_0x18215e, {
                    'delete': _0x147374
                  });
                }
              }
            }
          }
        }
      } catch (_0x4a3235) {
        console.log("bdd err " + _0x4a3235);
      }
      try {
        const _0x65c4bd = await verifierEtatJid(_0x18215e);
        if (_0x5df310.includes("YEyy") && _0x4cc032 && _0x65c4bd) {
          console.log("bad word detected");
          var _0xb73e77 = _0x4cc032 ? _0x295d23.includes(_0x3d5b12) : false;
          if (_0x545f4b || _0xe7bf46 || !_0xb73e77) {
            console.log("je fais rien");
            return;
          }
          ;
          const _0x1f33fe = {
            'remoteJid': _0x18215e,
            'fromMe': false,
            'id': _0x19bc4f.key.id,
            'participant': _0x79eeda
          };
          var _0x5363e5 = "Levelup Message detected, \n";
          var _0x26c9ed = new Sticker("https://raw.githubusercontent.com/djalega8000/Zokou-MD/main/media/remover.gif", {
            'pack': 'BMW-Md',
            'author': conf.OWNER_NAME,
            'type': StickerTypes.FULL,
            'categories': ['🤩', '🎉'],
            'id': "12345",
            'quality': 0x32,
            'background': '#000000'
          });
          await _0x26c9ed.toFile('st1.webp');
          var _0x191119 = await recupererActionJid(_0x18215e);
          if (_0x191119 === 'remove') {
            _0x5363e5 += "Level up message deleted \n @" + _0x79eeda.split('@')[0x0] + " removed from group.";
            await _0x29ce6c.sendMessage(_0x18215e, {
              'sticker': fs.readFileSync("st1.webp")
            });
            0x0;
            baileys_1.delay(0x320);
            await _0x29ce6c.sendMessage(_0x18215e, {
              'text': _0x5363e5,
              'mentions': [_0x79eeda]
            }, {
              'quoted': _0x19bc4f
            });
            try {
              await _0x29ce6c.groupParticipantsUpdate(_0x18215e, [_0x79eeda], "remove");
            } catch (_0x5b3642) {
              console.log("antiword") + _0x5b3642;
            }
            await _0x29ce6c.sendMessage(_0x18215e, {
              'delete': _0x1f33fe
            });
            await fs.unlink("st1.webp");
          } else {
            if (_0x191119 === "delete") {
              _0x5363e5 += "Goodbye \n @" + _0x79eeda.split('@')[0x0] + " using bad words here is prohibited!.";
              await _0x29ce6c.sendMessage(_0x18215e, {
                'text': _0x5363e5,
                'mentions': [_0x79eeda]
              }, {
                'quoted': _0x19bc4f
              });
              await _0x29ce6c.sendMessage(_0x18215e, {
                'delete': _0x1f33fe
              });
              await fs.unlink("st1.webp");
            } else {
              if (_0x191119 === "warn") {
                const {
                  getWarnCountByJID: _0x34fde2,
                  ajouterUtilisateurAvecWarnCount: _0x291643
                } = require("./data/warn");
                let _0x1ca9c2 = await _0x34fde2(_0x79eeda);
                let _0x15c389 = conf.WARN_COUNT;
                if (_0x1ca9c2 >= _0x15c389) {
                  var _0x2e9a4c = "Level up message detected , you will be remove because of reaching warn-limit";
                  await _0x29ce6c.sendMessage(_0x18215e, {
                    'text': _0x2e9a4c,
                    'mentions': [_0x79eeda]
                  }, {
                    'quoted': _0x19bc4f
                  });
                  await _0x29ce6c.groupParticipantsUpdate(_0x18215e, [_0x79eeda], "remove");
                  await _0x29ce6c.sendMessage(_0x18215e, {
                    'delete': _0x1f33fe
                  });
                } else {
                  var _0x32e4cf = _0x15c389 - _0x1ca9c2;
                  var _0x278e46 = "Level Up message detected , your warn_count was upgrade ;\n rest : " + _0x32e4cf + " ";
                  await _0x291643(_0x79eeda);
                  await _0x29ce6c.sendMessage(_0x18215e, {
                    'text': _0x278e46,
                    'mentions': [_0x79eeda]
                  }, {
                    'quoted': _0x19bc4f
                  });
                  await _0x29ce6c.sendMessage(_0x18215e, {
                    'delete': _0x1f33fe
                  });
                }
              }
            }
          }
        }
      } catch (_0xc3db16) {
        console.log("bdd err " + _0xc3db16);
      }
      try {
        const _0x5292a8 = await verifierEtatJid(_0x18215e);
        if (_0x5df310.includes("Pussy") && _0x4cc032 && _0x5292a8) {
          console.log("bad word detected");
          var _0xb73e77 = _0x4cc032 ? _0x295d23.includes(_0x3d5b12) : false;
          if (_0x545f4b || _0xe7bf46 || !_0xb73e77) {
            console.log("je fais rien");
            return;
          }
          ;
          const _0xb453ff = {
            'remoteJid': _0x18215e,
            'fromMe': false,
            'id': _0x19bc4f.key.id,
            'participant': _0x79eeda
          };
          var _0x5363e5 = "badword detected, \n";
          var _0x26c9ed = new Sticker("https://raw.githubusercontent.com/djalega8000/Zokou-MD/main/media/remover.gif", {
            'pack': 'BMW-Md',
            'author': conf.OWNER_NAME,
            'type': StickerTypes.FULL,
            'categories': ['🤩', '🎉'],
            'id': '12345',
            'quality': 0x32,
            'background': "#000000"
          });
          await _0x26c9ed.toFile("st1.webp");
          var _0x191119 = await recupererActionJid(_0x18215e);
          if (_0x191119 === "remove") {
            _0x5363e5 += "message deleted \n @" + _0x79eeda.split('@')[0x0] + " removed from group.";
            await _0x29ce6c.sendMessage(_0x18215e, {
              'sticker': fs.readFileSync("st1.webp")
            });
            0x0;
            baileys_1.delay(0x320);
            await _0x29ce6c.sendMessage(_0x18215e, {
              'text': _0x5363e5,
              'mentions': [_0x79eeda]
            }, {
              'quoted': _0x19bc4f
            });
            try {
              await _0x29ce6c.groupParticipantsUpdate(_0x18215e, [_0x79eeda], "remove");
            } catch (_0x5e3520) {
              console.log("antiword") + _0x5e3520;
            }
            await _0x29ce6c.sendMessage(_0x18215e, {
              'delete': _0xb453ff
            });
            await fs.unlink("st1.webp");
          } else {
            if (_0x191119 === "delete") {
              _0x5363e5 += "Goodbye \n @" + _0x79eeda.split('@')[0x0] + " using bad words here is prohibited!.";
              await _0x29ce6c.sendMessage(_0x18215e, {
                'text': _0x5363e5,
                'mentions': [_0x79eeda]
              }, {
                'quoted': _0x19bc4f
              });
              await _0x29ce6c.sendMessage(_0x18215e, {
                'delete': _0xb453ff
              });
              await fs.unlink("st1.webp");
            } else {
              if (_0x191119 === "warn") {
                const {
                  getWarnCountByJID: _0x302e0f,
                  ajouterUtilisateurAvecWarnCount: _0xd15519
                } = require("./data/warn");
                let _0xc43b9 = await _0x302e0f(_0x79eeda);
                let _0xbe091d = conf.WARN_COUNT;
                if (_0xc43b9 >= _0xbe091d) {
                  var _0x2e9a4c = "bad word detected , you will be remove because of reaching warn-limit";
                  await _0x29ce6c.sendMessage(_0x18215e, {
                    'text': _0x2e9a4c,
                    'mentions': [_0x79eeda]
                  }, {
                    'quoted': _0x19bc4f
                  });
                  await _0x29ce6c.groupParticipantsUpdate(_0x18215e, [_0x79eeda], "remove");
                  await _0x29ce6c.sendMessage(_0x18215e, {
                    'delete': _0xb453ff
                  });
                } else {
                  var _0x32e4cf = _0xbe091d - _0xc43b9;
                  var _0x278e46 = "bad word detected , your warn_count was upgrade ;\n rest : " + _0x32e4cf + " ";
                  await _0xd15519(_0x79eeda);
                  await _0x29ce6c.sendMessage(_0x18215e, {
                    'text': _0x278e46,
                    'mentions': [_0x79eeda]
                  }, {
                    'quoted': _0x19bc4f
                  });
                  await _0x29ce6c.sendMessage(_0x18215e, {
                    'delete': _0xb453ff
                  });
                }
              }
            }
          }
        }
      } catch (_0x5e2be9) {
        console.log("bdd err " + _0x5e2be9);
      }
      try {
        const _0x3ea45a = await verifierEtatJid(_0x18215e);
        if (_0x5df310.includes("Motherfucker") && _0x4cc032 && _0x3ea45a) {
          console.log("bad word detected");
          var _0xb73e77 = _0x4cc032 ? _0x295d23.includes(_0x3d5b12) : false;
          if (_0x545f4b || _0xe7bf46 || !_0xb73e77) {
            console.log("je fais rien");
            return;
          }
          ;
          const _0x178cbe = {
            'remoteJid': _0x18215e,
            'fromMe': false,
            'id': _0x19bc4f.key.id,
            'participant': _0x79eeda
          };
          var _0x5363e5 = "badword detected, \n";
          var _0x26c9ed = new Sticker("https://raw.githubusercontent.com/djalega8000/Zokou-MD/main/media/remover.gif", {
            'pack': "BMW-Md",
            'author': conf.OWNER_NAME,
            'type': StickerTypes.FULL,
            'categories': ['🤩', '🎉'],
            'id': "12345",
            'quality': 0x32,
            'background': '#000000'
          });
          await _0x26c9ed.toFile("st1.webp");
          var _0x191119 = await recupererActionJid(_0x18215e);
          if (_0x191119 === 'remove') {
            _0x5363e5 += "message deleted \n @" + _0x79eeda.split('@')[0x0] + " removed from group.";
            await _0x29ce6c.sendMessage(_0x18215e, {
              'sticker': fs.readFileSync("st1.webp")
            });
            0x0;
            baileys_1.delay(0x320);
            await _0x29ce6c.sendMessage(_0x18215e, {
              'text': _0x5363e5,
              'mentions': [_0x79eeda]
            }, {
              'quoted': _0x19bc4f
            });
            try {
              await _0x29ce6c.groupParticipantsUpdate(_0x18215e, [_0x79eeda], "remove");
            } catch (_0x4074cc) {
              console.log('antiword') + _0x4074cc;
            }
            await _0x29ce6c.sendMessage(_0x18215e, {
              'delete': _0x178cbe
            });
            await fs.unlink("st1.webp");
          } else {
            if (_0x191119 === "delete") {
              _0x5363e5 += "Goodbye \n @" + _0x79eeda.split('@')[0x0] + " using bad words here is prohibited!.";
              await _0x29ce6c.sendMessage(_0x18215e, {
                'text': _0x5363e5,
                'mentions': [_0x79eeda]
              }, {
                'quoted': _0x19bc4f
              });
              await _0x29ce6c.sendMessage(_0x18215e, {
                'delete': _0x178cbe
              });
              await fs.unlink('st1.webp');
            } else {
              if (_0x191119 === "warn") {
                const {
                  getWarnCountByJID: _0x255698,
                  ajouterUtilisateurAvecWarnCount: _0x5dac75
                } = require("./data/warn");
                let _0x2fa6c8 = await _0x255698(_0x79eeda);
                let _0xac830b = conf.WARN_COUNT;
                if (_0x2fa6c8 >= _0xac830b) {
                  var _0x2e9a4c = "bad word detected , you will be remove because of reaching warn-limit";
                  await _0x29ce6c.sendMessage(_0x18215e, {
                    'text': _0x2e9a4c,
                    'mentions': [_0x79eeda]
                  }, {
                    'quoted': _0x19bc4f
                  });
                  await _0x29ce6c.groupParticipantsUpdate(_0x18215e, [_0x79eeda], "remove");
                  await _0x29ce6c.sendMessage(_0x18215e, {
                    'delete': _0x178cbe
                  });
                } else {
                  var _0x32e4cf = _0xac830b - _0x2fa6c8;
                  var _0x278e46 = "bad word detected , your warn_count was upgrade ;\n rest : " + _0x32e4cf + " ";
                  await _0x5dac75(_0x79eeda);
                  await _0x29ce6c.sendMessage(_0x18215e, {
                    'text': _0x278e46,
                    'mentions': [_0x79eeda]
                  }, {
                    'quoted': _0x19bc4f
                  });
                  await _0x29ce6c.sendMessage(_0x18215e, {
                    'delete': _0x178cbe
                  });
                }
              }
            }
          }
        }
      } catch (_0x110c65) {
        console.log("bdd err " + _0x110c65);
      }
      try {
        const _0x220e5d = await verifierEtatJid(_0x18215e);
        if (_0x5df310.includes("motherfucker") && _0x4cc032 && _0x220e5d) {
          console.log("bad word detected");
          var _0xb73e77 = _0x4cc032 ? _0x295d23.includes(_0x3d5b12) : false;
          if (_0x545f4b || _0xe7bf46 || !_0xb73e77) {
            console.log("je fais rien");
            return;
          }
          ;
          const _0x43ec90 = {
            'remoteJid': _0x18215e,
            'fromMe': false,
            'id': _0x19bc4f.key.id,
            'participant': _0x79eeda
          };
          var _0x5363e5 = "badword detected, \n";
          var _0x26c9ed = new Sticker("https://raw.githubusercontent.com/djalega8000/Zokou-MD/main/media/remover.gif", {
            'pack': "BMW-Md",
            'author': conf.OWNER_NAME,
            'type': StickerTypes.FULL,
            'categories': ['🤩', '🎉'],
            'id': "12345",
            'quality': 0x32,
            'background': "#000000"
          });
          await _0x26c9ed.toFile("st1.webp");
          var _0x191119 = await recupererActionJid(_0x18215e);
          if (_0x191119 === "remove") {
            _0x5363e5 += "message deleted \n @" + _0x79eeda.split('@')[0x0] + " removed from group.";
            await _0x29ce6c.sendMessage(_0x18215e, {
              'sticker': fs.readFileSync("st1.webp")
            });
            0x0;
            baileys_1.delay(0x320);
            await _0x29ce6c.sendMessage(_0x18215e, {
              'text': _0x5363e5,
              'mentions': [_0x79eeda]
            }, {
              'quoted': _0x19bc4f
            });
            try {
              await _0x29ce6c.groupParticipantsUpdate(_0x18215e, [_0x79eeda], "remove");
            } catch (_0x1e0604) {
              console.log("antiword") + _0x1e0604;
            }
            await _0x29ce6c.sendMessage(_0x18215e, {
              'delete': _0x43ec90
            });
            await fs.unlink("st1.webp");
          } else {
            if (_0x191119 === "delete") {
              _0x5363e5 += "Goodbye \n @" + _0x79eeda.split('@')[0x0] + " using bad words here is prohibited!.";
              await _0x29ce6c.sendMessage(_0x18215e, {
                'text': _0x5363e5,
                'mentions': [_0x79eeda]
              }, {
                'quoted': _0x19bc4f
              });
              await _0x29ce6c.sendMessage(_0x18215e, {
                'delete': _0x43ec90
              });
              await fs.unlink("st1.webp");
            } else {
              if (_0x191119 === 'warn') {
                const {
                  getWarnCountByJID: _0x326f61,
                  ajouterUtilisateurAvecWarnCount: _0x44a1bd
                } = require("./data/warn");
                let _0x363427 = await _0x326f61(_0x79eeda);
                let _0x505b06 = conf.WARN_COUNT;
                if (_0x363427 >= _0x505b06) {
                  var _0x2e9a4c = "bad word detected , you will be remove because of reaching warn-limit";
                  await _0x29ce6c.sendMessage(_0x18215e, {
                    'text': _0x2e9a4c,
                    'mentions': [_0x79eeda]
                  }, {
                    'quoted': _0x19bc4f
                  });
                  await _0x29ce6c.groupParticipantsUpdate(_0x18215e, [_0x79eeda], "remove");
                  await _0x29ce6c.sendMessage(_0x18215e, {
                    'delete': _0x43ec90
                  });
                } else {
                  var _0x32e4cf = _0x505b06 - _0x363427;
                  var _0x278e46 = "bad word detected , your warn_count was upgrade ;\n rest : " + _0x32e4cf + " ";
                  await _0x44a1bd(_0x79eeda);
                  await _0x29ce6c.sendMessage(_0x18215e, {
                    'text': _0x278e46,
                    'mentions': [_0x79eeda]
                  }, {
                    'quoted': _0x19bc4f
                  });
                  await _0x29ce6c.sendMessage(_0x18215e, {
                    'delete': _0x43ec90
                  });
                }
              }
            }
          }
        }
      } catch (_0x352419) {
        console.log("bdd err " + _0x352419);
      }
      try {
        const _0x394d91 = await verifierEtatJid(_0x18215e);
        if (_0x5df310.includes('pussy') && _0x4cc032 && _0x394d91) {
          console.log("bad word detected");
          var _0xb73e77 = _0x4cc032 ? _0x295d23.includes(_0x3d5b12) : false;
          if (_0x545f4b || _0xe7bf46 || !_0xb73e77) {
            console.log("je fais rien");
            return;
          }
          ;
          const _0x1b6eed = {
            'remoteJid': _0x18215e,
            'fromMe': false,
            'id': _0x19bc4f.key.id,
            'participant': _0x79eeda
          };
          var _0x5363e5 = "badword detected, \n";
          var _0x26c9ed = new Sticker("https://raw.githubusercontent.com/djalega8000/Zokou-MD/main/media/remover.gif", {
            'pack': "BMW-Md",
            'author': conf.OWNER_NAME,
            'type': StickerTypes.FULL,
            'categories': ['🤩', '🎉'],
            'id': '12345',
            'quality': 0x32,
            'background': "#000000"
          });
          await _0x26c9ed.toFile("st1.webp");
          var _0x191119 = await recupererActionJid(_0x18215e);
          if (_0x191119 === 'remove') {
            _0x5363e5 += "message deleted \n @" + _0x79eeda.split('@')[0x0] + " removed from group.";
            await _0x29ce6c.sendMessage(_0x18215e, {
              'sticker': fs.readFileSync("st1.webp")
            });
            0x0;
            baileys_1.delay(0x320);
            await _0x29ce6c.sendMessage(_0x18215e, {
              'text': _0x5363e5,
              'mentions': [_0x79eeda]
            }, {
              'quoted': _0x19bc4f
            });
            try {
              await _0x29ce6c.groupParticipantsUpdate(_0x18215e, [_0x79eeda], "remove");
            } catch (_0x238de8) {
              console.log("antiword") + _0x238de8;
            }
            await _0x29ce6c.sendMessage(_0x18215e, {
              'delete': _0x1b6eed
            });
            await fs.unlink('st1.webp');
          } else {
            if (_0x191119 === 'delete') {
              _0x5363e5 += "Goodbye \n @" + _0x79eeda.split('@')[0x0] + " using bad words here is prohibited!.";
              await _0x29ce6c.sendMessage(_0x18215e, {
                'text': _0x5363e5,
                'mentions': [_0x79eeda]
              }, {
                'quoted': _0x19bc4f
              });
              await _0x29ce6c.sendMessage(_0x18215e, {
                'delete': _0x1b6eed
              });
              await fs.unlink("st1.webp");
            } else {
              if (_0x191119 === 'warn') {
                const {
                  getWarnCountByJID: _0x3aafb9,
                  ajouterUtilisateurAvecWarnCount: _0x251970
                } = require("./data/warn");
                let _0x2ebb4e = await _0x3aafb9(_0x79eeda);
                let _0x25d510 = conf.WARN_COUNT;
                if (_0x2ebb4e >= _0x25d510) {
                  var _0x2e9a4c = "bad word detected , you will be remove because of reaching warn-limit";
                  await _0x29ce6c.sendMessage(_0x18215e, {
                    'text': _0x2e9a4c,
                    'mentions': [_0x79eeda]
                  }, {
                    'quoted': _0x19bc4f
                  });
                  await _0x29ce6c.groupParticipantsUpdate(_0x18215e, [_0x79eeda], 'remove');
                  await _0x29ce6c.sendMessage(_0x18215e, {
                    'delete': _0x1b6eed
                  });
                } else {
                  var _0x32e4cf = _0x25d510 - _0x2ebb4e;
                  var _0x278e46 = "bad word detected , your warn_count was upgrade ;\n rest : " + _0x32e4cf + " ";
                  await _0x251970(_0x79eeda);
                  await _0x29ce6c.sendMessage(_0x18215e, {
                    'text': _0x278e46,
                    'mentions': [_0x79eeda]
                  }, {
                    'quoted': _0x19bc4f
                  });
                  await _0x29ce6c.sendMessage(_0x18215e, {
                    'delete': _0x1b6eed
                  });
                }
              }
            }
          }
        }
      } catch (_0x4fad7a) {
        console.log("bdd err " + _0x4fad7a);
      }
      try {
        const _0x680434 = _0x19bc4f.key?.['id']?.["startsWith"]('BAE') && _0x19bc4f.key?.['id']?.["length"] === 0x10;
        const _0x345056 = _0x19bc4f.key?.['id']?.['startsWith']("BAE1") && _0x19bc4f.key?.['id']?.['length'] === 0x10;
        if (_0x680434 || _0x345056) {
          if (_0xf350b4 === "reactionMessage") {
            console.log("Je ne reagis pas au reactions");
            return;
          }
          ;
          const _0x595f15 = await atbverifierEtatJid(_0x18215e);
          if (!_0x595f15) {
            return;
          }
          ;
          if (_0xe7bf46 || _0x79eeda === _0x3d5b12) {
            console.log("je fais rien");
            return;
          }
          ;
          const _0x5ca49d = {
            'remoteJid': _0x18215e,
            'fromMe': false,
            'id': _0x19bc4f.key.id,
            'participant': _0x79eeda
          };
          var _0x5363e5 = "bot detected, \n";
          var _0x26c9ed = new Sticker("https://raw.githubusercontent.com/djalega8000/Zokou-MD/main/media/remover.gif", {
            'pack': "BMW-Md",
            'author': conf.OWNER_NAME,
            'type': StickerTypes.FULL,
            'categories': ['🤩', '🎉'],
            'id': "12345",
            'quality': 0x32,
            'background': '#000000'
          });
          await _0x26c9ed.toFile('st1.webp');
          var _0x191119 = await atbrecupererActionJid(_0x18215e);
          if (_0x191119 === 'remove') {
            _0x5363e5 += "message deleted \n @" + _0x79eeda.split('@')[0x0] + " removed from group.";
            await _0x29ce6c.sendMessage(_0x18215e, {
              'sticker': fs.readFileSync("st1.webp")
            });
            0x0;
            baileys_1.delay(0x320);
            await _0x29ce6c.sendMessage(_0x18215e, {
              'text': _0x5363e5,
              'mentions': [_0x79eeda]
            }, {
              'quoted': _0x19bc4f
            });
            try {
              await _0x29ce6c.groupParticipantsUpdate(_0x18215e, [_0x79eeda], "remove");
            } catch (_0x9227ed) {
              console.log("antibot ") + _0x9227ed;
            }
            await _0x29ce6c.sendMessage(_0x18215e, {
              'delete': _0x5ca49d
            });
            await fs.unlink("st1.webp");
          } else {
            if (_0x191119 === "delete") {
              _0x5363e5 += "message delete \n @" + _0x79eeda.split('@')[0x0] + " Avoid sending link.";
              await _0x29ce6c.sendMessage(_0x18215e, {
                'text': _0x5363e5,
                'mentions': [_0x79eeda]
              }, {
                'quoted': _0x19bc4f
              });
              await _0x29ce6c.sendMessage(_0x18215e, {
                'delete': _0x5ca49d
              });
              await fs.unlink("st1.webp");
            } else {
              if (_0x191119 === 'warn') {
                const {
                  getWarnCountByJID: _0x437757,
                  ajouterUtilisateurAvecWarnCount: _0x439a76
                } = require("./data/warn");
                let _0xbec30a = await _0x437757(_0x79eeda);
                let _0x3f3fcf = conf.WARN_COUNT;
                if (_0xbec30a >= _0x3f3fcf) {
                  var _0x2e9a4c = "bot detected ;you will be removed because of reaching warn-limit";
                  await _0x29ce6c.sendMessage(_0x18215e, {
                    'text': _0x2e9a4c,
                    'mentions': [_0x79eeda]
                  }, {
                    'quoted': _0x19bc4f
                  });
                  await _0x29ce6c.groupParticipantsUpdate(_0x18215e, [_0x79eeda], "remove");
                  await _0x29ce6c.sendMessage(_0x18215e, {
                    'delete': _0x5ca49d
                  });
                } else {
                  var _0x32e4cf = _0x3f3fcf - _0xbec30a;
                  var _0x278e46 = "bot detected , your warn_count was upgrade ;\n rest : " + _0x32e4cf + " ";
                  await _0x439a76(_0x79eeda);
                  await _0x29ce6c.sendMessage(_0x18215e, {
                    'text': _0x278e46,
                    'mentions': [_0x79eeda]
                  }, {
                    'quoted': _0x19bc4f
                  });
                  await _0x29ce6c.sendMessage(_0x18215e, {
                    'delete': _0x5ca49d
                  });
                }
              }
            }
          }
        }
      } catch (_0x594a1b) {
        console.log(".... " + _0x594a1b);
      }
      if (_0x14e31c) {
        const _0x42e866 = evt.cm.find(_0x1d6e5f => _0x1d6e5f.nomCom === _0x571a7e);
        if (_0x42e866) {
          try {
            if (conf.MODE.toLocaleLowerCase() != "public" && !_0x545f4b) {
              return;
            }
            if (!_0x545f4b && _0x18215e === _0x79eeda && conf.PM_PERMIT === 'on') {
              _0x9fe7a5("You don't have acces to commands here");
              return;
            }
            if (!_0x545f4b && _0x4cc032) {
              let _0xa1acb8 = await isGroupBanned(_0x18215e);
              if (_0xa1acb8) {
                return;
              }
            }
            if (!_0xe7bf46 && _0x4cc032) {
              let _0x29b04a = await isGroupOnlyAdmin(_0x18215e);
              if (_0x29b04a) {
                return;
              }
            }
            if (!_0x545f4b) {
              let _0x538f18 = await isUserBanned(_0x79eeda);
              if (_0x538f18) {
                _0x9fe7a5("You are banned from bot commands");
                return;
              }
            }
            reagir(_0x18215e, _0x29ce6c, _0x19bc4f, _0x42e866.reaction);
            _0x42e866.fonction(_0x18215e, _0x29ce6c, _0x1d86cc);
          } catch (_0x36e89f) {
            console.log("😡😡 " + _0x36e89f);
            _0x29ce6c.sendMessage(_0x18215e, {
              'text': "😡😡 " + _0x36e89f
            }, {
              'quoted': _0x19bc4f
            });
          }
        }
      }
    });
    const {
      recupevents: _0xefb026
    } = require("./data/welcome");
    _0x29ce6c.ev.on("group-participants.update", async _0x50a075 => {
      console.log(_0x50a075);
      let _0x57372d;
      try {
        _0x57372d = await _0x29ce6c.profilePictureUrl(_0x50a075.id, "image");
      } catch {
        _0x57372d = "https://telegra.ph/file/3bf285a2c0f3d986028f3.jpg";
      }
      try {
        const _0x4d9f78 = await _0x29ce6c.groupMetadata(_0x50a075.id);
        if (_0x50a075.action == "add" && (await _0xefb026(_0x50a075.id, 'welcome')) == 'on') {
          let _0x5ce568 = "◇FLASH-MD◇\n";
          let _0x3d9fdc = _0x50a075.participants;
          for (let _0x3071e9 of _0x3d9fdc) {
            _0x5ce568 += "Hello @" + _0x3071e9.split('@')[0x0] + "\n";
          }
          _0x5ce568 += "*You are welcomed here.* \n            \n*You MAY read the group description FOR more info and Avoid getting removed*\n            \n     \n            \n ◇ *GROUP DESCRIPTION*  ◇\n\n" + _0x4d9f78.desc + "\n\n📌Powered by *France King";
          _0x29ce6c.sendMessage(_0x50a075.id, {
            'image': {
              'url': _0x57372d
            },
            'caption': _0x5ce568,
            'mentions': _0x3d9fdc
          });
        } else {
          if (_0x50a075.action == "remove" && (await _0xefb026(_0x50a075.id, "goodbye")) == 'on') {
            let _0x3f39c4 = "Goodbye to that Fallen soldier, Powered by *FLASH-MD*;\n";
            let _0x508584 = _0x50a075.participants;
            for (let _0x588a2c of _0x508584) {
              _0x3f39c4 += '@' + _0x588a2c.split('@')[0x0] + "\n";
            }
            _0x29ce6c.sendMessage(_0x50a075.id, {
              'text': _0x3f39c4,
              'mentions': _0x508584
            });
          } else {
            if (_0x50a075.action == "promote" && (await _0xefb026(_0x50a075.id, "antipromote")) == 'on') {
              if (_0x50a075.author == _0x4d9f78.owner || _0x50a075.author == conf.OWNER_NUMBER + "@s.whatsapp.net" || _0x50a075.author == decodeJid(_0x29ce6c.user.id) || _0x50a075.author == _0x50a075.participants[0x0]) {
                console.log("Cas de superUser je fais rien");
                return;
              }
              ;
              await _0x29ce6c.groupParticipantsUpdate(_0x50a075.id, [_0x50a075.author, _0x50a075.participants[0x0]], "demote");
              _0x29ce6c.sendMessage(_0x50a075.id, {
                'text': '@' + _0x50a075.author.split('@')[0x0] + " has violated the anti-promotion rule, therefore both " + _0x50a075.author.split('@')[0x0] + " and @" + _0x50a075.participants[0x0].split('@')[0x0] + " have been removed from administrative rights.",
                'mentions': [_0x50a075.author, _0x50a075.participants[0x0]]
              });
            } else {
              if (_0x50a075.action == "demote" && (await _0xefb026(_0x50a075.id, "antidemote")) == 'on') {
                if (_0x50a075.author == _0x4d9f78.owner || _0x50a075.author == conf.OWNER_NUMBER + "@s.whatsapp.net" || _0x50a075.author == decodeJid(_0x29ce6c.user.id) || _0x50a075.author == _0x50a075.participants[0x0]) {
                  console.log("Cas de superUser je fais rien");
                  return;
                }
                ;
                await _0x29ce6c.groupParticipantsUpdate(_0x50a075.id, [_0x50a075.author], 'demote');
                await _0x29ce6c.groupParticipantsUpdate(_0x50a075.id, [_0x50a075.participants[0x0]], "promote");
                _0x29ce6c.sendMessage(_0x50a075.id, {
                  'text': '@' + _0x50a075.author.split('@')[0x0] + " has violated the anti-demotion rule by removing @" + _0x50a075.participants[0x0].split('@')[0x0] + ". Consequently, he has been demonated from the admin sit.",
                  'mentions': [_0x50a075.author, _0x50a075.participants[0x0]]
                });
              }
            }
          }
        }
      } catch (_0x2ad37f) {
        console.error(_0x2ad37f);
      }
    });
    _0x29ce6c.ev.on("contacts.upsert", async _0x3df076 => {
      const _0x380354 = _0x1d3908 => {
        for (const _0x1b8cf3 of _0x1d3908) {
          if (store.contacts[_0x1b8cf3.id]) {
            Object.assign(store.contacts[_0x1b8cf3.id], _0x1b8cf3);
          } else {
            store.contacts[_0x1b8cf3.id] = _0x1b8cf3;
          }
        }
        return;
      };
      _0x380354(_0x3df076);
    });
    _0x29ce6c.ev.on("connection.update", async _0x3f0280 => {
      const {
        lastDisconnect: _0x263d6f,
        connection: _0x259266
      } = _0x3f0280;
      if (_0x259266 === "connecting") {
        console.log("ℹ️ Searching for connection...");
      } else {
        if (_0x259266 === "open") {
          console.log("Connected to WhatsApp ✅");
          console.log('--');
          0x0;
          await baileys_1.delay(0xc8);
          console.log('------');
          0x0;
          await baileys_1.delay(0x12c);
          console.log("------------------/-----");
          console.log("the bot is online 🕸\n\n");
          console.log("Loading Commands ...\n");
          fs.readdirSync(__dirname + "/bmw").forEach(_0x70cdea => {
            if (path.extname(_0x70cdea).toLowerCase() == ".js") {
              try {
                require(__dirname + "/bmw/" + _0x70cdea);
                console.log(_0x70cdea + " installed ✔️");
              } catch (_0x55a259) {
                console.log(_0x70cdea + " could not be loaded for the following reasons  : " + _0x55a259);
              }
              0x0;
              baileys_1.delay(0x12c);
            }
          });
          0x0;
          baileys_1.delay(0x2bc);
          var _0x401be2;
          if (conf.MODE.toLocaleLowerCase() === 'public') {
            _0x401be2 = "Public";
          } else if (conf.MODE.toLocaleLowerCase() === "private") {
            _0x401be2 = 'Private';
          } else {
            _0x401be2 = "undefined";
          }
          console.log("Commands successfully Loaded ✅");
          if (conf.DP.toLowerCase() === 'on') {
            let _0x1ee065 = "*Bmw is Connected ❍* \n                  \n*❒YOUR PREFIX:* [ " + prefixe + " ] \n*❒BOT MODE:* " + _0x401be2 + " \n*❒COMMANDS:* " + evt.cm.length + "\n\n_________________________________\n    \n╔═════◇\n║◇ *KEEP USING BMW-MD*\n╚════════════════>\n_________________________________\n*CREATED BY ©Ibrahim Adams*";
            await _0x29ce6c.sendMessage(_0x29ce6c.user.id, {
              'text': _0x1ee065
            });
          }
        } else {
          if (_0x259266 == 'close') {
            let _0x442b73 = new boom_1.Boom(_0x263d6f?.['error'])?.["output"]["statusCode"];
            if (_0x442b73 === baileys_1.DisconnectReason.badSession) {
              console.log("Wrong session ID. please rescan the QR or use pairing code by France King...");
            } else {
              if (_0x442b73 === baileys_1.DisconnectReason.connectionClosed) {
                console.log("!!! connection closed, reconnection in progress ...");
                _0x21e2d3();
              } else {
                if (_0x442b73 === baileys_1.DisconnectReason.connectionLost) {
                  console.log("connection to server lost 😞,,, reconnection in progress... ");
                  _0x21e2d3();
                } else {
                  if (_0x442b73 === baileys_1.DisconnectReason?.["connectionReplaced"]) {
                    console.log("connection replaced,,, a session is already open, please close it!!!");
                  } else {
                    if (_0x442b73 === baileys_1.DisconnectReason.loggedOut) {
                      console.log("You are disconnected,,, please rescan the qr code or use pairing code");
                    } else {
                      if (_0x442b73 === baileys_1.DisconnectReason.restartRequired) {
                        console.log("Reboot in progress ▶️");
                        _0x21e2d3();
                      } else {
                        console.log("Reboot Error 😑", _0x442b73);
                        const {
                          exec: _0xb19aff
                        } = require("child_process");
                        _0xb19aff("pm2 restart all");
                      }
                    }
                  }
                }
              }
            }
            console.log("hum " + _0x259266);
            _0x21e2d3();
          }
        }
      }
    });
    _0x29ce6c.ev.on("creds.update", _0x4449a5);
    _0x29ce6c.downloadAndSaveMediaMessage = async (_0x1aa5b5, _0x217c17 = '', _0x16806a = true) => {
      let _0xc8aa44 = _0x1aa5b5.msg ? _0x1aa5b5.msg : _0x1aa5b5;
      let _0x9f8a64 = (_0x1aa5b5.msg || _0x1aa5b5).mimetype || '';
      let _0x93ebf4 = _0x1aa5b5.mtype ? _0x1aa5b5.mtype.replace(/Message/gi, '') : _0x9f8a64.split('/')[0x0];
      0x0;
      const _0x2ba149 = await baileys_1.downloadContentFromMessage(_0xc8aa44, _0x93ebf4);
      let _0x2ba6d9 = Buffer.from([]);
      for await (const _0x47a145 of _0x2ba149) {
        _0x2ba6d9 = Buffer.concat([_0x2ba6d9, _0x47a145]);
      }
      let _0x4b428b = await FileType.fromBuffer(_0x2ba6d9);
      let _0x1cb470 = './' + _0x217c17 + '.' + _0x4b428b.ext;
      await fs.writeFileSync(_0x1cb470, _0x2ba6d9);
      return _0x1cb470;
    };
    _0x29ce6c.awaitForMessage = async (_0x95229e = {}) => {
      return new Promise((_0x40f6c7, _0x11cfbb) => {
        if (typeof _0x95229e !== "object") {
          _0x11cfbb(new Error("Options must be an object"));
        }
        if (typeof _0x95229e.sender !== "string") {
          _0x11cfbb(new Error("Sender must be a string"));
        }
        if (typeof _0x95229e.chatJid !== 'string') {
          _0x11cfbb(new Error("ChatJid must be a string"));
        }
        if (_0x95229e.timeout && typeof _0x95229e.timeout !== "number") {
          _0x11cfbb(new Error("Timeout must be a number"));
        }
        if (_0x95229e.filter && typeof _0x95229e.filter !== 'function') {
          _0x11cfbb(new Error("Filter must be a function"));
        }
        const _0x2cd47d = _0x95229e?.["timeout"] || undefined;
        const _0x2a52ab = _0x95229e?.["filter"] || (() => true);
        let _0x160345 = undefined;
        let _0x3ca915 = _0x1a4dc4 => {
          let {
            type: _0x34b859,
            messages: _0x5ef333
          } = _0x1a4dc4;
          if (_0x34b859 == "notify") {
            for (let _0x5a7589 of _0x5ef333) {
              const _0x1c8d2c = _0x5a7589.key.fromMe;
              const _0x1c9f70 = _0x5a7589.key.remoteJid;
              const _0x41ee8e = _0x1c9f70.endsWith('@g.us');
              const _0x409670 = _0x1c9f70 == "status@broadcast";
              const _0x2dacf3 = _0x1c8d2c ? _0x29ce6c.user.id.replace(/:.*@/g, '@') : _0x41ee8e || _0x409670 ? _0x5a7589.key.participant.replace(/:.*@/g, '@') : _0x1c9f70;
              if (_0x2dacf3 == _0x95229e.sender && _0x1c9f70 == _0x95229e.chatJid && _0x2a52ab(_0x5a7589)) {
                _0x29ce6c.ev.off("messages.upsert", _0x3ca915);
                clearTimeout(_0x160345);
                _0x40f6c7(_0x5a7589);
              }
            }
          }
        };
        _0x29ce6c.ev.on("messages.upsert", _0x3ca915);
        if (_0x2cd47d) {
          _0x160345 = setTimeout(() => {
            _0x29ce6c.ev.off("messages.upsert", _0x3ca915);
            _0x11cfbb(new Error('Timeout'));
          }, _0x2cd47d);
        }
      });
    };
    return _0x29ce6c;
  }
  let _0x57db43 = require.resolve(__filename);
  fs.watchFile(_0x57db43, () => {
    fs.unwatchFile(_0x57db43);
    console.log("mise à jour " + __filename);
    delete require.cache[_0x57db43];
    require(_0x57db43);
  });
  _0x21e2d3();
}, 0x1388);
