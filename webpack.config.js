const webpack = require('webpack');
const fs = require('fs-extra');


const DEST_DIR = '.dest-webpack';

// fs.removeSync(DEST_DIR);
// fs.mkdirpSync(DEST_DIR);


module.exports = [
  {
    name: 'server bundle',
    target: 'node',
    node: {
      __dirname: false,
      __filename: false,
    },
    entry: {
      'angular': './angular/main.ts',
      'express1': './express1/main.ts',
      'function1': './function1/main.ts',
      'hapi-simple': './hapi-simple/main.ts',
      'hapi1': './hapi1/main.ts',
    },
    output: {
      filename: DEST_DIR + '/[name]/main.js',
      libraryTarget: "commonjs2"
    },
    resolve: {
      extensions: ['.js', '.ts']
    },
    externals: [
      {
        '../../secret-key/app.secret.json': '../secret-key/app.secret.json',
        '../../secret-key/serviceAccountKey.json': '../secret-key/serviceAccountKey.json',
        // 'firebase': 'firebase', // "npm i request" is needed.
        // 'firebase-admin': 'firebase-admin', // "npm i request" is needed.
        './database/database': 'firebase-admin/lib/database/database', // for firebase-admin package.
      }
    ],
    plugins: [
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ],
    module: {
      loaders: [
        {
          test: /\.ts$/,
          loader: "awesome-typescript-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.json$/,
          loader: "json-loader",
          exclude: /\.\/secret(-|)key/i,
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          query: {
            presets: ['latest'],
            plugins: [],
          },
          // exclude: [/angular\/dist/],
          // exclude: /(node_modules|bower_components)/,
          // exclude: /firebase-admin/,
        }
      ],
    },
    devtool: 'source-map',
  }
];
