import axios from 'axios';
import FormData from 'form-data';
import fetch from 'node-fetch';
import fs from 'fs';
import cheerio from 'cheerio';
import mime from 'mime';

export const TelegraPh = async (path) => {
  return new Promise(async (resolve, reject) => {
    if (!fs.existsSync(path)) return reject(new Error("File not Found"));
    try {
      const form = new FormData();
      form.append("file", fs.createReadStream(path));
      const { data } = await axios({
        url: "https://telegra.ph/upload",
        method: "POST",
        headers: {
          ...form.getHeaders()
        },
        data: form
      });
      resolve("https://telegra.ph" + data[0].src);
    } catch (err) {
      reject(new Error(String(err)));
    }
  });
};

export const UploadFileUgu = async (input) => {
  return new Promise(async (resolve, reject) => {
    try {
      const form = new FormData();
      form.append("files[]", fs.createReadStream(input));
      const { data } = await axios({
        url: "https://uguu.se/upload.php",
        method: "POST",
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36",
          ...form.getHeaders()
        },
        data: form
      });
      resolve(data.files[0]);
    } catch (err) {
      reject(err);
    }
  });
};

export const webp2mp4File = async (path) => {
  return new Promise(async (resolve, reject) => {
    try {
      const form = new FormData();
      form.append('new-image-url', '');
      form.append('new-image', fs.createReadStream(path));
      const { data: step1Data } = await axios({
        method: 'post',
        url: 'https://s6.ezgif.com/webp-to-mp4',
        data: form,
        headers: {
          'Content-Type': `multipart/form-data; boundary=${form._boundary}`
        }
      });
      const $ = cheerio.load(step1Data);
      const file = $('input[name="file"]').attr('value');
      const formThen = new FormData();
      formThen.append('file', file);
      formThen.append('convert', "Convert WebP to MP4!");
      const { data: step2Data } = await axios({
        method: 'post',
        url: `https://ezgif.com/webp-to-mp4/${file}`,
        data: formThen,
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formThen._boundary}`
        }
      });
      const $2 = cheerio.load(step2Data);
      const result = 'https:' + $2('div#output > p.outfile > video > source').attr('src');
      resolve({
        status: true,
        message: "Created By Ethix-MD",
        result: result
      });
    } catch (err) {
      reject(err);
    }
  });
};

export const floNime = async (path, options = {}) => {
  const ext = mime.getType(path);
  if (!ext) throw new Error('Unknown file type');
  
  const form = new FormData();
  form.append('file', fs.createReadStream(path), `tmp.${ext}`);
  const response = await fetch('https://flonime.my.id/upload', {
    method: 'POST',
    body: form
  });
  const json = await response.json();
  return json;
};

export default { TelegraPh, UploadFileUgu, webp2mp4File, floNime };
