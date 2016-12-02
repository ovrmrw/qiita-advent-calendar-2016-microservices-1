const path = require('path');
const del = require('delete');
const appRoot = require('app-root-path').path;


const dirList = [
  'angular',  
  'express1',
  'express2',
  'function1',
  'hapi-simple',
  'hapi1',
  'lib',
  'types',
  'repository',
];

dirList.forEach(dir => {
  try {
    del.sync(path.join(appRoot, dir, '**', '*.js.map'));
  } catch (err) {
    console.error('error:', err);
  }
});
