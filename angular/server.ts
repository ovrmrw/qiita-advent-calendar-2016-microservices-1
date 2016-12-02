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


server.route({
  method: 'GET',
  path: '/{param*}',
  handler: (req, reply) => {
    console.log('===================================', req.params['param']);
    reply.file(req.params['param'] || 'index.html');
  }
})
// server.route({
//   method: 'GET',
//   path: '/{param*}',
//   handler: {
//     directory: {
//       path: '.',
//       index: true,
//       // etagMethod: false,
//       // redirectToSlash: true,
//       // listing: true,
//     }
//   }
// });


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
