import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function connecttoReact() {
    const router = useRouter();

    useEffect(() => {
        {
            router.push('/../../'); 
        }
    }, [router]);
}