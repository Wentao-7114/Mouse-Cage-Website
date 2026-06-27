import { useState } from 'react'
import './Resources.css'

const downloadBaseUrl = 'https://smegkeatw4.execute-api.us-east-1.amazonaws.com/download'

function Resources() {
  const [code, setCode] = useState('')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    const trimmedCode = code.trim()

    if (!trimmedCode) {
      setMessage('Enter a resource code to start the download.')
      return
    }

    const downloadUrl = `${downloadBaseUrl}?code=${encodeURIComponent(trimmedCode)}`

    setIsLoading(true)
    setMessage('')

    try {
      const response = await fetch(downloadUrl)
      const result = await response.json()

      if (result.url) {
        window.open(result.url, '_blank', 'noopener,noreferrer')
        setMessage('Download link opened.')
        return
      }

      setMessage(result.error || 'Unable to find a download link for that code.')
    } catch {
      setMessage('Unable to download that resource right now.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="resources-view" aria-labelledby="resources-title">
      <div className="resources-heading">
        <p className="eyebrow">Resources</p>
        <h1 id="resources-title">Download a shared resource with its access code.</h1>
      </div>

      <form className="resource-download" onSubmit={handleSubmit}>
        <label htmlFor="resource-code">Resource code</label>
        <div className="resource-form-row">
          <input
            id="resource-code"
            name="resource-code"
            type="text"
            value={code}
            onChange={(event) => {
              setCode(event.target.value)
              if (message) setMessage('')
            }}
            placeholder="Enter code"
            autoComplete="off"
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Checking...' : 'Download'}
          </button>
        </div>
        {message ? <p className="resource-message">{message}</p> : null}
      </form>
    </section>
  )
}

export default Resources
