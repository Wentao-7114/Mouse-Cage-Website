import { useState } from 'react'
import { confirmSignUp, signUp } from 'aws-amplify/auth'
import { FaArrowRight, FaUserPlus } from 'react-icons/fa'
import './LoginPage.css'

const getPasswordPolicyMessage = (message) => {
  if (!message) {
    return 'Password does not meet the account requirements.'
  }

  const policyDetail = message
    .replace(/^Password did not conform with policy:\s*/i, '')
    .replace(/^Invalid password:\s*/i, '')
    .trim()

  return `Password requirement not met: ${policyDetail}`
}

const getSignupErrorMessage = (error) => {
  switch (error?.name) {
    case 'UsernameExistsException':
      return 'An account with this email already exists. Try signing in instead.'
    case 'InvalidPasswordException':
      return getPasswordPolicyMessage(error?.message)
    case 'InvalidParameterException':
      return error?.message || 'Please check your email and password and try again.'
    case 'NotAuthorizedException':
      return error?.message || 'Cognito could not create this account.'
    case 'LimitExceededException':
    case 'TooManyRequestsException':
      return 'Too many attempts. Please wait a moment and try again.'
    default:
      return error?.message || 'Unable to create your account. Please try again.'
  }
}

const getConfirmationErrorMessage = (error) => {
  switch (error?.name) {
    case 'CodeMismatchException':
      return 'The confirmation code is incorrect. Please try again.'
    case 'ExpiredCodeException':
      return 'The confirmation code has expired.'
    case 'NotAuthorizedException':
      return error?.message || 'This account cannot be confirmed. It may already be confirmed.'
    case 'UserNotFoundException':
      return 'No pending account was found for this email.'
    case 'LimitExceededException':
    case 'TooManyRequestsException':
      return 'Too many attempts. Please wait a moment and try again.'
    default:
      return error?.message || 'Unable to confirm your account. Please try again.'
  }
}

function SignupPage({
  initialEmail = '',
  startInConfirmation = false,
  onNavigateLogin,
}) {
  const [email, setEmail] = useState(initialEmail)
  const [fullName, setFullName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [confirmationCode, setConfirmationCode] = useState('')
  const [isConfirming, setIsConfirming] = useState(startInConfirmation)
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [message, setMessage] = useState('')
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const showError = (text) => {
    setHasError(true)
    setMessage(text)
  }

  const handleSignup = async (event) => {
    event.preventDefault()
    setMessage('')
    setHasError(false)

    if (password !== confirmPassword) {
      showError('Passwords do not match.')
      return
    }

    if (!fullName.trim()) {
      showError('Enter your full name.')
      return
    }

    setIsLoading(true)
    const normalizedEmail = email.trim()

    try {
      const { nextStep } = await signUp({
        username: normalizedEmail,
        password,
        options: {
          userAttributes: {
            email: normalizedEmail,
            name: fullName.trim(),
          },
        },
      })

      if (nextStep.signUpStep === 'CONFIRM_SIGN_UP') {
        setEmail(normalizedEmail)
        setIsConfirming(true)
        return
      }

      setIsConfirmed(true)
      setMessage('Your account is ready. You can now sign in.')
    } catch (error) {
      showError(getSignupErrorMessage(error))
    } finally {
      setIsLoading(false)
    }
  }

  const handleConfirmation = async (event) => {
    event.preventDefault()
    setMessage('')
    setHasError(false)
    setIsLoading(true)

    try {
      const { nextStep } = await confirmSignUp({
        username: email.trim(),
        confirmationCode: confirmationCode.trim(),
      })

      if (nextStep.signUpStep === 'DONE') {
        setIsConfirmed(true)
 
        return
      }

      showError(`Additional confirmation step required: ${nextStep.signUpStep}.`)
    } catch (error) {
      showError(getConfirmationErrorMessage(error))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="login-view" aria-labelledby="signup-title">
      <div className="login-intro">
        <p className="eyebrow">{isConfirming ? 'Account confirmation' : 'Create an account'}</p>
        <h1 id="signup-title">
          {isConfirming ? 'Confirm your account.' : 'Get started with secure access.'}
        </h1>
        <p>
          {isConfirming
            ? `Enter the code sent to ${email}.`
            : 'Use your email to create an account.'}
        </p>
        <div className="login-note">
          <span aria-hidden="true"><FaUserPlus /></span>
          <div>
            <strong>{isConfirming ? 'Check your inbox' : 'Secure signup'}</strong>
            <small>
              {isConfirming
                ? 'The code confirms ownership of your email.'
                : 'Your account details stay private.'}
            </small>
          </div>
        </div>
      </div>

      <form
        className="login-form"
        onSubmit={isConfirming ? handleConfirmation : handleSignup}
      >
        {!isConfirmed ? (
          <>
            {!isConfirming ? (
              <div className="login-field">
                <label htmlFor="signup-name">Full name</label>
                <input
                  id="signup-name"
                  name="name"
                  type="text"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  disabled={isLoading}
                  required
                />
              </div>
            ) : null}

            <div className="login-field">
              <label htmlFor="signup-email">Email address</label>
              <input
                id="signup-email"
                name="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                disabled={isLoading || isConfirming}
                required
              />
            </div>

            {isConfirming ? (
              <div className="login-field">
                <label htmlFor="confirmation-code">Confirmation code</label>
                <input
                  id="confirmation-code"
                  name="confirmationCode"
                  type="text"
                  inputMode="numeric"
                  value={confirmationCode}
                  onChange={(event) => setConfirmationCode(event.target.value)}
                  placeholder="Enter your code"
                  autoComplete="one-time-code"
                  disabled={isLoading}
                  required
                />
              </div>
            ) : (
              <>
                <div className="login-field">
                  <div className="login-label-row">
                    <label htmlFor="signup-password">Password</label>
                    <button
                      type="button"
                      aria-pressed={showPassword}
                      onClick={() => setShowPassword((isVisible) => !isVisible)}
                    >
                      {showPassword ? 'Hide password' : 'Show password'}
                    </button>
                  </div>
                  <input
                    id="signup-password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Create a password"
                    autoComplete="new-password"
                    minLength="8"
                    disabled={isLoading}
                    required
                  />
                </div>
                <div className="login-field">
                  <div className="login-label-row">
                    <label htmlFor="confirm-password">Confirm password</label>
                    <button
                      type="button"
                      aria-pressed={showConfirmPassword}
                      onClick={() => setShowConfirmPassword((isVisible) => !isVisible)}
                    >
                      {showConfirmPassword ? 'Hide password' : 'Show password'}
                    </button>
                  </div>
                  <input
                    id="confirm-password"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    placeholder="Enter your password again"
                    autoComplete="new-password"
                    minLength="8"
                    disabled={isLoading}
                    required
                  />
                </div>
              </>
            )}

            <button className="login-submit" type="submit" disabled={isLoading}>
              {isLoading
                ? 'Please wait...'
                : isConfirming
                  ? 'Confirm account'
                  : 'Create account'}
              {!isLoading ? <FaArrowRight aria-hidden="true" /> : null}
            </button>
          </>
        ) : null}

        {isConfirmed ? (
          <button className="login-submit" type="button" onClick={onNavigateLogin}>
            Continue to sign in
            <FaArrowRight aria-hidden="true" />
          </button>
        ) : null}

        <button className="signup-link" type="button" onClick={onNavigateLogin}>
          Already have an account? Sign in
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

export default SignupPage
