import { AzureFunction } from '../types';
import { customFetch, createAxios } from '../lib/utils';
import { createUri } from './server';


export const azureFunction: AzureFunction =
  async (context, req) => {
    try {
      const uri: string = await createUri();
      const res = await customFetch(uri, req);

      if (res.status === 200) {
        context.res = {
          status: res.status,
          body: res.myBody,
          headers: res.myHeaders,
          isRaw: true,
        };
      } else { // Not Found
        context.res = {
          status: res.status,
          body: res.statusText,
        }
      }
    } catch (err) {
      context.res = {
        status: 500,
        body: err,
      };
    }
    console.log('context.res:', JSON.stringify(context.res, null, 2));
  };
