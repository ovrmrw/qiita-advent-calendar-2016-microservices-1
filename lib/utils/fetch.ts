import * as fetch from 'isomorphic-fetch';

import { AFRequest } from '../../types';


export async function customFetch(baseUri: string, req: AFRequest): Promise<ResponseMix> {
  const query = Object.keys(req.query).reduce((p, key) => {
    p.push(key + '=' + encodeURIComponent(req.query[key]));
    return p;
  }, [] as string[]);

  const url = baseUri + (req.params.segments ? '/' + req.params.segments : '') + (query.length ? '?' + query.join('&') : '');

  const options = {
    method: req.method,
    headers: req.headers,
    body: req.rawBody,
  };

  console.log('\nfetch url:', url);
  console.log('fetch options:', options);

  // return fetch(url, options);
  const response: IResponse = await fetch(url, options);
  const result: ResponseMix = response;
  let data: any;
  const contentType = response.headers.get('content-type');
  if (contentType.match(/json/)) {
    data = await response.json();
  } else {
    data = await response.text();
  }
  result.myHeaders = { 'Content-Type': contentType };
  result.myBody = data;
  return result;
}


type ResponseMix = IResponse & {
  myBody?: any,
  myHeaders?: { [key: string]: string }
};
