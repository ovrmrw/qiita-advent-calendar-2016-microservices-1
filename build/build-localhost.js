const fs = require('fs-extra');
const path = require('path');
const child = require('child_process');
const appRoot = require('app-root-path').path;

const LOCALHOST = 'localhost';


// fs.removeSync(LOCALHOST);
fs.mkdirpSync(LOCALHOST);


const fileList = [
  'angular',
  'express1',
  'express2',
  'hapi1',
  'hapi-simple',
  'function1',
  'universal',
  '.env',
];

fileList.forEach(file => {
  fs.copySync(path.join(appRoot, file), path.join(appRoot, LOCALHOST, file), {
    filter: (filePath) => {
      if (filePath.match(/node_modules/) || filePath.match(/\.ts$/)) {
        return false;
      } else {
        return true;
      }
    }
  });
});


// child.execSync('npm run webpack');
// fs.copySync(path.join(appRoot, '.dest-webpack'), path.join(appRoot, LOCALHOST));
