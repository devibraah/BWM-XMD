const axios = require("axios");

async function text2prompt(text) {
  try {
    if(!text) return { status: false, message: "undefined reading text" };
    return await new Promise(async(resolve, reject) => {
      axios.post("https://api-v1.junia.ai/api/free-tools/generate", JSON.stringify({
        content: text,
        op: "op-prompt"
      })).then(res => {
        let prompt = res.data;
        if(prompt.length <= 2) reject("failed generating prompt");
        prompt = prompt.replace(`"`, ``);
        resolve({
          status: true,
          prompt
        })
      }).catch(reject)
    })
  } catch (e) {
    return { status: false, message: e };
  }
}

// text2prompt("sad cat try to find some food").then(console.log).catch(console.log)
// {
//   status: true,
//   prompt: "A forlorn, gray tabby cat with big, teary eyes desperately scavenges for food in a dimly lit alley, rain pouring down, reflecting the shimmering streetlights against the wet pavement. The cat's ribs are visible under its matted fur, conveying a sense of profound hunger and longing. The scene is captured in a realistic style, evoking empathy and compassion for the plight of this abandoned feline"
// }

module.exports = text2prompt;