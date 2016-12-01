import * as path from 'path';
import * as Hapi from 'hapi';
const Inert = require('inert');

import { routes } from './routes';


const server = new Hapi.Server({
  connections: {
    routes: {
      files: {
        relativeTo: path.join(__dirname, 'public')
      },
      // response: {
      //   ranges: false,
      // },
      // cors: true,
      // isInternal: true,
    }
  }
});
server.connection({
  host: 'localhost',
  // port: 3000
});


server.register([Inert], (err) => {
  if (err) { throw err; }
});


server.route(routes);


let uri: string | undefined;

export function createUri(): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    if (uri) {
      resolve(uri);
    } else {
      server.start((err) => {
        if (err) { reject(err); }
        uri = server.info.uri;
        console.log('Server running at:', uri);
        resolve(uri);
      });
    }
  });
}
