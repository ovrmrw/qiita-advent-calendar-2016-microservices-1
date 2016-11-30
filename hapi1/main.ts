import { AzureFunction } from '../types';
import { createFetch, isJson, isHtml, isPicture, createAxios } from '../lib/utils';
import { createUri } from './server';


export const azureFunction: AzureFunction =
  async (context, req) => {
    try {
      const uri: string = await createUri();
      // const res: IResponse = await createFetch(uri, req);
      const res = await createAxios(uri, req);
      const status: number = res.status;
      const data: any = res.data;
      // console.log('result:', { status, body });
      // console.log('res:',res);
      let body: any;
      let contentType: any = res.headers['content-type'] ? { 'Content-Type': res.headers['content-type'] } : {};
      let contentLength: any = res.headers['content-length'] ? { 'Content-Length': res.headers['content-length'] } : {};
      // let acceptRanges: any = res.headers['accept-ranges'] ? { 'Accept-Ranges': res.headers['accept-ranges'] } : {};
      // let etag = res.headers['etag'] ? { 'etag': res.headers['etag'] } : {};
      console.log('res:', res.config, res.headers, res.statusText);
      // let body: any = body;
      // if (isJson(body)) {
      //   contentType = 'application/json';
      //   body = JSON.parse(body);
      // } else if (isHtml(body)) {
      //   contentType = 'text/html';
      // } else if (isPicture(body)) {
      //   contentType = 'image/png';
      //   body = new Buffer(body, 'utf-8');
      // } else {
      //   // contentType = 'text/plain';
      // }


      context.res = {
        status,
        body: data,
        isRaw: true,
        headers: Object.assign({}, contentType, contentLength),
      }
      // if (contentType) {
      //   context.res.headers = res.headers
      // }
    } catch (err) {
      context.res = {
        status: 500,
        body: err,
      }
    }
    // console.log('context.res:', JSON.stringify(context.res, null, 2));
  };
