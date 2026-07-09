import { useState } from 'react'
import { signIn } from 'aws-amplify/auth'
import { FaArrowRight, FaLock } from 'react-icons/fa'
import './LoginPage.css'

const getLoginErrorMessage = (error) => {
  switch (error?.name) {
    case 'UserNotFoundException':
    case 'NotAuthorizedException':
      return 'The email or password is incorrect.'
    case 'UserNotConfirmedException':
      return 'Your account still needs to be confirmed.'
    case 'LimitExceededException':
    case 'TooManyRequestsException':
      return 'Too many attempts. Please wait a moment and try again.'
    default:
      return error?.message || 'Unable to sign in. Please try again.'
  }
}

function LoginPage({ initialMessage = '', onLogin, onNavigateSignup }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState(initialMessage)
  const [hasError, setHasError] = useState(Boolean(initialMessage))
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (event) => {
    event.preventDefault()
    setMessage('')
    setHasError(false)
    setIsLoading(true)

    try {
      const { isSignedIn, nextStep } = await signIn({
        username: email.trim(),
        password,
      })

      if (isSignedIn) {
        onLogin(email.trim())
        return
      }

      if (nextStep.signInStep === 'CONFIRM_SIGN_UP') {
        onNavigateSignup({
          email: email.trim(),
          confirmationRequired: true,
        })
        return
      }

      setHasError(true)
      setMessage(`Additional sign-in step required: ${nextStep.signInStep}.`)
    } catch (error) {
      setHasError(true)
      setMessage(getLoginErrorMessage(error))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="login-view" aria-labelledby="login-title">
      <div className="login-intro">
        <p className="eyebrow">Welcome back</p>
        <h1 id="login-title">Sign in to access your account.</h1>
        <p>Enter your credentials to continue to your private resources and saved work.</p>
        <div className="login-note">
          <span aria-hidden="true"><FaLock /></span>
          <div>
            <strong>Secure access</strong>
            <small>Your account details stay private.</small>
          </div>
        </div>
      </div>

      <form className="login-form" onSubmit={handleLogin}>
        <div className="login-field">
          <label htmlFor="login-email">Email address</label>
          <input
            id="login-email"
            name="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            disabled={isLoading}
            required
          />
        </div>

        <div className="login-field">
          <div className="login-label-row">
            <label htmlFor="login-password">Password</label>
            <button
              type="button"
              aria-pressed={showPassword}
              onClick={() => setShowPassword((isVisible) => !isVisible)}
            >
              {showPassword ? 'Hide password' : 'Show password'}
            </button>
          </div>
          <input
            id="login-password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password"
            autoComplete="current-password"
            minLength="8"
            disabled={isLoading}
            required
          />
        </div>

        <label className="remember-me">
          <input type="checkbox" name="remember" />
          <span>Keep me signed in</span>
        </label>

        <button className="login-submit" type="submit" disabled={isLoading}>
          {isLoading ? 'Signing in...' : 'Sign in'}
          {!isLoading ? <FaArrowRight aria-hidden="true" /> : null}
        </button>

        <button className="signup-link" type="button" onClick={() => onNavigateSignup()}>
          Need an account? Sign up
        </button>

        {message ? (
          <p className={`login-message${hasError ? ' error' : ''}`} role={hasError ? 'alert' : 'status'}>
            {message}
          </p>
        ) : null}
      </form>
    </section>
  )
}

export default LoginPage
