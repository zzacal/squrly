import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
type CallRequest = {
  url: string,
  method: string;
}
export const POST: RequestHandler = async ({request}) => {
  const {url, method} = await request.json() as CallRequest
  try {
    const response = await fetch(url, {method});
    
    const {status, statusText, headers} = response;
    const responseHeaders = Object.fromEntries([...headers].map(([key, value]) => ([key, value])));
    let body;
    
    if(responseHeaders["content-type"]?.includes("application/json")) {
      body = await response.json()
    }
      
    
    return json({status, statusText, body, headers: responseHeaders});

  } catch (ex) {
    console.error(ex);
    return error(2);
  }
};
