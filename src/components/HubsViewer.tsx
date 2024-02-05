import { useEffect, useState } from 'preact/hooks'
import axios from 'axios'

interface HubDetail {
  shortname: string
  url: string
  ssl: boolean
  fid: number
  version: string
}

interface HubGetInfoResponse {
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

const endpoint = '/hubs/list'

const HubsViewer = () => {
  const [hubs, setHubs] = useState<HubDetail[]>([])
  const [data, setData] = useState<HubGetInfoResponse[]>([])

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(endpoint)
      setHubs(response.data)
    }
    void fetchData()
  }, [])

  useEffect(() => {
    async function fetchData() {
      const details = await Promise.all(
        hubs.map(async (h) => {
          const url =
            (h.ssl ? 'https' : 'http') + '://' + h.url + '/v1/info?dbstats=1'
          const res = await axios.get(url)
          return await res.data
        })
      )
      setData(details)
    }
    void fetchData()
  }, [hubs])

  return (
    <div>
      {data.length === 0 ? 'loading...' : ''}
      {data.map((d) => {
        const nickname = d.nickname
        const shortname =
          nickname === 'Farcaster Hub'
            ? hubs.find((h) => h.fid === d.hubOperatorFid)?.shortname ??
              'not found'
            : nickname
        return (
          <div>
            <h3>{`${shortname} (fid: ${d.hubOperatorFid})`}</h3>
            <p>{`version: ${d.version}`}</p>
            <p>{`${JSON.stringify(d.dbStats)}`}</p>
          </div>
        )
      })}
    </div>
  )
}
export default HubsViewer
