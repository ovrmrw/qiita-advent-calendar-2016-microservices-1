import { AzureFunction } from '../types';


export function azureFunction(context, req) {
  context.res = {
    status: 200,
    body: {
      context: JSON.parse(JSON.stringify(context)),
    }
  };
  context.done();
}
