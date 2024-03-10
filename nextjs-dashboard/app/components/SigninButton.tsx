//source: https://www.youtube.com/watch?v=A53T9_V8aFk&t=478s&ab_channel=SakuraDev

"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Google from "next-auth/providers/google";
const SigninButton = () => {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <div className="flex gap-2 ml-auto">
        <p className="text-zinc-50">{session.user.name}</p>
        <button onClick={() => signOut({callbackUrl:'https://localhost:3000'}) }className ="text-zinc-50 ml-auto pl-5">
          Sign Out
        </button>
      </div>
    );
  }
  return (
    <button onClick={() => signIn('google', { callbackUrl: '/../../../frontend-thing/App.js' })} className="h-10 w-80 text-black-300 hover:bg-zinc-300 hover:border-zinc-300 ml-auto bg-zinc-50 rounded-md duration-100 border-8 border-zinc-50">
      Continue With Google
    </button>
  
  );
};

export default SigninButton;