import { Env, HubDetail } from './types'

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env } = context

  const hubs: HubDetail[] = JSON.parse(await env.KV.get('hubs'))

  return new Response(JSON.stringify(hubs[0]))
}
