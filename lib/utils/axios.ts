import axios from 'axios';

import { AFRequest } from '../../types';


export function createAxios(baseUri: string, req: AFRequest) {
  const query = Object.keys(req.query).reduce((p, key) => {
    p.push(key + '=' + encodeURIComponent(req.query[key]));
    return p;
  }, [] as string[]);

  const url = baseUri + (req.params.segments ? '/' + req.params.segments : '') + (query.length ? '?' + query.join('&') : '');

  const options = {
    method: req.method,
    headers: req.headers,
    data: req.rawBody,
    
  };

  console.log('\nfetch url:', url);
  console.log('fetch options:', options);

  return axios(url, options);
}
