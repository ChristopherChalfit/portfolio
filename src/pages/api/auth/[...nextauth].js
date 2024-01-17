import NextAuth from "next-auth"
import Auth0Provider from "next-auth/providers/auth0"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export const authOptions =({
  adapter: PrismaAdapter(prisma),
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      issuer: process.env.AUTH0_ISSUER,
      profile(profile) {
        return{id: profile.sid,
          role: profile.role ?? "user", ...profile};
      },
    })
    
  ],
  callbacks: {
    session({ session, user }) {
      session.user.role = user.role
      return session
    }
  },
  secret: process.env.NEXTAUTH_SECRET
})
export default NextAuth(authOptions)
