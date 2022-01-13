# Lit JWT Verification Service

This is a Cloudflare worker that has a single purpose: to verify Lit Network JWTs in environments where there is no other way to verify them. This includes places like PHP where there is no BLS signature library.

## How to use

You can make a request to this service with a JWT signed by Lit Network. You may pass the JWT as either a url parameter or in the request body as JSON, via a GET or POST request.

### Requests

The base URL for this service is `https://jwt-verification-service.lit-protocol.workers.dev`

Example GET request with a JWT in the url:

```
curl "https://jwt-verification-service.lit-protocol.workers.dev?jwt=eyJhbGciOiJCTFMxMi0zODEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJMSVQiLCJzdWIiOiIweGRiZDM2MGYzMDA5N2ZiNmQ5MzhkY2M4YjdiNjI4NTRiMzYxNjBiNDUiLCJjaGFpbiI6InBvbHlnb24iLCJpYXQiOjE2NDIwOTU2ODcsImV4cCI6MTY0MjEzODg4NywiYmFzZVVybCI6Im15LWR5bmFtaWMtY29udGVudC1zZXJ2ZXIuY29tIiwicGF0aCI6Ii9jYnJ0MjdrOW5lZnh6endudHYweWgiLCJvcmdJZCI6IiIsInJvbGUiOiIiLCJleHRyYURhdGEiOiIifQ.qT9tHi1jOwQ4ha89Sn-WyvQK9GVjjQrPzRK20IskkmxkQJy_cLLGuCNFgRQiDcNiBgajZ83qITlJye1ZbciNrcJiM-uNs8LuEOfftxegOgj_WY-o17G3ZUtte1ehZoNT"
```

Example POST request with a JWT in the JSON body:

```
curl -X POST https://jwt-verification-service.lit-protocol.workers.dev
   -H 'Content-Type: application/json'
   -d '{"jwt":"eyJhbGciOiJCTFMxMi0zODEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJMSVQiLCJzdWIiOiIweGRiZDM2MGYzMDA5N2ZiNmQ5MzhkY2M4YjdiNjI4NTRiMzYxNjBiNDUiLCJjaGFpbiI6InBvbHlnb24iLCJpYXQiOjE2NDIwOTU2ODcsImV4cCI6MTY0MjEzODg4NywiYmFzZVVybCI6Im15LWR5bmFtaWMtY29udGVudC1zZXJ2ZXIuY29tIiwicGF0aCI6Ii9jYnJ0MjdrOW5lZnh6endudHYweWgiLCJvcmdJZCI6IiIsInJvbGUiOiIiLCJleHRyYURhdGEiOiIifQ.qT9tHi1jOwQ4ha89Sn-WyvQK9GVjjQrPzRK20IskkmxkQJy_cLLGuCNFgRQiDcNiBgajZ83qITlJye1ZbciNrcJiM-uNs8LuEOfftxegOgj_WY-o17G3ZUtte1ehZoNT"}'
```

### Response

The response will be a JSON object that looks like this:

```
{
	"payload": {
		"iss": "LIT",
		"sub": "0xdbd360f30097fb6d938dcc8b7b62854b36160b45",
		"chain": "polygon",
		"iat": 1642095687,
		"exp": 1642138887,
		"baseUrl": "my-dynamic-content-server.com",
		"path": "/cbrt27k9nefxzzwntv0yh",
		"orgId": "",
		"role": "",
		"extraData": ""
	},
	"header": {
		"alg": "BLS12-381",
		"typ": "JWT"
	},
	"verified": true,
	"signature": "a93f6d1e2d633b043885af3d4a7f96caf40af465638d0acfcd12b6d08b24926c64409cbf70b2c6b823458114220dc3620606a367cdea213949c9ed596dc88dadc26233eb8db3c2ee10e7dfb717a03a08ff598fa8d7b1b7654b6d7b57a1668353"
}
```
