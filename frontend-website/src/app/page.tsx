import Link from 'next/link'
import { Button , Heading} from "@chakra-ui/react"
import RootLayout from './layout';
import { SessionProvider } from 'next-auth/react';
 
export default function Page() {
  if (typeof window === 'undefined') {
    // Don't render SessionProvider on the server side
    return null;
  }
  return (
      <SessionProvider>
    <main>
      <div><Heading color='teal'>Filter unwanted words in voice chat in your community</Heading>
      </div>
    </main>
    </SessionProvider>
  );
    
}