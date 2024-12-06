const JavaScriptObfuscator = require("javascript-obfuscator");
const {
  adams
} = require("../Ibrahim/adams");
adams({
  'nomCom': "obt",
  'categorie': 'General'
}, async (_0x3cf1f0, _0x36cbf1, _0x90621a) => {
  const {
    ms: _0x4b944b,
    arg: _0x34f2ba,
    repondre: _0x19e646,
    auteurMessage: _0x4ebaef,
    nomAuteurMessage: _0x2dfa6f,
    msgRepondu: _0x354080,
    auteurMsgRepondu: _0x548b39
  } = _0x90621a;
  try {
    let _0x32b5ce = _0x34f2ba.join(" ");
    if (!_0x34f2ba[0x0]) {
      _0x19e646("After the command, provide a valid JavaScript code for encryption");
      return;
    }
    ;
    const _0x3fa990 = JavaScriptObfuscator.obfuscate(_0x32b5ce, {
      'compact': true,
      'controlFlowFlattening': true,
      'controlFlowFlatteningThreshold': 0x1,
      'numbersToExpressions': true,
      'simplify': true,
      'stringArrayShuffle': true,
      'splitStrings': true,
      'stringArrayThreshold': 0x1
    });
    await _0x19e646(_0x3fa990.getObfuscatedCode());
  } catch {
    _0x19e646("Something is wrong, check if your code is logical and has the correct syntax");
  }
});
