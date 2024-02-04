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
}

export type HubGetInfoResponse = {
  dbStats?: {
    numFidEvents: number
    numFnameEvents: number
    numMessages: number
  }
  hubOperatorFid: number
  isSyncing: boolean
  nickname: string
  peerId: string
  rootHash: string
  version: string
}
