const fs = require('fs');
const { readFile, writeFile } = require('fs/promises');
const FSP = require('fs').promises;
const path = require('path');
let data = '';
const distDir = path.join(__dirname, 'project-dist');
fs.open(
  path.join(path.join(__dirname, 'project-dist'), 'bundle.css'),
  'w',
  (err) => {
    if (err) throw err;
  },
);
const distFile = path.join(distDir, 'bundle.css');

async function f() {
  try {
    const dir = await FSP.readdir(path.join(__dirname, 'styles'), {
      withFileTypes: true,
    });
    const srcDir = path.join(__dirname, 'styles');
    for (let dirent of dir)
      if (dirent.isFile() && path.extname(dirent.name) === '.css') {
        data += await readFile(path.join(srcDir, dirent.name));
      }
    await writeFile(distFile, data);
  } catch (err) {
    console.error(err);
  }
}
f();
