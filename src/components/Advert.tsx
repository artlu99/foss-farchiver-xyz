import { SettingsIcon } from 'lucide-react'
import { useEffect, useState } from 'preact/hooks'
import axios from 'axios'

const endpoint = 'https://fcan.xyz/getadsfor?fid=20638&src=foss.farchiver.xyz'
const fcanUserSettingsLink = () => 'https://fcan.xyz/settings'
const fcanTransparencyLink = (id: string | undefined) =>
  'https://fcan.xyz/transparency?id=' + (id ?? 0)

interface FCANResponse {
  id: string
  head: string
  text: string
  rewardsMultiple?: number
  displayUrl?: string
  attribUrl?: string
}

const openInNewTab = (url: string | undefined) => {
  if (url) window.open(url, '_blank', 'noopener noreferrer')
}

const Advert = () => {
  const [data, setData] = useState<FCANResponse | undefined>(undefined)

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(endpoint)
      setData(response.data)
    }
    void fetchData()
  }, [])

  const Card = () => {
    return (
      <div>
        <hr />
        <h5>
          advertising experiment via{' '}
          <a
            href="https://fcan.xyz"
            alt="🕸️ FCAN"
            target="_blank"
            rel="noopener noreferrer"
          >
            FCAN 🕸️
          </a>
        </h5>
        <div className="card card-compact w-100% bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="navbar bg-base-100">
              <div className="flex-1">
                <div
                  className="lg:tooltip lg:tooltip-left"
                  data-tip="rewards multiple"
                >
                  <a className="btn btn-ghost text-xl">
                    <div
                      className="badge"
                      onClick={() =>
                        openInNewTab(fcanTransparencyLink(data?.id))
                      }
                    >
                      {'🎩'.repeat(data?.rewardsMultiple ?? 0)}
                    </div>
                  </a>
                </div>
              </div>
              <div className="flex-none">
                <div
                  className="lg:tooltip lg:tooltip-right"
                  data-tip="user-specific settings"
                >
                  <button
                    className="btn btn-circle btn-ghost"
                    onClick={() => openInNewTab(fcanUserSettingsLink())}
                  >
                    <SettingsIcon />
                  </button>
                </div>
              </div>
            </div>
            <div>
              <h2 className="card-title">{data?.head ?? null}</h2>
              <p>{data?.text ?? null}</p>
            </div>
            {data ? (
              <div className="card-actions justify-center">
                {data.displayUrl ? (
                  <div
                    className="lg:tooltip lg:tooltip-bottom"
                    data-tip={data.displayUrl}
                  >
                    <button
                      className="btn btn-accent"
                      onClick={() => openInNewTab(data.displayUrl)}
                    >
                      Click through without Tracking
                    </button>
                  </div>
                ) : null}
                {data.attribUrl ? (
                  <div
                    className="lg:tooltip lg:tooltip-bottom"
                    data-tip={'FCAN offers rewards to view ' + data.displayUrl}
                  >
                    <button
                      className="btn btn-outline btn-primary"
                      onClick={() => openInNewTab(data.attribUrl)}
                    >
                      Click through with Rewards
                    </button>
                  </div>
                ) : null}
              </div>
            ) : null}{' '}
          </div>
        </div>
      </div>
    )
  }
  return <div>{data ? <Card /> : 'loading...'}</div>
}
export default Advert
