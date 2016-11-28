import { AzureFunction } from '../types';
import { createFetch } from '../lib/utils';
import { createUri } from './server';


export const azureFunction: AzureFunction =
  async (context, req) => {
    try {
      const uri: string = await createUri();
      const result: any = await createFetch(uri, req).then(res => res.json());
      console.log('result:', JSON.stringify(result, null, 2));

      if (result.error) {
        context.res = {
          status: result.statusCode,
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
    console.log('context.res:', JSON.stringify(context.res, null, 2));
  };
