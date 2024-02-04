import { Suspense } from 'preact/compat'

export default function () {
  return (
    <div className="container mx-auto max-w-prose p-10 prose">
      <h1>FOSS services</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <h3>a random open (read-only) Hub</h3>
        <h2>
          <a
            href="https://foss.farchiver.xyz/hub"
            target="_blank"
            rel="noopener noreferrer"
          >
            foss.farchiver.xyz/hub
          </a>
        </h2>
        <h3>list known open Hubs</h3>
        <h2>
          <a
            href="https://foss.farchiver.xyz/hubs/list"
            target="_blank"
            rel="noopener noreferrer"
          >
            foss.farchiver.xyz/hubs/list
          </a>
        </h2>
        <h3>shows the latest version across all known open Hubs</h3>
        <h2>
          <a
            href="https://foss.farchiver.xyz/hubs/latestVersion"
            target="_blank"
            rel="noopener noreferrer"
          >
            foss.farchiver.xyz/hubs/latestVersion
          </a>
        </h2>
        <hr />
        <h3>
          hosted by{' '}
          <a
            href="https://farchiver.xyz"
            target="_blank"
            rel="noopener noreferrer"
          >
            Farchiver
          </a>
        </h3>
      </Suspense>
    </div>
  )
}
