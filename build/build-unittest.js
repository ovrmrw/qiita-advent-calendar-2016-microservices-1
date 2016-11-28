const fs = require('fs-extra');
const path = require('path');
const appRoot = require('app-root-path').path;

const TEST_DIR = '.dest-test';


fs.removeSync(TEST_DIR);
fs.mkdirpSync(TEST_DIR);


const fileList = [
  'express1',
  'hapi1',
  '.env',
];

fileList.forEach(file => {
  fs.copySync(path.join(appRoot, file), path.join(appRoot, TEST_DIR, file), {
    filter: (filePath) => {
      if (filePath.match(/node_modules/) || filePath.match(/\.ts$/)) {
        return false;
      } else {
        return true;
      }
    }
  });
});
