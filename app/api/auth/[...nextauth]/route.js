// this is the catch all route for signin, signout, jwt, and sessions

import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import AdminModel from "@models/AdminModel";
import { dbConnect } from "@lib/dbConfig";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
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
      // we pass the credentials from the client in the signIn funnction
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

        // this return statment is send to the frontend as a response only after executing the callback functions
        return {
          id: admin._id,
          username: admin.username,
          email: admin.email,
          role: admin.role,
        };
      },
    }),
  ],
  callbacks: {
    // params have some predefined keys: token, user, account...
    // params.user will have all the values that are returned from above
    jwt(params) {
      if (params.user?.role) {
        // we are copying all data in params.user to params.token
        params.token.id = params.user.id;
        params.token.username = params.user.username;
        params.token.email = params.user.email;
        params.token.role = params.user.role;
      }
      // return the updated final token only as jwt
      return params.token;
    },
    // session also have predefined keys: user, expires. The token used here is passed from above jwt()
    session({ session, token }) {
      if (session.user) {
        // we are copying all data in token to session.user
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.email = token.email;
        session.user.role = token.role;
      }
      // return the updated new session with all necessary information
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

// this siginin route can handle only get and post request
export { handler as GET, handler as POST };
