// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "example@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Add logic to check the user's credentials
        const user = { id: 1, name: "John Doe", email: "john@example.com" };
        if (credentials.email === "john@example.com" && credentials.password === "password") {
          return user;
        } else {
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: '/auth/login',  // Custom login page
    signOut: '/auth/logout',
    error: '/auth/error', // Error page
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };