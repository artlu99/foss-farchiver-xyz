import { Suspense } from 'preact/compat'
import Catalog from 'components/Catalog'

export default function () {
  const host: string = import.meta.env['VITE_HOST']
  const displayName: string = import.meta.env['VITE_HOST_DISPLAYNAME']
  const githubLink: string = import.meta.env['VITE_GITHUB_LINK']

  return (
    <div className="container mx-auto max-w-prose p-10 prose">
      <h1>FOSS services</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <Catalog />
        <hr />
        <h3>
          <a href={`${githubLink}`} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>{' '}
          repository. Hosted by{' '}
          <a href={`${host}`} target="_blank" rel="noopener noreferrer">
            {`${displayName}`}
          </a>
          .
        </h3>
      </Suspense>
    </div>
  )
}
