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
    headers: Object.assign({
      // 'Content-Type': 'application/json',
    }, req.headers),
    body: req.rawBody,
  };

  console.log('\nfetch url:', url);
  console.log('fetch options:', options);

  // return fetch(url, options);
  return (async () => {
    const res: IResponse = await fetch(url, options);
    const result: ResponseMix = res;
    let data: any;
    const contentType = res.headers.get('content-type');
    if (contentType.match(/json/)) {
      data = await res.json();
    } else {
      data = await res.text();
    }
    result.myHeaders = { 'Content-Type': contentType };
    result.myBody = data;
    return result;
  })();
}


type ResponseMix = IResponse & {
  myBody?: any,
  myHeaders?: { [key: string]: string }
};
