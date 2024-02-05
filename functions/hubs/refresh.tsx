import { Env, HubDetail, HubGetInfoResponse } from '../types'

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env } = context

  const knownHubs: HubDetail[] = JSON.parse(await env.KV.get('hubs'))

  const hubDetails = await Promise.all(
    knownHubs.map(async (h) => {
      if (h.ssl) {
        // Cloudflare Workers do not allow https out to non-standard ports (such as 2281)
        return h
      } else {
        const url =
          (h.ssl ? 'https' : 'http') + '://' + h.url + '/v1/info?dbstats=1'

        try {
          const res = (await (await fetch(url)).json()) as HubGetInfoResponse
          const updatedHubDetail = {
            ...h,
            version: res.version,
          }
          return updatedHubDetail}
        catch {
          return h
        }
      }
    })
  )

  await env.KV.put('hubs', JSON.stringify(hubDetails))

  return new Response(JSON.stringify({ status: 'done' }))
}
