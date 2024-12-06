const { adams } = require("../Ibrahim/adams");
const { default :axios } = require("axios");
const { mediafireDl } = require("../Ibrahim/dl/Function");

adams({
  nomCom: "fetch",
  categorie: "Search",
  reaction: '🛄',
}, async (_0x34e935, _0x726ab, _0x295c2d) => {
  const { repondre: _0x356671, arg: _0x3dfafe } = _0x295c2d;
  const urlInput = _0x3dfafe.join(" ");

  if (!/^https?:\/\//.test(urlInput)) {
    return _0x356671("Start the *URL* with http:// or https://");
  }

  try {
    const url = new URL(urlInput);
    const fetchUrl = `${url.origin}${url.pathname}?${url.searchParams.toString()}`;
    const response = await fetch(fetchUrl);

    if (!response.ok) {
      return _0x356671("Failed to fetch the URL. Status: " + response.status + " " + response.statusText);
    }

    const contentLength = response.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > 104857600) {
      return _0x356671("Content-Length exceeds the limit: " + contentLength);
    }

    const contentType = response.headers.get('content-type');
    console.log('Content-Type:', contentType);

    const buffer = Buffer.from(await response.arrayBuffer());
    if (/image\/.*/.test(contentType)) {
      await _0x726ab.sendMessage(_0x34e935, {
        image: { url: fetchUrl },
        caption: "> > *BMW MD*"
      }, { quoted: _0x295c2d.ms });
    } else if (/video\/.*/.test(contentType)) {
      await _0x726ab.sendMessage(_0x34e935, {
        video: { url: fetchUrl },
        caption: "> > *BMW MD*"
      }, { quoted: _0x295c2d.ms });
    } else if (/text|json/.test(contentType)) {
      try {
        const json = JSON.parse(buffer);
        console.log("Parsed JSON:", json);
        _0x356671(JSON.stringify(json, null, 2).slice(0, 10000));
      } catch {
        _0x356671(buffer.toString().slice(0, 10000));
      }
    } else {
      await _0x726ab.sendMessage(_0x34e935, {
        document: { url: fetchUrl },
        caption: "> > *BMW MD*"
      }, { quoted: _0x295c2d.ms });
    }
  } catch (error) {
    console.error("Error fetching data:", error.message);
    _0x356671("Error fetching data: " + error.message);
  }
});
