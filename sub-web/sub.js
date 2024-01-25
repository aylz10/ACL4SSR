const SingleDay = 'koyeb.app'
const DoubleDay = 'koyeb.app'
const TELEGRAPH_URL = 'koyeb.app'

addEventListener('fetch', event => {
    /*
    let nd = new Date();
    if (nd.getDate()%2) {
        TELEGRAPH_URL = SingleDay
    } else {
        TELEGRAPH_URL = DoubleDay
    }
    */
    event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url);
  url.host = TELEGRAPH_URL.replace(/^https?:\/\//, '');

  const modifiedRequest = new Request(url.toString(), {
    headers: request.headers,
    method: request.method,
    body: request.body,
    redirect: 'follow'
  });

  const response = await fetch(modifiedRequest);
  const modifiedResponse = new Response(response.body, response);

  // ������������ʵ���Ӧͷ
  modifiedResponse.headers.set('Access-Control-Allow-Origin', '*');

  return modifiedResponse;
}