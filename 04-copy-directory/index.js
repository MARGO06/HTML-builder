const fs = require('fs/promises');
const path = require('path');

async function createCopyFolder() {
  try {
    await fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true });
    await fs.rm(path.join(__dirname, 'files-copy'), {
      recursive: true,
    });
  } catch (error) {
    console.log(error);
  }

  try {
    await fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true });
    const fileNames = await fs.readdir(
      path.join(__dirname, 'files'),
      { withFileTypes: true },
      (files) => {
        files.forEach((file) => file);
      },
    );
    console.log(fileNames);
    fileNames.forEach(
      async (file) =>
        await fs.copyFile(
          path.join(__dirname, 'files', file.name),
          path.join(__dirname, 'files-copy', file.name),
        ),
      console.log('ddd'),
    );
  } catch (error) {
    console.log(error);
  }
}
createCopyFolder();
