import type { InferAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import type User from '#models/user'

declare module '@adonisjs/auth/access_tokens' {
  interface UserWithTokens {
    accessTokens: InferAccessTokensProvider<typeof User>
  }
}
