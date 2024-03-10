//source: https://www.youtube.com/watch?v=A53T9_V8aFk&t=478s&ab_channel=SakuraDev

"use client";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Providers = (props: Props) => {
  return <SessionProvider>{props.children}</SessionProvider>;
};

export default Providers;