import { Suspense } from 'preact/compat'
import Advert from 'components/Advert'
import Catalog from 'components/Catalog'
import HubsViewer from 'components/HubsViewer'

export default function () {
  const host: string = import.meta.env['VITE_HOST']
  const displayName: string = import.meta.env['VITE_HOST_DISPLAYNAME']
  const githubLink: string = import.meta.env['VITE_GITHUB_LINK']

  return (
    <div className="container mx-auto max-w-prose p-10 prose">
      <h1>Farchiver FOSS Services</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <div className="collapse collapse-arrow border border-base-300">
          <input type="checkbox" checked />
          <div className="collapse-title text-xl font-medium">Viewer</div>
          <div className="collapse-content">
            <HubsViewer />
          </div>
        </div>
        <hr />
        <div className="collapse collapse-arrow border border-base-300">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium">Catalog</div>
          <div className="collapse-content">
            <Catalog />
          </div>
        </div>
        <h4>
          <a href={`${githubLink}`} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>{' '}
          FOSS repository. Hosted by{' '}
          <a href={`${host}`} target="_blank" rel="noopener noreferrer">
            {`${displayName}`}
          </a>
          .
        </h4>
        <Advert />
      </Suspense>
    </div>
  )
}
