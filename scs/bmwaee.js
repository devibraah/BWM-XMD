const { adams } = require("../Ibrahim/adams");
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const imgURL = 'https://api.telegram.org/file/bot7020055977:AAGb76pIutuwV__eC2q7qSQns4XFMRjd-bw/photos/file_0.jpg';
const apiURL = 'https://samirxpikachuio.onrender.com/artify?url=${imgURL}';
const outPath = l, 'generated_image.jpg');
zokou({
  nomCom: "gta",
  categorie: "Download",
  reaction: "☯"

}, async function getGTAImg() {
  const imageSrc = 'https://i.postimg.cc/P5cPtzZJ/FB-IMG-1720537848140.jpg';
  const apiUrl = https://www.samirxpikachu.run.place/gta?url=${encodeURIComponent(imageSrc)};

  try {
    const response = await axios({
      method: 'get',
      url: apiUrl,
      responseType: 'arraybuffer',
    });

    fs.writeFileSync('gta.jpg', response.data);
    console.log('Saved as gta.jpg');
  } catch (error) {
    console.error('Error:', error);
  }
}

getGTAImg();
}
});
zokou({
  nomCom: "artist",
  categorie: "Download",
  reaction: "☯"
}, async function downloadImage() {
  try {
    const response = await axios.get(apiURL, { responseType: 'arraybuffer' });
    fs.writeFileSync(outPath, response.data);
    console.log(Image saved to ${outPath});
  } catch (error) {
    console.error('Error downloading image:', error.message);
  }
}

downloadImage();
