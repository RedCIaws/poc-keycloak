import type {NextAuthOptions} from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from "next-auth/providers/credentials";
import KeycloakProvider from "next-auth/providers/keycloak";
import {GithubProfile} from "next-auth/providers/github";

export const options: NextAuthOptions = {
    providers: [
        KeycloakProvider({
            clientId: process.env.KEYCLOAK_ID as string,
            clientSecret: process.env.KEYCLOAK_SECRET as string,
            issuer: process.env.KEYCLOAK_ISSUER as string,
        }),
        GitHubProvider({
            profile(profile: GithubProfile) {
                return {
                    ...profile,
                    name: profile.name ?? profile.login,
                    id: profile.id.toString(),
                    image: profile.avatar_url,
                    roles: ["User"],
                }
            },
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {label: "Username", type: "text", placeholder: "username"},
                password: {label: "Password", type: "password", placeholder: "password"},
            },
            async authorize(credentials) {
                // Add logic here to retrieve user data
                const user = {
                    id: "11", username: "Arthur", password: "pwd1234", roles: ["Admin"], name: "Arthur"
                };

                return credentials?.username === user.username && credentials?.password === user.password ? user : null;
            }
        })
    ],
    callbacks: {
        async jwt({token, user, account}) {
            console.log(token);
            let decoded = undefined;
            if (account) {
                decoded = decode(account?.access_token);
                if (user && decoded) token.roles = decoded.realm_access.roles;
            }
            if (!account || !decoded) {
                if (user?.roles) token.roles = user.roles;
            }
            return token;
        },
        // if you want to use the role in client components
        async session({session, token}) {
            if (session?.user) session.user.roles = token.roles;
            return session;
        }
    }
}

const decode = function (token: string | undefined) {
    if (token) {
        // le token github est différent, pourquoi ?
        const split = token.split('.')[1];
        if (split) {
            return JSON.parse(Buffer.from(split, 'base64').toString());
        }
    }
}
