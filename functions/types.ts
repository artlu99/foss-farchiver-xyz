export interface Env {
  ENVIRONMENT: string
  KV: KVNamespace
}

export type HubDetail = {
  shortname: string
  url: string
  ssl: boolean
  fid: number
  version: string
  hide?: boolean
}
