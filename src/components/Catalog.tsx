interface Endpoint {
  endpoint: string
  description: string
}

const endpoints: Endpoint[] = [
  { endpoint: 'hub', description: 'a random open (read-only) Hub' },
  { endpoint: 'hubs/list', description: 'list open hubs' },
  {
    endpoint: 'hubs/latestVersion',
    description: 'shows the latest version across all known open Hubs',
  },
]

export default function () {
  const host: string = import.meta.env['VITE_HOST']

  return (
    <div>
      {endpoints.map((e) => (
        <div>
          <h3>{e.description}</h3>
          <h2>
            <a
              href={`${host}/${e.endpoint}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {`${host}/${e.endpoint}`}
            </a>
          </h2>
        </div>
      ))}
    </div>
  )
}
