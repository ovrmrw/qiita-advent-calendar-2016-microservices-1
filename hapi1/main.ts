import { AzureFunction } from '../types';
import { createFetch, isJson, isHtml } from '../lib/utils';
import { createUri } from './server';


export const azureFunction: AzureFunction =
  async (context, req) => {
    try {
      const uri: string = await createUri();
      const res: IResponse = await createFetch(uri, req);
      const status: number = res.status;
      const text: string = await res.text();
      console.log('result:', { status, text });

      let contentType: string = '';
      let body: any = text;
      if (isJson(text)) {
        contentType = 'application/json';
        body = JSON.parse(text);
      } else if (isHtml(text)) {
        contentType = 'text/html';
      } else {
        // contentType = 'text/plain';
      }

      context.res = {
        status,
        body,
      }
      if (contentType) {
        context.res.headers = {
          'Content-Type': contentType + '; charset=utf-8',
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
