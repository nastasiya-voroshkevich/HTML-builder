const path = require('path');
const { readdir, stat } = require('fs/promises');

async function f() {
  try {
    const dir = await readdir(path.join(__dirname, 'secret-folder'), {
      withFileTypes: true,
    });
    for await (const dirent of dir)
      if (!dirent.isDirectory()) {
        const fileInfo = await stat(
          path.join(__dirname, 'secret-folder', dirent.name),
        );
        let ex = path.extname(dirent.name).split('.').join('');

        const fileSize = fileInfo.size;
        console.log(
          path.basename(dirent.name, `${path.extname(dirent.name)}`) +
            ' - ' +
            `${ex}` +
            ' - ' +
            `${fileSize} bytes`,
        );
      }
  } catch (err) {
    console.error(err);
  }
}

f();
