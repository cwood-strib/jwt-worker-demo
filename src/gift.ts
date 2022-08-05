import jwt from '@tsndr/cloudflare-worker-jwt'

const GIFT_TOKEN_PARAM = "gift";
const JWT_KEY = 'secret';

export function parseContentId(url: URL): number|null {
  let re = new RegExp(/\/(\d)+\//, 'g');
  let results = url.toString().match(re);
  if (results && results.length) {
    let first = results[0];
    let id = Number(first.replaceAll("/", ""))
    return id;
  }
  return null;
}

export async function hasValidGift(url: URL): Promise<boolean> {
  try {
      if (url.searchParams.has(GIFT_TOKEN_PARAM)) {
        let raw = url.searchParams.get(GIFT_TOKEN_PARAM);

        if (typeof raw === "string") {
          let isValidToken = await jwt.verify(raw, JWT_KEY, { 'algorithm': 'HS256' })

          if (isValidToken) {
            let { payload } = jwt.decode(raw);
            let articleId = parseContentId(url);
            if (payload.id === articleId) {
              return Promise.resolve(true);
            }
          }
        }
      }
  } catch (e) {
    console.error("failed while checking for gift", e, url)
    // Failed to create a valid url from the string or token verification failed	
  }
  return false;
}