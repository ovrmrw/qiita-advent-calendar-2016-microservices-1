import * as Hapi from 'hapi';

import { routes } from './routes';


const server = new Hapi.Server();
server.connection({
  host: 'localhost'
});


server.route(routes);


export function createUri(): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    server.start((err) => {
      if (err) { reject(err); }
      console.log('Server running at:', server.info.uri);
      resolve(server.info.uri);
    });
  });
}
