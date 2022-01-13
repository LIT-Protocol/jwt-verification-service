import { verifyJwt } from 'lit-jwt-verifier'

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with jwt verification status
 * @param {Request} request
 */
async function handleRequest(request) {
  let jwt
  try {
    const params = request.url.split('?')[1].split('&')
    console.log('params', params)
    const jwtParam = params.find(param => param.startsWith('jwt='))
    const theJwt = jwtParam.split('=')[1]
    if (theJwt) {
      jwt = theJwt
    }
    console.log('jwt', jwt)
  } catch (e) {
    console.log('no jwt in querystring: ', e)
  }

  if (!jwt) {
    // try to pull from json body
    try {
      const body = await request.json()
      jwt = body.jwt
    } catch (e) {
      console.log('error parsing json body', e)
    }
  }

  if (!jwt) {
    return new Response('no jwt', { status: 400 })
  }

  const { payload, header, signature, verified } = await verifyJwt({ jwt })

  return new Response(
    JSON.stringify({
      payload,
      header,
      verified,
      signature: Buffer.from(signature).toString('hex'),
    }),
    {
      headers: { 'content-type': 'application/json' },
    },
  )
}
