import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../utils/mongo";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../../models/User";
import dbConnect from "../../../utils/dbConnect";
import bcrypt from "bcrypt";

dbConnect();

export default NextAuth({
  // adapter: MongoDBAdapter(clientPromise),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const email = credentials.email;
        const password = credentials.password;
        const user = await User.findOne({ email: email });
        console.log("user", user);
        if (!user) {
          // Any object returned will be saved in `user` property of the JWT
          console.error("user could not found!");
          throw new Error("user could not found!");
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return signInUser({ user, password });

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],

  // it adds to session id info
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  database: process.env.MONGODB_URI,
  secret: "secret",
});

const signInUser = async ({ user, password }) => {
  const isMatch = await bcrypt.compare(password, user.password);
  console.log("isMatch", isMatch);
  if (isMatch === false ) {
    throw new Error("incorrect password");
  }
  return user;
};
