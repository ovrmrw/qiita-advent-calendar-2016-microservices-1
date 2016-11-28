import * as express from 'express';

import { routes } from './routes';


const app = express();

const port = 0; // dynamic
const host = 'localhost';


app.use(routes);


export function createUri(): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const server = app.listen(port, host, (err) => {
      if (err) { reject(err); }
      const uri = 'http://' + server.address().address + ':' + server.address().port;
      console.log('Server running at:', uri);
      resolve(uri);
    });
  });
}
