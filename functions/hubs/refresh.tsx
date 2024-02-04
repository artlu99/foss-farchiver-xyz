import { Env, HubDetail, HubGetInfoResponse } from '../types'

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env } = context

  const knownHubs: HubDetail[] = JSON.parse(await env.KV.get('hubs'))

  const hubDetails = knownHubs.map(async (h) => {
    const url =
      (h.ssl ? 'https' : 'http') + '://' + h.url + '/v1/info?dbstats=1'

    const res = (await (await fetch(url)).json()) as HubGetInfoResponse
    return {
      ...h,
      version: res.version,
    }
  })

  return new Response(JSON.stringify({ status: 'Done', hubDetails }))
}
