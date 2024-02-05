import { Suspense, useState } from 'preact/compat'
import Catalog from 'components/Catalog'
import HubsViewer from 'components/HubsViewer'

export default function () {
  const host: string = import.meta.env['VITE_HOST']
  const displayName: string = import.meta.env['VITE_HOST_DISPLAYNAME']
  const githubLink: string = import.meta.env['VITE_GITHUB_LINK']

  const [selected, setSelected] = useState<string>('CATALOG')

  const toggleSelected = () => {
    if (selected === 'CATALOG') setSelected('HUBSVIEWER')
    else setSelected('CATALOG')
  }
  return (
    <div className="container mx-auto max-w-prose p-10 prose">
      <h1>FOSS services</h1>
      <Suspense fallback={<p>Loading...</p>}>
        switch to{' '}
        <a onClick={() => toggleSelected()}>
          {selected === 'CATALOG' ? 'HubsViewer' : 'Catalog'}
        </a>
        {selected === 'CATALOG' ? <Catalog /> : <HubsViewer />}
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
