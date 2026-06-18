import { useEffect, useRef, useState } from 'react'
import './PythonPlayground.css'

const pyodideBaseUrl = 'https://cdn.jsdelivr.net/pyodide/v314.0.0/full/'
const pyodideScriptUrl = `${pyodideBaseUrl}pyodide.js`

let pyodideReadyPromise

const starterCode = `def two_sum(nums, target):
    seen = {}
    for index, value in enumerate(nums):
        need = target - value
        if need in seen:
            return [seen[need], index]
        seen[value] = index

print(two_sum([2, 7, 11, 15], 9))
`

function loadPyodideRuntime() {
  if (!pyodideReadyPromise) {
    pyodideReadyPromise = new Promise((resolve, reject) => {
      const start = () => {
        window
          .loadPyodide({ indexURL: pyodideBaseUrl })
          .then(resolve)
          .catch(reject)
      }

      if (window.loadPyodide) {
        start()
        return
      }

      const existingScript = document.querySelector(`script[src="${pyodideScriptUrl}"]`)

      if (existingScript) {
        existingScript.addEventListener('load', start, { once: true })
        existingScript.addEventListener('error', reject, { once: true })
        return
      }

      const script = document.createElement('script')
      script.src = pyodideScriptUrl
      script.async = true
      script.addEventListener('load', start, { once: true })
      script.addEventListener('error', reject, { once: true })
      document.head.appendChild(script)
    })
  }

  return pyodideReadyPromise
}

function PythonPlayground() {
  const [code, setCode] = useState(starterCode)
  const [output, setOutput] = useState('Pyodide is loading. The first run may take a moment.')
  const [status, setStatus] = useState('loading')
  const lineNumbers = Array.from({ length: code.split('\n').length }, (_, index) => index + 1)
  const lineGutterRef = useRef(null)
  const pyodideRef = useRef(null)

  useEffect(() => {
    let isMounted = true

    loadPyodideRuntime()
      .then((pyodide) => {
        if (!isMounted) return
        pyodideRef.current = pyodide
        setStatus('ready')
        setOutput('Ready. Write Python on the left, then run it here.')
      })
      .catch((error) => {
        if (!isMounted) return
        setStatus('error')
        setOutput(`Unable to load Pyodide.\n\n${error.message}`)
      })

    return () => {
      isMounted = false
    }
  }, [])

  const runCode = async () => {
    if (!pyodideRef.current || status === 'running') return

    setStatus('running')
    setOutput('Running...')

    try {
      const pyodide = pyodideRef.current
      pyodide.globals.set('__portfolio_user_code', code)
      pyodide.runPython(`
import contextlib
import io
import traceback

__portfolio_stdout = io.StringIO()
__portfolio_stderr = io.StringIO()

try:
    with contextlib.redirect_stdout(__portfolio_stdout), contextlib.redirect_stderr(__portfolio_stderr):
        exec(__portfolio_user_code, globals())
except Exception:
    traceback.print_exc(file=__portfolio_stderr)

__portfolio_result = __portfolio_stdout.getvalue()
__portfolio_error = __portfolio_stderr.getvalue()
`)

      const stdout = pyodide.globals.get('__portfolio_result')
      const stderr = pyodide.globals.get('__portfolio_error')
      setOutput(`${stdout || ''}${stderr ? `\n${stderr}` : ''}`.trim() || 'Code ran with no output.')
      setStatus('ready')
    } catch (error) {
      setOutput(error.message)
      setStatus('ready')
    }
  }

  const resetCode = () => {
    setCode(starterCode)
    setOutput('Starter code restored.')
  }

  const syncLineNumbers = (event) => {
    if (lineGutterRef.current) {
      lineGutterRef.current.scrollTop = event.currentTarget.scrollTop
    }
  }

  return (
    <section className="playground-view" aria-labelledby="playground-title">
      <div className="playground-heading">
        <div>
          <p className="eyebrow">Python Playground</p>
          <h1 id="playground-title">Run Python directly in the browser.</h1>
        </div>
        <div className={`runtime-status ${status}`}>{status}</div>
      </div>

      <div className="playground-shell">
        <section className="editor-pane" aria-label="Python editor">
          <div className="pane-header">
            <span>main.py</span>
            <div className="playground-actions">
              <button type="button" onClick={resetCode}>
                Reset
              </button>
              <button
                className="run-button"
                type="button"
                onClick={runCode}
                disabled={status !== 'ready'}
              >
                {status === 'running' ? 'Running' : 'Run'}
              </button>
            </div>
          </div>
          <div className="editor-body">
            <div className="line-gutter" ref={lineGutterRef} aria-hidden="true">
              {lineNumbers.map((lineNumber) => (
                <span key={lineNumber}>{lineNumber}</span>
              ))}
            </div>
            <textarea
              aria-label="Python code"
              spellCheck="false"
              value={code}
              onChange={(event) => setCode(event.target.value)}
              onScroll={syncLineNumbers}
            />
          </div>
        </section>

        <section className="result-pane" aria-label="Results">
          <div className="pane-header">
            <span>Result</span>
            <small>stdout / errors</small>
          </div>
          <pre>{output}</pre>
        </section>
      </div>
    </section>
  )
}

export default PythonPlayground
