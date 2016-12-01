import * as Hapi from 'hapi';

import { createWelcomeMessage, createHelloMessage } from '../repository';


const APPLICATION_JSON = 'application/json';
const TEXT_PLAIN = 'text/plain';

export const routes: Hapi.IRouteConfiguration[] = [];


routes.push({
  method: ['GET', 'POST'],
  path: '/',
  handler: (req, reply) => {
    try {
      const message = createWelcomeMessage();
      reply(message).header('content-type', TEXT_PLAIN);
    } catch (error) {
      reply({ error }).code(500);
    }
  }
});


routes.push({
  method: ['GET', 'POST'],
  path: '/hello',
  handler: (req, reply) => {
    try {
      const name = req.payload && req.payload.name ? req.payload.name : req.query.name;
      const message = createHelloMessage(name);
      reply({ message });
    } catch (error) {
      reply({ error }).code(500);
    }
  }
});


routes.push({
  method: 'GET',
  path: '/public/{param*}',
  handler: {
    directory: {
      path: '.',
      index: true,
      // etagMethod: false,
      // redirectToSlash: true,
      // listing: true,
    }
  }
});
