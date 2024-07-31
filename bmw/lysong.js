const {
  zokou
} = require("../framework/zokou");
const axios = require("axios");
const Genius = require("genius-lyrics");
const Client = new Genius.Client("jKTbbU-6X2B9yWWl-KOm7Mh3_Z6hQsgE4mmvwV3P3Qe7oNa9-hsrLxQV5l5FiAZO");
zokou({
  'nomCom': "lyrics",
  'reaction': '🗞',
  'categorie': "Search"
}, async (_0x16b585, _0x24921b, _0x5047e1) => {
  const {
    repondre: _0x323d88,
    arg: _0x47ee56,
    ms: _0x26dbd3
  } = _0x5047e1;
  try {
    if (!_0x47ee56 || _0x47ee56.length === 0x0) {
      return _0x323d88("please provide me the song name");
    }
    const _0x2d6993 = _0x47ee56.join(" ");
    const _0x19a972 = await Client.songs.search(_0x2d6993);
    const _0x349a1c = _0x19a972[0x0];
    const _0x3e8204 = await _0x349a1c.lyrics();
    await _0x24921b.sendMessage(_0x16b585, {
      'text': _0x3e8204
    }, {
      'quoted': _0x26dbd3
    });
  } catch (_0xe736b5) {
    reply("I did not find any lyrics for " + text + ". Try searching a different song.");
    console.log(_0xe736b5);
  }
});

zokou({
  'nomCom': 'define',
  'reaction': '🤔',
  'categorie': "Search"
}, async (_0x2d6773, _0x1778cf, _0x5bcf7e) => {
  const {
    repondre: _0x3c6e3b,
    arg: _0x3997ea,
    ms: _0x10a9bb
  } = _0x5bcf7e;
  if (!_0x3997ea || _0x3997ea.length === 0x0) {
    return _0x3c6e3b("provide a term");
  }
  const _0x243eb3 = _0x3997ea.join(" ");
  try {
    let {
      data: _0x31830d
    } = await axios.get("http://api.urbandictionary.com/v0/define?term=" + _0x243eb3);
    var _0x259634 = "\n Word: " + _0x243eb3 + "\n Definition: " + _0x31830d.list[0x0].definition.replace(/\[/g, '').replace(/\]/g, '') + "\n Example: " + _0x31830d.list[0x0].example.replace(/\[/g, '').replace(/\]/g, '');
    return _0x3c6e3b(_0x259634);
  } catch {
    return _0x3c6e3b("No result for " + _0x243eb3);
  }
});
