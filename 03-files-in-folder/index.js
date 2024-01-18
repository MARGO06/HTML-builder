const fs = require('fs/promises');
const path = require('path');
const wayPath = path.join(__dirname, 'secret-folder');

async function showFiles() {
  try {
    const fileName = await fs.readdir(
      wayPath,
      { withFileTypes: true },
      (files) => {
        files.forEach((file) => {
          file;
        });
      },
    );
    fileName.forEach(async (file) => {
      const stats = await fs.stat(path.join(wayPath, file.name));
      if (stats.isFile()) {
        let arrayFile = file.name.split('.');
        let fileN = arrayFile[0];
        let extend = path.extname(file.name).slice(1);
        let size = stats.size;
        console.log(`${fileN} - ${extend} - ${size}b`);
      }
    });
  } catch (err) {
    console.log(err);
  }
}
showFiles();
