import * as Hapi from 'hapi';
import * as Joi from 'joi';

import { createCustomToken } from '../lib/repository';

export const routes: Hapi.IRouteConfiguration[] = [];


routes.push({
  method: ['POST'],
  path: '/createCustomToken',
  handler: async (req, reply) => {
    try {
      const uid: string = req.payload.user_id;
      const customToken = await createCustomToken(uid);
      reply({ customToken })
    } catch (error) {
      reply({ error }).code(500);
    }
  },
  config: {
    validate: {
      payload: {
        user_id: Joi.string().min(8).required(),
      }
    }
  }
});
