import { Env } from '../types'

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env } = context

  await env.KV.put(
    'hubs',
    JSON.stringify([
      {
        shortname: 'nemes',
        url: 'nemes.farcaster.xyz:2281',
        ssl: true,
        fid: 9152,
        version: '1.9.5',
      },
    ])
  )

  return new Response(JSON.stringify({ status: 'complete' }))
}
