import { Env, HubDetail } from '../types'

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env } = context

  const hubs: HubDetail[] = JSON.parse(await env.KV.get('hubs'))

  const sorted = hubs.sort((a, b) => (a.version > b.version ? -1 : 1))
  const publicHubs = sorted.filter((h) => h.hide === undefined)

  return new Response(JSON.stringify(publicHubs))
}
