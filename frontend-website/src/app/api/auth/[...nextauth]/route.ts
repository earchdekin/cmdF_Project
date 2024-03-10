import NextAuth from "next-auth/next"
import GoogleProvider from 'next-auth/providers/google'


//source: https://www.youtube.com/watch?v=A53T9_V8aFk&ab_channel=SakuraDev
export const authOptions = {
    providers: [
        GoogleProvider({
            clientId:process.env.GOOGLE_ID ?? "",
            clientSecret: process.env.GOOGLE_SECRET ?? "",
        }),

    ],

};

export default NextAuth(authOptions);