import type { Metadata } from "next";
//import './globals.css'
import {Inter} from 'next/font/google'
//source: https://www.youtube.com/watch?v=A53T9_V8aFk&ab_channel=SakuraDev
import SessionProvider from "next-auth/react";
import Signin from './components/signinbutton'

const inter = Inter({ subsets: ['latin']})

export const metadata: Metadata = {
  title: "Login",
  description: "login page",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        </body>
    </html>
  );
}
