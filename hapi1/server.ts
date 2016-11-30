import * as path from 'path';
import * as Hapi from 'hapi';
const Inert = require('inert');

import { routes } from './routes';


const server = new Hapi.Server({
  connections: {
    routes: {
      files: {
        relativeTo: path.join(__dirname)
      }
    }
  }
});
server.connection({
  host: 'localhost'
});


server.register([Inert], (err) => {
  if (err) { throw err; }

  server.route({
    method: 'GET',
    path: '/web/{param*}',
    handler: {
      directory: {
        path: 'public',
        index: true,
      }
    }
  });

  server.route(routes);
});


export function createUri(): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    server.start((err) => {
      if (err) { reject(err); }
      console.log('Server running at:', server.info.uri);
      resolve(server.info.uri);
    });
  });
}
