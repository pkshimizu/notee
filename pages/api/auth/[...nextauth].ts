import NextAuth from "next-auth";
import Providers from "next-auth/providers"

const options = {
    providers: [
      Providers.Google({
          clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
          clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET_ID
      })
    ]
}

export default (req, res) => NextAuth(req, res, options)
