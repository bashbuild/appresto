import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dotenv from 'dotenv'
import { pool } from "../../../config/db"

dotenv.config()

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          name: "email",
          type: "email",
        },
        // password: {
        //   label: "Password",
        //   type: "password",
        //   placeholder: "password",
        // },
      },
      async authorize(credentials, req) {

        try {
            const [res] = await pool.query(
              "SELECT * FROM accounts WHERE email = ?",
              credentials.email
            );

            return {
              name: res[0].name,
              email: res[0].email,
              image: res[0]
            };
        } catch (error) {
            return null
        }
          
      },
    }),
    // ...add more providers here
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/"
  },
  debug: true,
});
