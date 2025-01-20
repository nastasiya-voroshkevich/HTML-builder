const fs = require('fs');
const path = require('path');
const { readFile, writeFile } = require('fs/promises');
const FSP = require('fs').promises;
let data = '';

fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, (err) => {
  if (err) {
    return console.error(err);
  }
});

const distDir = path.join(__dirname, 'project-dist');
const distFile = path.join(distDir, 'style.css');

function copyDirectory(directory) {
  fs.mkdir(
    path.join(path.join(__dirname, 'project-dist'), 'assets', directory.name),
    { recursive: true },
    (err) => {
      if (err) throw err;
    },
  );
}

const { copyFile } = require('fs/promises');
async function copyFiles(file, folder) {
  try {
    await copyFile(
      path.join(__dirname, 'assets', folder.name, file.name),
      path.join(distDir, 'assets', folder.name, file.name),
    );
  } catch {
    console.log('The file could not be copied');
  }
}
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
const newDir = path.join(distDir, 'assets');

fs.mkdir(newDir, { recursive: true }, (err) => {
  if (err) {
    return console.error(err);
  }
});

fs.readdir(
  path.join(__dirname, 'assets'),
  { withFileTypes: true },
  (err, folders) => {
    if (err) throw err;
    else {
      folders.forEach((folder) => {
        copyDirectory(folder);
        fs.readdir(
          path.join(__dirname, 'assets', folder.name),
          { withFileTypes: true },
          (err, files) => {
            if (err) throw err;
            else {
              files.forEach((file) => {
                copyFiles(file, folder);
              });
            }
          },
        );
      });
    }
  },
);

fs.readFile(
  path.join(__dirname, 'template.html'),
  'utf-8',
  (err, templateData) => {
    if (err) throw err;
    fs.writeFile(
      path.join(distDir, 'index.html'),
      templateData,
      'utf-8',
      (err) => {
        if (err) throw err;
      },
    );
    fs.readFile(
      path.join(distDir, 'index.html'),
      'utf-8',
      (err, dataHtmlCopy) => {
        if (err) throw err;

        fs.readdir(
          path.join(__dirname, 'components'),
          (err, componentsFiles) => {
            if (err) throw err;
            componentsFiles.forEach((component) => {
              let componentPath = path.join(
                path.join(__dirname, 'components'),
                component,
              );
              let componentName = component.split('.')[0];
              fs.readFile(componentPath, 'utf-8', function (err, htmlData) {
                if (err) throw err;
                dataHtmlCopy = dataHtmlCopy.replace(
                  new RegExp(`{{${componentName}}}`, 'g'),
                  htmlData,
                );
                fs.writeFile(
                  path.join(distDir, 'index.html'),
                  dataHtmlCopy,
                  'utf-8',
                  (err) => {
                    if (err) throw err;
                  },
                );
              });
            });
          },
        );
      },
    );
  },
);
