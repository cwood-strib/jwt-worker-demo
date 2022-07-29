import { hasValidGift, parseContentId } from "./gift";

export interface Env {
  // Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
  // MY_KV_NAMESPACE: KVNamespace;
  //
  // Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
  // MY_DURABLE_OBJECT: DurableObjectNamespace;
  //
  // Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
  // MY_BUCKET: R2Bucket;
}

const responseOptions = {
  headers: {
    'content-type': 'text/html'
  }
}

const makeHtml = (title: string, content: string) => {
  return `<html>
  <head>
  <title>${title}</title>
    <body>
      ${content}
    </body>
    </html>
  `;
}

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    let url = new URL(request.url);
    let contentId = parseContentId(url);
    let hasGift = await hasValidGift(url);

    if (hasGift) {
      return new Response(makeHtml('Your gift', `
          <h1>Article ${contentId}</h1>
          <p>You've been gifted this article</p>
      `), responseOptions);
    } else {
      return new Response(makeHtml('Paywall', `
        <html>
        <body>
          <h1>Subscribe to read this article</h1>
        </body>
        </html>
      `), responseOptions);
    }
  },
};