import { api } from "@/services/api";
import { AuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

type AuthenticateResponse = {
  user: {
    id: string
    fullname:string
    email: string
    role: string
  }
  token: string
}

export const authConfig: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          const response = await api.post<AuthenticateResponse>('/auth/authenticate', {
            email: credentials?.email,
            password: credentials?.password,
          });

          const { user, token } = response.data;

          if (user) {
            return {
              id: user.id,
              name: user.fullname,
              email: user.email,
              accessToken: token,
              role: user.role
            } as User;
          }
          return null;
        } catch (error) {
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user}) {
      if (user) {
        //@ts-expect-error undefined type
        token.accessToken = user.accessToken;
        token.id = user.id
        //@ts-expect-error undefined type
        token.role = user.role
      }

      // console.log(token)
      return token;
    },
    async session({ session, token }) {
        //@ts-expect-error undefined type
        session.user.accessToken = token.accessToken;
        //@ts-expect-error undefined type
        session.user.role = token.role
        //@ts-expect-error undefined type
      session.user.id = token.id


      return session;
    }
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  }
};