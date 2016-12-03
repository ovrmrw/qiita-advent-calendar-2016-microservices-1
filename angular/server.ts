import * as path from 'path';
import * as Hapi from 'hapi';
const Inert = require('inert');


const server = new Hapi.Server({
  connections: {
    routes: {
      files: {
        relativeTo: path.join(__dirname, 'dist')
      },
    }
  }
});
server.connection({
  host: 'localhost',
});


server.register([Inert], (err) => {
  if (err) { throw err; }
});


/**
 * req.params['param']に含まれる$を.に変換してファイルを返す。
 * (例) hoge$bundle$js --> hoge.bundle.js
 * Azure Functionsのrouteは.を含むと総じてNot Foundとなるためやむを得ずこうした。
 */
server.route({
  method: 'GET',
  path: '/{param*}',
  handler: (req, reply) => {
    const filename: string = (req.params['param'] || 'index.html').replace(/\$/g, '.');
    reply.file(filename);
  }
});


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
