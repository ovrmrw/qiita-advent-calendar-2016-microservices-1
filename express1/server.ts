import * as express from 'express';
import * as path from 'path';
const bodyParser = require('body-parser');

import { routes } from './routes';


const app = express();

const port = 0; // dynamic
const host = 'localhost';


app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

app.use(routes);


let uri: string | undefined;

export function createUri(): Promise<string> {
  return new Promise<string>((resolve, reject) => {    
    if (uri) {
      resolve(uri);
    } else {
      const server = app.listen(port, host, (err) => {
        if (err) { reject(err); }
        uri = 'http://' + server.address().address + ':' + server.address().port;
        console.log('Server running at:', uri);
        resolve(uri);
      });
    }
  });
}
