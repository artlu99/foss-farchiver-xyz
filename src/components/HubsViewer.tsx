import { useEffect, useState } from 'preact/hooks'
import axios from 'axios'

interface HubDetail {
  shortname: string
  url: string
  ssl: boolean
  fid: number
  version: string
  hide?: boolean
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
          if (h.ssl) {
            const url = `https://${h.url}/v1/info?dbstats=1`
            try {
              const res = await axios.get(url)
              return await res.data
            } catch (e) {
              return {
                hubOperatorFid: h.fid,
                isSyncing: false,
                nickname: h.shortname,
                peerId: 'unreachable',
                rootHash: 'unreachable',
                version: '?',
              }
            }
          } else {
            return {
              hubOperatorFid: h.fid,
              isSyncing: false,
              nickname: h.shortname,
              peerId: 'unreachable',
              rootHash: 'unreachable',
              version: h.version,
            }
          }
        })
      )
      setData(details)
    }
    void fetchData()
  }, [hubs])

  return (
    <div>
      {data.length === 0 ? (
        'loading...'
      ) : (
        <table>
          <thead>
            <tr>
              <th>name</th>
              <th style={{ textAlign: 'center' }}>version</th>
              <th style={{ textAlign: 'center' }}>Messages</th>
              <th style={{ textAlign: 'center' }}>FidEvents</th>
              <th style={{ textAlign: 'center' }}>FnameEvents</th>
              <th style={{ textAlign: 'right' }}>fid</th>
            </tr>
          </thead>

          {data.map((d) => {
            const nickname = d.nickname
            const shortname =
              nickname === 'Farcaster Hub'
                ? hubs.find((h) => h.fid === d.hubOperatorFid)?.shortname ??
                  'not found'
                : nickname
            const numMessages = (d.dbStats?.numMessages ?? 0).toLocaleString()
            const numFidEvents = (d.dbStats?.numFidEvents ?? 0).toLocaleString()
            const numFnameEvents = (
              d.dbStats?.numFnameEvents ?? 0
            ).toLocaleString()
            const fid = d.hubOperatorFid.toLocaleString()
            return (
              <tr>
                <td>{`${shortname}`}</td>
                <td style={{ textAlign: 'center' }}>{`${d.version}`}</td>
                <td style={{ textAlign: 'center' }}>{`${numMessages}`}</td>
                <td style={{ textAlign: 'center' }}>{`${numFidEvents}`}</td>
                <td style={{ textAlign: 'center' }}>{`${numFnameEvents}`}</td>
                <td style={{ textAlign: 'right' }}>{`${fid}`}</td>
              </tr>
            )
          })}
        </table>
      )}
    </div>
  )
}
export default HubsViewer
