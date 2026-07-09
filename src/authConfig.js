import { Amplify } from 'aws-amplify'

const region = import.meta.env.VITE_AWS_REGION
const userPoolId = import.meta.env.VITE_COGNITO_USER_POOL_ID
const userPoolClientId = import.meta.env.VITE_COGNITO_USER_POOL_CLIENT_ID

const requiredConfig = {
  VITE_AWS_REGION: region,
  VITE_COGNITO_USER_POOL_ID: userPoolId,
  VITE_COGNITO_USER_POOL_CLIENT_ID: userPoolClientId,
}

export function configureAuth() {
  const missingVariables = Object.entries(requiredConfig)
    .filter(([, value]) => !value)
    .map(([name]) => name)

  if (missingVariables.length > 0) {
    throw new Error(`Missing Cognito configuration: ${missingVariables.join(', ')}`)
  }

  const poolRegion = userPoolId.split('_')[0]

  if (poolRegion !== region) {
    throw new Error(
      `Cognito region mismatch: ${region} does not match User Pool region ${poolRegion}`,
    )
  }

  Amplify.configure({
    Auth: {
      Cognito: {
        userPoolId,
        userPoolClientId,
      },
    },
  })
}
