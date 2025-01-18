const path = require('path');
const fs = require('fs');
let stream = new fs.ReadStream(path.join('./01-read-file/text.txt'), {
  encoding: 'utf-8',
});

stream.on('data', (chunk) => {
  const textData = Buffer.from(chunk).toString();
  console.log(textData);
});
stream.on('error', function (err) {
  if (err.code == 'ENOENT') {
    console.log('Файл не найден');
  } else {
    console.error(err);
  }
});
