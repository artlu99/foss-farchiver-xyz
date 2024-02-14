import { allowCorsResponse, newResponse } from '../helpers'
import { Env, HubDetail } from '../types'

const numberify = (dotVersion: string) => {
  const [major, minor, sub] = dotVersion.split('.')
  return Number(major) * 1000000 + Number(minor) * 1000 + Number(sub) * 1
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env } = context

  if (request.method === 'OPTIONS') {
    return allowCorsResponse()
  }

  const hubs: HubDetail[] = JSON.parse(await env.KV.get('hubs'))

  const latest = hubs.sort((a, b) =>
    numberify(a.version) > numberify(b.version) ? -1 : 1
  )

  return newResponse(JSON.stringify(latest[0].version))
}
