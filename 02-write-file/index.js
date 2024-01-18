const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { stdout } = process;
const writeStream = fs.createWriteStream(
  path.join('02-write-file', 'text.txt'),
);
stdout.write('Your question\n');

const rl = readline.createInterface(process.stdin, process.stdout);
rl.on('line', (answer) => {
  writeStream.write(`${answer}\n`),
    (err) => {
      if (err) throw err;
    };
  if (answer === 'exit') {
    rl.close();
  }
});
process.on('exit', () => stdout.write('Good luck!'));
