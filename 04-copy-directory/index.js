const fs = require('fs/promises');
const path = require('path');

fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, (err) => {
  if (err) {
    return console.error(err);
  }
  console.log('Directory created successfully!');
});
const FS = require('fs');
const dirTest = path.join(__dirname, 'files-copy');

FS.readdir(dirTest, (err, files) => {
  if (err) throw err;

  for (const file of files) {
    FS.unlink(path.join(dirTest, file), (err) => {
      if (err) throw err;
    });
  }
});

// const { constants } = require('fs');
const { copyFile } = require('fs/promises');
// const { readdir } = require('fs/promises');
const FSP = require('fs').promises;

async function f() {
  try {
    const dir = await FSP.readdir(path.join(__dirname, 'files'), {
      withFileTypes: true,
    });
    const srcDir = path.join(__dirname, 'files');
    const destDir = path.join(__dirname, 'files-copy');
    for (let dirent of dir)
      if (dirent.isFile()) {
        await copyFile(
          path.join(srcDir, dirent.name),
          path.join(destDir, dirent.name),
        );
      }
  } catch {
    console.log('The file could not be copied');
  }
}
f();
