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

const Catalog = () => {
  const host: string = import.meta.env['VITE_HOST']

  return (
    <>
      <h2>API endpoints</h2>
      <div>
        {endpoints.map((e) => (
          <div>
            <h4>{e.description}</h4>
            <h3>
              <a
                href={`${host}/${e.endpoint}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {`${host}/${e.endpoint}`}
              </a>
            </h3>
          </div>
        ))}
      </div>
    </>
  )
}
export default Catalog
