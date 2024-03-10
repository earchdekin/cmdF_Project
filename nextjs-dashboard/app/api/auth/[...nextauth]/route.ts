//source: https://www.youtube.com/watch?v=A53T9_V8aFk&t=478s&ab_channel=SakuraDev
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET?? "",              
        })
        
    ],
});


export {handler as GET, handler as POST};