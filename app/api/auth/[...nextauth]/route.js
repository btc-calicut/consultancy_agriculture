// this is the catch all route for signin, signout, jwt, and sessions

import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import AdminModel from "@models/AdminModel";
import { dbConnect } from "@lib/dbConfig";
import { signJwtAccessToken } from "@lib/jwtaccesstoken";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      // credentials can be an empty object. It is written only to make some demo forms out of the box.
      credentials: {
        username: { label: "Username", type: "text" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      // this is the function handles the signin functionality
      // credentials are passed through signIn() from the frontend
      async authorize(credentials) {
        const { username, email, password } = credentials;

        // connect to database
        await dbConnect();

        const admin = await AdminModel.findOne({ email: email });
        if (!admin) {
          throw Error("Invalid EmailId");
        }

        // compare the username
        const isValidUsername = username === admin.username;

        // compare the passwords
        const isValidPassword = await bcrypt.compare(password, admin.password);

        if (!isValidPassword || !isValidUsername) {
          throw Error("Invalid username or password");
        }

        // we are have to create jwt access tokens after user signin to futher check if the user is authenticated, when he call other api endpoints
        // this created access token is returned to the frontend and saved in the the nextauth session
        // now for every subsequent requests by the user, the access token is also sent throung the request headers and then validated
        const accessToken = signJwtAccessToken({
          id: admin._id,
          username: admin.username,
          email: admin.email,
          role: admin.role,
        });

        // this return statment is send to the frontend as a response only after executing the callback functions
        return {
          id: admin._id,
          username: admin.username,
          email: admin.email,
          role: admin.role,
          accessToken: accessToken,
        };
      },
    }),
  ],

  // we know that the jwt are usually encrypted and stored in browser as httpOnly cookie.
  // In the same way, the nextauth sessions are stored in browser in the form of jwt as httpOnly cookie and are encrypted with NEXTAUTH_SECRET.
  session: {
    strategy: "jwt",
    maxAge: 5 * 24 * 60 * 60, // 5 days
  },
  secret: process.env.NEXTAUTH_SECRET,

  // IMP: the value returned to the frontend browser is the value of the session callback

  callbacks: {
    // params have some predefined keys: params.user, params.token , params.account, etc
    // params.user will have all the values that are returned from above authorize ()
    async jwt(params) {
      if (params.user?.role) {
        // we are copying all data in params.user to params.token
        params.token.id = params.user.id;
        params.token.username = params.user.username;
        params.token.email = params.user.email;
        params.token.role = params.user.role;
        params.token.accessToken = params.user.accessToken;
      }
      return params.token;
    },

    // session also have predefined keys: session.user, session.expires.
    async session({ session, token }) {
      if (session?.user) {
        // we are copying all data in jwttoken to session.user which is to be send to frontend
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.email = token.email;
        session.user.role = token.role;
        session.user.accessToken = token.accessToken;
      }
      return session;
    },
  },
  // custom siginin page route
  pages: {
    signIn: "/auth/signin",
  },
};

const handler = NextAuth(authOptions);

// this siginin route can handle only get and post request
export { handler as GET, handler as POST };
