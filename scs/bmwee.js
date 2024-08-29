const axios = require("axios");
const {
  adams
} = require('../Ibrahim/adams');
const {
  Sticker,
  StickerTypes
} = require('wa-sticker-formatter');
adams({
  'nomCom': "ranime",
  'categorie': 'Fun',
  'reaction': '📺'
}, async (_0x3706cd, _0x4d0877, _0x335041) => {
  const {
    repondre: _0x131828,
    ms: _0x2bfc9e
  } = _0x335041;
  try {
    const _0x6bdb84 = await axios.get('https://api.jikan.moe/v4/random/anime');
    const _0x485e75 = _0x6bdb84.data.data;
    const _0x541be4 = _0x485e75.title;
    const _0x18c0c5 = _0x485e75.synopsis;
    const _0x18cb16 = _0x485e75.images.jpg.image_url;
    const _0x12d2f0 = _0x485e75.episodes;
    const _0x4921cf = _0x485e75.status;
    const _0x78e365 = "📺 Titre: " + _0x541be4 + "\n🎬 Épisodes: " + _0x12d2f0 + "\n📡 Statut: " + _0x4921cf + "\n📝 Synopsis: " + _0x18c0c5 + "\n🔗 URL: " + _0x485e75.url;
    _0x4d0877.sendMessage(_0x3706cd, {
      'image': {
        'url': _0x18cb16
      },
      'caption': _0x78e365
    }, {
      'quoted': _0x2bfc9e
    });
  } catch (_0x1e299d) {
    console.error("Error retrieving data from JSON :", _0x1e299d);
    _0x131828("Error retrieving data from JSON.");
  }
});
adams({
  'nomCom': "google",
  'categorie': 'Search'
}, async (_0xce35ee, _0x580287, _0x1a7926) => {
  const {
    arg: _0x45ffa0,
    repondre: _0x44c3f6
  } = _0x1a7926;
  if (!_0x45ffa0[0x0] || _0x45ffa0 === '') {
    _0x44c3f6("Give me a query.\n*Example: .google What is a bot.*");
    return;
  }
  const _0x47ba40 = require("google-it");
  try {
    const _0xb04653 = await _0x47ba40({
      'query': _0x45ffa0.join(" ")
    });
    let _0x100d9a = "Google search for : " + _0x45ffa0 + "\n\n";
    for (let _0x288157 of _0xb04653) {
      _0x100d9a += "➣ Title : " + _0x288157.title + "\n";
      _0x100d9a += "➣ Description : " + _0x288157.snippet + "\n";
      _0x100d9a += "➣ Link : " + _0x288157.link + "\n\n────────────────────────\n\n";
    }
    _0x44c3f6(_0x100d9a);
  } catch (_0x277bfb) {
    _0x44c3f6("An error occurred during Google search.");
  }
});
adams({
  'nomCom': "imdb",
  'categorie': "Search"
}, async (_0x3e0c57, _0x31cdeb, _0x68675d) => {
  const {
    arg: _0xb16e9f,
    repondre: _0x390000,
    ms: _0x2128cb
  } = _0x68675d;
  if (!_0xb16e9f[0x0] || _0xb16e9f === '') {
    _0x390000("give the name of a series or film.");
    return;
  }
  try {
    const _0x2465ce = await axios.get('http://www.omdbapi.com/?apikey=742b2d09&t=' + _0xb16e9f + '&plot=full');
    const _0x15db1f = _0x2465ce.data;
    let _0xd32d5c = "⚍⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚍\n";
    _0xd32d5c += " ``` 𝕀𝕄𝔻𝔹 𝕊𝔼𝔸ℝℂℍ```\n";
    _0xd32d5c += "⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎\n";
    _0xd32d5c += "🎬Title    : " + _0x15db1f.Title + "\n";
    _0xd32d5c += "📅year      : " + _0x15db1f.Year + "\n";
    _0xd32d5c += "⭐Assessment : " + _0x15db1f.Rated + "\n";
    _0xd32d5c += "📆Release    : " + _0x15db1f.Released + "\n";
    _0xd32d5c += "⏳Runtime     : " + _0x15db1f.Runtime + "\n";
    _0xd32d5c += "🌀Genre      : " + _0x15db1f.Genre + "\n";
    _0xd32d5c += "👨🏻‍💻Director : " + _0x15db1f.Director + "\n";
    _0xd32d5c += "✍writers : " + _0x15db1f.Writer + "\n";
    _0xd32d5c += "👨actors  : " + _0x15db1f.Actors + "\n";
    _0xd32d5c += "📃Synopsis  : " + _0x15db1f.Plot + "\n";
    _0xd32d5c += "🌐Language  : " + _0x15db1f.Language + "\n";
    _0xd32d5c += "🌍Contry      : " + _0x15db1f.Country + "\n";
    _0xd32d5c += "🎖️Awards : " + _0x15db1f.Awards + "\n";
    _0xd32d5c += "📦BoxOffice : " + _0x15db1f.BoxOffice + "\n";
    _0xd32d5c += "🏙️Production : " + _0x15db1f.Production + "\n";
    _0xd32d5c += "🌟score : " + _0x15db1f.imdbRating + "\n";
    _0xd32d5c += "❎imdbVotes : " + _0x15db1f.imdbVotes + '';
    _0x31cdeb.sendMessage(_0x3e0c57, {
      'image': {
        'url': _0x15db1f.Poster
      },
      'caption': _0xd32d5c
    }, {
      'quoted': _0x2128cb
    });
  } catch (_0x1cf2b8) {
    _0x390000("An error occurred while searching IMDb.");
  }
});
adams({
  'nomCom': "movie",
  'categorie': 'Search'
}, async (_0x41a878, _0x44c40c, _0x3424dd) => {
  const {
    arg: _0x51290b,
    repondre: _0x111c6a,
    ms: _0x3b271c
  } = _0x3424dd;
  if (!_0x51290b[0x0] || _0x51290b === '') {
    _0x111c6a("give the name of a series or film.");
    return;
  }
  try {
    const _0x2fab7f = await axios.get("http://www.omdbapi.com/?apikey=742b2d09&t=" + _0x51290b + "&plot=full");
    const _0x315c2c = _0x2fab7f.data;
    let _0x1d9b0f = "*Yoo if you want to download this film join telegram channel below and get it*\n";
    _0x1d9b0f += " ``` https://t.me/ibrahimtechai```\n";
    _0x1d9b0f += "*BMW MD FILMS SEARCH*\n";
    _0x1d9b0f += "🎬Title    : " + _0x315c2c.Title + "\n";
    _0x1d9b0f += "⭐Assessment : " + _0x315c2c.Rated + "\n";
    _0x1d9b0f += "📆Release    : " + _0x315c2c.Released + "\n";
    _0x1d9b0f += "⏳Runtime     : " + _0x315c2c.Runtime + "\n";
    _0x1d9b0f += "🌀Genre      : " + _0x315c2c.Genre + "\n";
    _0x1d9b0f += "👨🏻‍💻Director : " + _0x315c2c.Director + "\n";
    _0x1d9b0f += "✍writers : " + _0x315c2c.Writer + "\n";
    _0x1d9b0f += "👨actors  : " + _0x315c2c.Actors + "\n";
    _0x1d9b0f += "🌐Language  : " + _0x315c2c.Language + "\n";
    _0x1d9b0f += "🌍Contry      : " + _0x315c2c.Country + "\n";
    _0x1d9b0f += "🏙️Production : " + _0x315c2c.Production + "\n";
    _0x1d9b0f += "❎imdbVotes : " + _0x315c2c.imdbVotes + "\n";
    _0x1d9b0f += "🤠Sponsor  :  ©Ibrahim Adams";
    _0x44c40c.sendMessage(_0x41a878, {
      'image': {
        'url': _0x315c2c.Poster
      },
      'caption': _0x1d9b0f
    }, {
      'quoted': _0x3b271c
    });
  } catch (_0x4a93c8) {
    _0x111c6a("An error occurred while searching IMDb.");
  }
});
adams({
  'nomCom': "emomix",
  'categorie': 'Conversion'
}, async (_0x551458, _0x2c4778, _0x21c569) => {
  const {
    arg: _0x259928,
    repondre: _0x1e8365,
    ms: _0x4866c8,
    nomAuteurMessage: _0x259630
  } = _0x21c569;
  if (!_0x259928[0x0] || _0x259928.length !== 0x1) {
    _0x1e8365("Incorrect use. Example: .emojimix 😀;🥰");
    return;
  }
  const _0x1dbdf4 = _0x259928.join(" ").split(';');
  if (_0x1dbdf4.length !== 0x2) {
    _0x1e8365("Please specify two emojis using a ';' as a separator.");
    return;
  }
  const _0x4c4e39 = _0x1dbdf4[0x0].trim();
  const _0x19c1b9 = _0x1dbdf4[0x1].trim();
  try {
    const _0x36bc47 = require("axios");
    const _0x559df0 = await _0x36bc47.get("https://levanter.onrender.com/emix?q=" + _0x4c4e39 + _0x19c1b9);
    if (_0x559df0.data.status === true) {
      let _0x4ad919 = new Sticker(_0x559df0.data.result, {
        'pack': _0x259630,
        'type': StickerTypes.CROPPED,
        'categories': ['🤩', '🎉'],
        'id': '12345',
        'quality': 0x46,
        'background': "transparent"
      });
      const _0xab42e7 = await _0x4ad919.toBuffer();
      _0x2c4778.sendMessage(_0x551458, {
        'sticker': _0xab42e7
      }, {
        'quoted': _0x4866c8
      });
    } else {
      _0x1e8365("Unable to create emoji mix.");
    }
  } catch (_0x527ade) {
    _0x1e8365("An error occurred while creating the emoji mix." + _0x527ade);
  }
});
