import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
//source: https://www.youtube.com/watch?v=A53T9_V8aFk&t=478s&ab_channel=SakuraDev
import Providers from "./components/Providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
       <body className={`${inter.className} bg-slate-900 antialiased`}>
        <Providers>
          {children}
          </Providers>
       </body>
    </html>
  );
}
