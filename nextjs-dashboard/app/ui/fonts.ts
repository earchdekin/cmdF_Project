//source: https://nextjs.org/learn/dashboard-app/optimizing-fonts-images

import { Inter, Lusitana } from 'next/font/google';
//import myfont from './CircularStd-Medium.otf';

/* @FontFace{
    font-family: 'CircularStd';
  src: local('CircularStd'), url(./CircularStd-Medium.woff) format('woff');

} */
 
export const inter = Inter({ subsets: ['latin'] });
export const lusitana = Lusitana({
    weight: ['400', '700'],
    subsets: ['latin'],
});

