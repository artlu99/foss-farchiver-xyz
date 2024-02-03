export function onRequest(context) {
  return new Response(
    JSON.stringify({ url: 'https://nemes.farcaster.xyz:2281', ssl: true })
  )
}
