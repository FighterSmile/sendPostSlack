const fs = require('fs');
const https = require('https');
const path = require('path')
  
// URL of the image
const url = 'https://i.imgur.com/IZwn363.mp4';


const getTypeFile = (url) =>{
  let ext = path.extname(url)
  ext = ext.replace('.','')
  return ext
}

const downloadFile = async (url, name) =>{
  const FileExt = getTypeFile(url)
  const path = `${__dirname}/../media/${name}.${FileExt}`;
  https.get(url,(res) => {
    // Image will be stored at this path
    const filePath = fs.createWriteStream(path);
    res.pipe(filePath);
    filePath.on('finish',() => {
        filePath.close(); 
        console.log('Download Completed');
        return path
    })
  })
  return path
}

module.exports = {downloadFile,getTypeFile}
