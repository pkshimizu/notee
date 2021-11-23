import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { NextApiRequest, NextApiResponse } from 'next-auth/internals/utils'

const options = {
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET_ID,
    }),
  ],
}

const auth = (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options)

export default auth
