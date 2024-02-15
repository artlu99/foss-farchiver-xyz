import { useEffect, useState } from 'preact/hooks'
import axios from 'axios'

interface HubDetail {
  shortname: string
  url: string
  ssl: boolean
  fid: number
  version: string
  contact?: string
  write?: boolean
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
  contact?: string
  write?: boolean
}

const endpoint = '/hubs/list'

const linkify = (url: string | undefined) =>
  url ? (
    <a href={url} target="_blank" rel="noopener noreferrer">
      {url}
    </a>
  ) : undefined

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
              const res = await axios.get(url, {
                timeout: 1000,
                signal: AbortSignal.timeout(1000),
              })
              const data = await res.data
              return {
                ...data,
                contact: h.contact,
                write: h.write,
              }
            } catch (e) {
              return {
                hubOperatorFid: h.fid,
                isSyncing: false,
                nickname: h.shortname,
                peerId: 'unreachable',
                rootHash: 'unreachable',
                version: '?',
                contact: h.contact,
                write: h.write,
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
              dbStats: {
                numMessages: 'not ssl',
                numFidEvents: 'interrogate',
                numFnameEvents: 'directly',
              },
              contact: h.contact,
              write: h.write,
            }
          }
        })
      )
      setData(details)
    }
    void fetchData()
  }, [hubs])

  return (
    <>
      <h2>Farcaster Hubs Viewer</h2>
      <div>
        {data.length === 0 ? (
          'loading...'
        ) : (
          <table>
            <thead>
              <tr>
                <th>name</th>
                <th className="text-center">version</th>
                <th className="text-center">Messages</th>
                <th className="text-center">FidEvents</th>
                <th className="text-center">FnameEvents</th>
                <th className="text-right">fid</th>
                <th className="text-center">R/W</th>
                <th className="text-left">contact</th>
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
              const numFidEvents = (
                d.dbStats?.numFidEvents ?? 0
              ).toLocaleString()
              const numFnameEvents = (
                d.dbStats?.numFnameEvents ?? 0
              ).toLocaleString()
              const fid = d.hubOperatorFid.toLocaleString()
              return (
                <tr>
                  <td>{`${shortname}`}</td>
                  <td className="text-center">{`${d.version}`}</td>
                  <td className="text-center">{`${numMessages}`}</td>
                  <td className="text-center">{`${numFidEvents}`}</td>
                  <td className="text-center">{`${numFnameEvents}`}</td>
                  <td className="text-right">{`${fid}`}</td>
                  <td className="text-center">{`${d.write === undefined ? '-' : d.write ? 'y' : 'n'}`}</td>
                  <td className="text-left">
                    {d.contact ? linkify(d.contact) : '-'}
                  </td>
                </tr>
              )
            })}
          </table>
        )}
      </div>
    </>
  )
}
export default HubsViewer
