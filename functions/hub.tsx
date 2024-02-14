import { allowCorsResponse, newResponse } from './helpers'
import { Env, HubDetail } from './types'

const getRandomHub = (hubs: HubDetail[]) => {
  const randomPicker = Math.floor(Math.random() * hubs.length)
  const randomAdJson = hubs[randomPicker]
  return randomAdJson
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env } = context

  if (request.method === 'OPTIONS') {
    return allowCorsResponse()
  }

  const hubs: HubDetail[] = JSON.parse(await env.KV.get('hubs'))

  const randomHub = getRandomHub(hubs)
  return newResponse(JSON.stringify(randomHub))
}
