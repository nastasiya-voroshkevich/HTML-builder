let fs = require('fs');
const path = require('path');
const process = require('process');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

fs.appendFile(path.join(__dirname, 'test.txt'), '', (err) => {
  if (err) throw err;
});

let prompt = 'Please, enter the text: \r\n';
const addString = (prompt) => {
  rl.question(prompt, (name) => {
    if (name === 'exit') {
      rl.close();
    } else {
      fs.appendFile(path.join(__dirname, 'test.txt'), '\n' + name, (err) => {
        if (err) throw err;
        addString('');
      });
    }
  });
};

addString(prompt);

rl.on('close', function () {
  console.log('Exit. Goodbye.');
});
