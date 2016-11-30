import { AzureFunction } from '../types';
import { createFetch, createAxios } from '../lib/utils';
import { createUri } from './server';


export const azureFunction: AzureFunction =
  async (context, req) => {
    try {
      const uri: string = await createUri();
      const res = await createAxios(uri, req);
      // console.log('result:', res);

      context.res = {
        status: res.status,
        body: res.data,
        isRaw: true,
        headers: res.headers,
      }
    } catch (err) {
      context.res = {
        status: 500,
        body: err,
      }
    }
    // console.log('context.res:', JSON.stringify(context.res, null, 2));
  };
