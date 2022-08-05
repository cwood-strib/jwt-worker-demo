import { hasValidGift, parseContentId } from "./gift";

const HOST = "";

class GiftHandler {
  config

  constructor(config: any) {
    this.config = config;
  }

  async element(element: Element) {
    element.prepend(
      `<meta name="gift-meta" content='${JSON.stringify(this.config)}' >`,
      { html: true }
    )
  }
}

async function getPage(url: URL) {
  let innerUrl = `${HOST}${url.pathname}/?${url.searchParams.toString()}`;
  return await fetch(innerUrl);
}

export default {
  async fetch(
    request: Request,
    env: any,
    ctx: ExecutionContext
  ): Promise<Response> {
    let url = new URL(request.url);
    let hasGift = await hasValidGift(url);
    let page; 

    try {
      page = await getPage(url);
    } catch (e) {
      console.log("failed", e)
    }

    if (hasGift && page) {
      let contentId = parseContentId(url);

      let giftConfig = {
        type: 'gift',
        status: 'gift',
        contentId: contentId,
      };

      // Rewrite page HTML to include special gift meta tag 
      let output = new HTMLRewriter().on('head', new GiftHandler(giftConfig)).transform(page);
      return output;
    } else {
      if (page) {
        return page;
      } else {
        return new Response("404");
      }
    }
  },
};