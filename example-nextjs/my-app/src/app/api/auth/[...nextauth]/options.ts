import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";


// GET http://localhost:3000/api/auth/providers
// REturns a list of all configured Authentication Providers as defined below 

export const options: NextAuthOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username:",
                    type: "text",
                    placeholder: "your username",
                },
                password: {
                    label: "Password:",
                    type: "password",
                },
            },
            async authorize(credentials) {
                const user = { id: "42", name: "bob", password: "123456" };

                if (
                    credentials?.username === user.name &&
                    credentials?.password === user.password
                ) {
                    return user;
                } else {
                    return null;
                }
            },
        }),
    ],
};
