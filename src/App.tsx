import { Suspense } from 'preact/compat'

export default function () {
  return (
    <div className="container mx-auto max-w-prose p-10 prose">
      <h1>FOSS services</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <h2>foss.farchiver.xyz/hub</h2>
        <h3>returns url of a random open read-only Hub</h3>
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
