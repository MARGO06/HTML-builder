const fs = require('fs/promises');
const path = require('path');
const fsNoPromises = require('fs');

const writeStream = fsNoPromises.createWriteStream(
  path.join(__dirname, 'project-dist', 'bundle.css'),
);

async function createBundle() {
  try {
    const fileNames = await fs.readdir(
      path.join(__dirname, 'styles'),
      { withFileTypes: true },
      (files) => {
        files.forEach((file) => file);
      },
    );
    fileNames.forEach(async (item) => {
      const stats = await fs.stat(path.join(__dirname, 'styles', item.name));
      const nameExtend = path.extname(item.name).slice(1);
      if (stats.isFile() && nameExtend === 'css') {
        const readStream = fsNoPromises.createReadStream(
          path.join(__dirname, 'styles', item.name),
          'utf-8',
        );
        readStream.on('data', (chunk) => writeStream.write(chunk));
      }
    });
  } catch (error) {
    console.log(error);
  }
}
createBundle();
