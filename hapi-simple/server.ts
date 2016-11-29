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


export function createUri(): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    server.start((err) => {
      if (err) { reject(err); }
      console.log('Server running at:', server.info.uri);
      resolve(server.info.uri);
    });
  });
}
