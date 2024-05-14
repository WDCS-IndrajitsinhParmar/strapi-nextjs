import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from 'next-auth';

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Credentials({
            async authorize(credentials: any) {                
                if (credentials?.email && credentials?.password) {
                    const { email, password } = credentials;
                    let data: any = await fetch(`${process.env.STRAPI_APP_URL}/admin/login`, {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            email, password
                        })
                    })
                    
                    data = await data.json();
                    if (!data?.data?.token) {
                        return null;
                    }
                    const res = {   
                        user: {
                            ...data.data.user,
                            token: data.data.token
                        }
                    }
                    console.log("User login successfully = ", res);
                    return res;
                }
                return null
            }
        }),
    ],
    secret: process.env.AUTH_SECRET,
    callbacks: {
        jwt: async ({ token, user }: any) => {
            // token returns only (id, image, name, email) & user returns all things we pass in return object                        
            if (user) {
                token.username = user.user.username,
                token.name = user.user.firstname,
                token.email = user.user.email,
                token.token = user.user.token,
                token.id = user.user.id
            };            
            return token;
        },
        session: async ({ session, token }: any) => {            
            // session returns only (name, email, image, expires) & token returns mostly same but format different            
            if (session?.user) {
                session.user = { ...session.user, ...token }
            };            
            return session;
        }
    }
}satisfies NextAuthConfig);