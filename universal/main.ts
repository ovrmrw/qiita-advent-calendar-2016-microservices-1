import { AzureFunction } from '../types';
import { customFetch } from '../lib/utils';
// import { createUri } from './server';
const createUri = require('./dist/server').createUri;


export const azureFunction: AzureFunction =
  async (context, req) => {
    try {
      const uri: string = await createUri();
      const result: any = await customFetch(uri, req).then(res => res.text());
      console.log('result:', JSON.stringify(result, null, 2));

      if (result.error) {
        context.res = {
          status: result.error.status || 404,
          body: result,
        }
      } else {
        context.res = {
          status: 200,
          body: result,
        }
      }
    } catch (err) {
      context.res = {
        status: 500,
        body: err,
      }
    }
    context.res.headers = {
      'Content-Type':'text/html'
    }
    context.res.isRaw = true;
    console.log('context.res:', JSON.stringify(context.res, null, 2));
  };
