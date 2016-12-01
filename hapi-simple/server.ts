import * as Hapi from 'hapi';


const server = new Hapi.Server();
server.connection({
  host: 'localhost'
});


server.route([
  {
    method: 'GET',
    path: '/',
    handler: (req, reply) => {
      try {
        const message = 'Hello world.';
        reply({ message });
      } catch (error) {
        reply({ error }).code(500);
      }
    }
  },
  {
    method: 'GET',
    path: '/{name}',
    handler: (req, reply) => {
      try {
        const message = 'Hello world, ' + req.params['name'];
        reply({ message });
      } catch (error) {
        reply({ error }).code(500);
      }
    }
  }
]);


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
